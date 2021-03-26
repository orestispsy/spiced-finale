const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./utils/db");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("/login", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/login", (req, res) => {
    console.log("login body", req.body);
    if (req.body.nickname && req.body.password) {
        const { nickname, password } = req.body;
        db.loginCheck(nickname)
            .then(({ rows }) => {
                console.log("LOGIN ROWS", rows);
                if (!rows) {
                    res.json({ data: null });
                }
                compare(req.body.password, rows[0].password_hash)
                    .then((match) => {
                        if (match) {
                            req.session.userId = rows[0].id;
                            res.json({ data: rows[0] });
                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    } else {
        res.json({ data: null });
    }
});

app.post("/welcome", (req, res) => {
    console.log("welcome body", req.body);
    if (req.body.nickname && req.body.password) {
        const { nickname, password } = req.body;
        hash(password)
            .then((password_hash) => {
                db.addRegistration(nickname, password_hash)
                    .then(({ rows }) => {
                        console.log("REGISTRATION ROWS", rows);
                        req.session.userId = rows[0].id;
                        console.log("USER ID IN COOKIE:", req.session.userId);
                        res.json({ data: rows[0] });
                    })
                    .catch((err) => {
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
    db.getGigs()
        .then(({ rows }) => {
            console.log("GETTING USER ROWS", rows);
            res.json({ data: rows[0] });
        })
        .catch((err) => console.log(err));
});

app.get("/login", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});


let tables = {};
db.check()
    .then(({ rows }) => {
        console.log("Check", rows);

        for (var i = 0; i < rows.length; i++) {
            tables[i] = rows[i].tablename;
        }
        console.log("tables", tables);
    })

    .catch((err) => console.log(err));

server.listen(process.env.PORT || 3001, () =>
    console.log(
        `🟢 Listening Port ${server.address().port} ... ~ 1000mods Gig Guide ~`
    )
);


