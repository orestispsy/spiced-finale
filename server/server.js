const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./utils/db");

const cors = require("cors");
app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "https://thousandgigs.herokuapp.com",
        methods: ["GET", "POST"],
    },
});

const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
const { s3Url } = require("./config");

const crs = require("crypto-random-string");

const { hash, compare } = require("./utils/bc");

const cookieSession = require("cookie-session");

const cookieSessionMiddleware = cookieSession({
    secret: `Hands 0FF ! This one is #dangerous to taz.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("/gig-creator", (req, res) => {
    db.getUser(req.session.userId)
        .then(({ rows }) => {
            if (!rows[0].admin) {
                res.redirect("/");
            } else {
                res.sendFile(
                    path.join(__dirname, "..", "client", "index.html")
                );
            }
        })
        .catch((err) => console.log(err));
});

app.get("/gig-editor", (req, res) => {
    db.getUser(req.session.userId)
        .then(({ rows }) => {
            if (!rows[0].admin) {
                res.redirect("/");
            } else {
                res.sendFile(
                    path.join(__dirname, "..", "client", "index.html")
                );
            }
        })
        .catch((err) => console.log(err));
});

app.post("/login", (req, res) => {
    if (req.body.nickname && req.body.password) {
        db.loginCheck(req.body.nickname)
            .then(({ rows }) => {
                if (!rows) {
                    res.json({ data: null });
                }
                compare(req.body.password, rows[0].password_hash)
                    .then((match) => {
                        if (match) {
                            req.session.userId = rows[0].id;
                            res.json({ data: rows[0] });
                        } else {
                            res.json({ error: true });
                        }
                    })
                    .catch((err) => {
                        res.json({ error: true });
                        console.log(err);
                    });
            })
            .catch((err) => {
                res.json({ error: true });
                console.log(err);
            });
    } else {
        res.json({ data: null });
    }
});

app.post("/register", (req, res) => {
    if (req.body.nickname && req.body.password) {
        let { nickname, password } = req.body;

        hash(password)
            .then((password_hash) => {
                db.addRegistration(nickname, password_hash)
                    .then(({ rows }) => {
                        req.session.userId = rows[0].id;
                        res.json({ data: rows[0] });
                    })
                    .catch((err) => {
                        res.json({ error: true });
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json({ data: null });
    }
});

app.get("/user-details", (req, res) => {
    db.getUser(req.session.userId)
        .then(({ rows }) => {
            if (!rows[0]) {
                req.session = null;
                res.redirect("/");
            } else {
                res.json({ data: rows[0] });
            }
        })
        .catch((err) => console.log(err));
});

app.post("/gig-creator", (req, res) => {
    let { date, venue, lat, lng, tour_name, city } = req.body;
    if (!req.body.tour_name) {
        tour_name = "";
    }
    if (!req.body.venue) {
        venue = "";
    }
    if (!req.body.city) {
        city = "";
    }
    db.addGig(date, venue, lat, lng, tour_name, city)
        .then(({ rows }) => {
            res.json({ success: true });
        })
        .catch((err) => {
            res.json({ error: true });
            console.log(err);
        });
});

app.get("/get-gigs", (req, res) => {
    db.getGigs()
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.post("/get-gig-to-edit", (req, res) => {
    db.getGigToEdit(req.body.selectedGig)
        .then(({ rows }) => {
            res.json({ data: rows[0] });
        })
        .catch((err) => console.log(err));
});

app.post("/gig-delete", (req, res) => {
    db.getGig(req.body.selectedGig.id)
        .then(({ rows }) => {
            if (rows[0].poster) {
                const file2delete = rows[0].poster.replace(s3Url, "");
                s3.delete(file2delete);
            }
        })
        .catch((err) => {
            res.json({ error: true });
            console.log(err);
        });
    db.deleteCommentsEditor(req.body.selectedGig.id)
        .then(({ rows }) => {
            db.deleteGig(req.body.selectedGig.date).then(({ rows }) => {
                res.json({ deleteSuccess: true });
            });
        })
        .catch((err) => console.log(err));
});

app.get("/gig/:selection", (req, res) => {
    db.getGig(req.params.selection)
        .then(({ rows }) => {
            res.json({ data: rows[0] });
        })
        .catch((err) => console.log(err));
});

app.post("/gig-update", (req, res) => {
    let { date, venue, lat, lng, tour_name, city, poster } =
        req.body.selectedGig;
    if (poster == "") {
        poster = null;
    }
    db.updateGig(
        req.body.date || date,
        req.body.venue || venue,
        req.body.lat || lat,
        req.body.lng || lng,
        req.body.tour_name || tour_name,
        req.body.city || city,
        req.body.selectedPoster || poster
    )
        .then(({ rows }) => {
            res.json({ data: rows[0] });
        })
        .catch((err) => {
            res.json({ error: true });
            console.log(err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const data = JSON.parse(req.body.data);

    db.getGig(data.id)
        .then(({ rows }) => {
            if (rows[0].poster) {
                const file2delete = rows[0].poster.replace(s3Url, "");
                s3.delete(file2delete);
            }
        })
        .catch((err) => {
            res.json({ error: true });
            console.log(err);
        });

    db.addImage(data.id, s3Url + filename)
        .then(({ rows }) => {
            res.json({ success: true });
        })
        .catch((err) => {
            res.json({ error2: true });
            console.log(err);
        });
});

app.post(
    "/upload-community-image",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        const { filename } = req.file;
        db.addCommunityImage(
            req.body.data,
            req.body.user,
            req.body.nickname,
            s3Url + filename
        )
            .then(({ rows }) => {
                res.json({ rows, success: true });
            })
            .catch((err) => {
                res.json({ error: true });
                console.log(err);
            });
    }
);

app.post("/get-community-images", (req, res) => {
    db.getCommunityImages(req.body.selectedGigId)
        .then(({ rows }) => {
            res.json({ rows });
        })
        .catch((err) => {
            res.json({ error: true });
            console.log(err);
        });
});

app.post("/delete-community-image", (req, res) => {
    db.deleteCommunityImage(req.body.imageId)
        .then(({ rows }) => {
            const file2delete = rows[0].img_url.replace(s3Url, "");
            s3.delete(file2delete);
            res.json({ success: true, data: rows[0] });
        })
        .catch((err) => {
            res.json({ error: true });
            console.log(err);
        });
});

app.post("/change-nickname", (req, res) => {
    db.changeNickname(req.body.nickname, req.session.userId)
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => {
            res.json({ error: true });
            console.log(err);
        });
});

app.post("/change-password", (req, res) => {
    hash(req.body.password)
        .then((password_hash) => {
            db.changePassword(password_hash, req.session.userId)
                .then(({ rows }) => {
                    res.json({ data: rows });
                })
                .catch((err) => {
                    res.json({ error: true });
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.get("/counter", (req, res) => {
    let forwarded = req.headers["x-forwarded-for"];
    let ip;
    if (forwarded) {
        ip = forwarded.split(/, /)[0];
    } else {
        ip = req.connection.remoteAddress;
    }
    let ipFiltered = ip.split(":");
    ipFiltered = ipFiltered[ipFiltered.length - 1];

    db.checkVisitorIps(ipFiltered)
        .then(({ rows }) => {
            if (!rows[0]) {
                db.addVisitorIp(ipFiltered)
                    .then(({ rows }) => {})
                    .catch((err) => console.log(err));
            }
            db.checkAllVisitorIps()
                .then(({ rows }) => {
                    res.json({ data: rows.length });
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
});

app.post("/addChatPic", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    db.getUser(req.session.userId)
        .then(({ rows }) => {
            if (rows[0].chat_img) {
                const file2delete = rows[0].chat_img.replace(s3Url, "");
                s3.delete(file2delete);
            }
        })
        .catch((err) => console.log(err));

    db.addChatPic(s3Url + filename, req.session.userId)
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => {
            res.json({ error: true });
            console.log(err);
        });
});

app.post("/changeColor", (req, res) => {
    let color = Object.keys(req.body)[0];
    db.addChatColor(req.session.userId, color)
        .then(({ rows }) => {
            res.json({ data: rows[0] });
        })
        .catch((err) => console.log(err));
});

app.get("/get-images", (req, res) => {
    db.getImages()
        .then(({ rows }) => {
            res.json({ rows });
        })
        .catch((err) => console.log(err));
});

app.get("/get-all-users", (req, res) => {
    db.getAllUsers()
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.post("/delete-user", (req, res) => {
    db.deleteAllUserPosts(req.body.id)
        .then(({ rows }) => {
            db.deletePrivateMessages(req.body.id)
                .then(({ rows }) => {
                    db.deleteComments(req.body.id)
                        .then(({ rows }) => {
                            db.deleteUser(req.body.id)
                                .then(({ rows }) => {
                                    if (rows[0].chat_img) {
                                        const file2delete =
                                            rows[0].chat_img.replace(s3Url, "");
                                        s3.delete(file2delete);
                                    }
                                    res.json({ data: rows });
                                })
                                .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
});

app.post("/set-admin", (req, res) => {
    db.setUserAdmin(req.body.id, req.body.boolean)
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.post("/set-super-admin", (req, res) => {
    db.setUserSuperAdmin(req.body.id, req.body.boolean)
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.post("/get-comments", (req, res) => {
    db.getComments(req.body.selectedGigId)
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.post("/add-comment", (req, res) => {
    db.addComment(req.body.selectedGigId, req.body.myUserId, req.body.comment)
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.post("/get-private-messages", (req, res) => {
    db.getPrivateMsgs(req.body.chat_myUserId, req.body.userPrivate)
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.get("/filtered-private", (req, res) => {
    db.getFilteredPrivate(req.session.userId)
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.post("/seen-private-messages", (req, res) => {
    db.seenPrivateMsgs(req.body.firstMsgId)
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.post("/add-private-message", (req, res) => {
    db.addPrivateMsg(
        req.body.chat_myUserId,
        req.body.userPrivate,
        req.body.message
    )
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.get("/get-network-users", (req, res) => {
    db.getNetworkUsers()
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.get("/get-guests", (req, res) => {
    db.getGuests()
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.get("/delete-guests", (req, res) => {
    db.deleteGuests()
        .then(({ rows }) => {
            res.json({ data: rows });
        })
        .catch((err) => console.log(err));
});

app.post("/chat", function (req, res) {
    goOffline = req.body.goOffline;
    res.json({ done: true });
});

app.post("/set-user-status", (req, res) => {
    db.setUserStatus(req.body.online, req.session.userId)
        .then(({ rows }) => {
            res.json({ rows });
        })
        .catch((err) => {
            res.json({ error: true });
            console.log(err);
        });
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, () =>
    console.log(
        `🟢 Listening Port ${server.address().port} ... ~ 100mods Gig Guide ~`
    )
);

var goOffline = false;

let onlineUsers = {};

io.on("connection", function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;

    onlineUsers[socket.id] = userId;

    const userIds = Object.values(onlineUsers);

    var count = 0;

    userIds.forEach((item) => {
        if (item == userId) {
            count++;
        }
    });
    socket.emit("browserCount", count);

    let filteredUsers = userIds.filter(
        (id, user) => userIds.indexOf(id) === user
    );

    db.getOnlineUsers(filteredUsers).then(({ rows }) => {
        io.emit("usersOnline", rows);
    });

    db.getUser(userId)
        .then(({ rows }) => {
            socket.broadcast.emit("userJoined", rows);
        })
        .catch((err) => console.log(err));

    db.getChatMsgs()
        .then(({ rows }) => {
            var clearRows = [];
            for (x = 0; x < rows.length - 1; x++) {
                if (
                    !rows[x].chat_msg.includes("--##--entered--##--") &&
                    !rows[x].chat_msg.includes("--##--left--##--")
                ) {
                    clearRows.push(rows[x]);
                }
            }
            clearRows.splice(10, rows.length - 1);
            socket.emit("chatMessages", clearRows);
        })
        .catch((err) => console.log(err));

    socket.on("A CHAT MSG", (msg) => {
        db.addChatMsg(userId, msg)
            .then(() => {
                db.getChatMsgs()
                    .then(({ rows }) => {
                        io.emit("chatMessage", rows[0]);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    });

    socket.on("DELETE MSG", (chatMessages, e) => {
        db.deleteChatPost(e)
            .then(({ rows }) => {
                socket.emit("chatMessages", chatMessages);
            })
            .catch((err) => console.log(err));
    });

    socket.on("NEXT MSGS", (id) => {
        db.getNextMsgs(id)
            .then(({ rows }) => {
                socket.emit("nextChatMessages", rows);
            })
            .catch((err) => console.log(err));
    });

    socket.on("ADD COMMENT", (comment) => {
        io.emit("addComment", comment);
    });

    socket.on("COMMENTS", (comments) => {
        socket.emit("comments", comments);
    });

    socket.on("ADD IMAGE", (image) => {
        io.emit("addImage", image);
    });

    socket.on("DELETE IMAGE", (image) => {
        io.emit("deleteImage", image);
    });

    socket.on("GET IMAGES", (images) => {
        socket.emit("images", images);
    });

    socket.on("PRIVATE MESSAGES", (messages) => {
        socket.emit("privateMessages", messages);
    });

    socket.on("PRIVATE MESSAGE", (message) => {
        io.emit("privateMessage", message);
    });

    socket.on("ONLINE USERS", (users) => {
        io.emit("usersOnline", users);
    });

    // console.log(`socket ${socket.id} connected`);

    socket.on("disconnect", () => {
        socket.emit("browserCount", count--);
        var userIdDisconnected = onlineUsers[socket.id];
        var userStillOnline = false;
        delete onlineUsers[socket.id];

        for (var socketId in onlineUsers) {
            if (onlineUsers[socketId] == userIdDisconnected) {
                userStillOnline = true;
            }
        }
        if (!userStillOnline) {
            io.emit("userLeft", userIdDisconnected);
            if (count == 0 && goOffline) {
                db.addChatMsg(userId, "--##--left--##--")
                    .then(() => {
                        db.getChatMsgs()
                            .then(({ rows }) => {
                                io.emit("chatMessage", rows[0]);
                            })
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            }
            let boolean = false;
            db.setUserStatus(boolean, userId)
                .then(({ rows }) => {
                    filteredUsers = filteredUsers.filter(
                        (user) => user != userId
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
});
