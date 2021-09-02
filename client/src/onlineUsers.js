import { useSelector } from "react-redux";
import { socket } from "./tools/socket";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "./tools/axios";

let emoji = require("./tools/customEmoj.json");

export default function OnlineUsers({
    chat_img,
    chat_myUserId,
    emojiBar,
    toggleEmojibar,
    sendEmoji,
    chat_color,
    setProfileImage,
    togglePrivateMSGS,
    openPrivate,
    privatePic,
    setPrivatePic,
    privateNick,
    setPrivateNick,
    privateMode,
    setPrivateMode,
    setPrivateMessages,
    privateMessages,
}) {
    const [userPicBar, setUserPicBar] = useState(false);
    const [onlineUserPic, setOnlineUserPic] = useState("");
    const [file, setFile] = useState(null);
    const [closeTag, setcloseTag] = useState(false);
    const [chatColor, setChatColor] = useState(false);
    const [networkList, setNetworkList] = useState(false);
    const [networkUsers, setNetworkUsers] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    const onlineUsers = useSelector((state) => state && state.onlineUsers);

    const statePrivateMsgs = useSelector((state) => state && state.messages);

    useEffect(() => {
        axios
            .get("/get-network-users")
            .then(({ data }) => {
                setNetworkUsers(data.data);
            })
            .catch((err) => {
                console.log("error", err);
            });

        if (!statePrivateMsgs) {
            axios

                .get("/filtered-private")
                .then(({ data }) => {
                    setPrivateMessages(data.data);
                    socket.emit("PRIVATE MESSAGES", data.data);
                })
                .catch((err) => {
                    console.log("error", err);
                });
        }
    }, []);

    useEffect(() => {
        axios
            .get("/filtered-private")
            .then(({ data }) => {
                setPrivateMessages(data.data);
            })
            .catch((err) => {
                console.log("error", err);
            });
    }, [statePrivateMsgs]);

    useEffect(() => {
        if (onlineUsers) {
            let users = onlineUsers;

            users.forEach((element) => {
                if (element.id == chat_myUserId) {
                    element.online = true;
                    socket.emit("ONLINE USERS", users);
                    axios
                        .post("/set-user-status", { online: true })
                        .then(({ data }) => {})
                        .catch((err) => {
                            console.log("error", err);
                        });
                }
            });
        }
    }, []);

    const handleUploaderChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUploaderClick = () => {
        const formData = new FormData();
        formData.append("file", file);
        axios
            .post("/addChatPic", formData)
            .then(({ data }) => {
                if (data.data[0]) {
                    setOnlineUserPic(data.data[0].chat_img);
                    setUserPicBar(!userPicBar);
                    setcloseTag(!closeTag);
                    setProfileImage(data.data[0].chat_img);
                    setFile(null);
                } else {
                    setErrorMsg(true);
                }
            })
            .catch((err) => {
                console.log("error", err);
                setErrorMsg(true);
            });
    };

    const handleColorChange = (e) => {
        axios
            .post("/changeColor", e.target.value)
            .then(({ data }) => {
                setChatColor(data.data.chat_color);
            })
            .catch((err) => {
                console.log("error", err);
            });
    };

    const toggleUploader = () => {
        setUserPicBar(!userPicBar);
        setcloseTag(!closeTag);
        toggleEmojibar(false);
    };

    return (
        <>
            <div
                className="onlineUsersBack"
                style={{
                    marginBottom:
                        (emojiBar && `-5vmax`) || (privateMode && `-2vmax`),
                    marginLeft: privateMode && `1vmax`,
                }}
            >
                <div
                    className="onlineUsers"
                    style={{
                        boxShadow:
                            privateMode &&
                            `-0 0 10px rgba(0, 0, 0, 0.308), 0 -0 10px rgba(0, 0, 0, 0.308),
        -0 -0 10px rgba(0, 0, 0, 0.308), -0 -0 10px rgba(0, 0, 0, 0.308)`,
                    }}
                >
                    {privateMode && (
                        <div
                            className="buttonBack"
                            style={{
                                marginBottom: `-1vmax`,
                                color: `white`,
                                zIndex: `325423`,
                            }}
                            onClick={(e) => {
                                setPrivateMode(false);
                                toggleEmojibar(false);
                            }}
                        >
                            X
                        </div>
                    )}
                    {!userPicBar && !privateMode && (
                        <div
                            className="onlineUsersRedDot"
                            title={
                                privateMode
                                    ? "Back"
                                    : "" || networkList
                                    ? "Online List"
                                    : ""
                            }
                            onClick={(e) => {
                                toggleEmojibar(false);
                                setNetworkList(false);
                            }}
                        ></div>
                    )}
                    {!userPicBar && (
                        <div className="mobileOnlineUsers">
                            {!privateMode && (
                                <div className="chatUserHeadline">
                                    {!networkList && "Online"}
                                </div>
                            )}

                            {!privateMode && networkList && (
                                <div
                                    className="chatUserHeadline"
                                    id="chatUserHeadline"
                                >
                                    Network
                                </div>
                            )}
                            {!privateMode && (
                                <span className="onlineUserCounter">
                                    {!networkList && onlineUsers.length}
                                    {networkList && networkUsers.length}
                                </span>
                            )}
                            <div
                                className="usersBack"
                                style={{
                                    marginTop: privateMode && `-0.2vmax`,
                                    boxShadow: privateMode && `none`,
                                    border: privateMode && `none`,
                                }}
                            >
                                {!privateMode &&
                                    networkList &&
                                    networkUsers.map((user) => (
                                        <div key={user.id}>
                                            <div
                                                className="onlineList"
                                                onClick={(e) => {
                                                    if (
                                                        user.id != chat_myUserId
                                                    ) {
                                                        toggleEmojibar(false);
                                                        togglePrivateMSGS();
                                                        openPrivate(user.id);
                                                        setPrivatePic(
                                                            user.chat_img
                                                        );
                                                        setPrivateNick(
                                                            user.nickname
                                                        );
                                                    }
                                                }}
                                            >
                                                <img
                                                    className="onlineListImg"
                                                    alt={user.nickname}
                                                    src={
                                                        (chat_myUserId ==
                                                            user.id &&
                                                            onlineUserPic) ||
                                                        (user.chat_img &&
                                                            user.chat_img) ||
                                                        "./../avatar.png"
                                                    }
                                                ></img>
                                                <span
                                                    style={{
                                                        color:
                                                            (chat_myUserId ==
                                                                user.id &&
                                                                chatColor) ||
                                                            user.chat_color ||
                                                            `yellow`,
                                                    }}
                                                >
                                                    {user.nickname}
                                                </span>
                                                {privateMessages &&
                                                    privateMessages.map(
                                                        (msg) => {
                                                            if (
                                                                !msg.receiver_seen &&
                                                                msg.msg_sender_id ==
                                                                    user.id
                                                            ) {
                                                                return (
                                                                    <div
                                                                        className="notification"
                                                                        key={
                                                                            msg.id
                                                                        }
                                                                    ></div>
                                                                );
                                                            }
                                                        }
                                                    )}
                                            </div>
                                        </div>
                                    ))}

                                {onlineUsers &&
                                    !networkList &&
                                    !privateMode &&
                                    onlineUsers.map((user) => (
                                        <div key={user.id}>
                                            <div
                                                id={
                                                    (user.online && "online") ||
                                                    (!user.online && "offline")
                                                }
                                                className="onlineList"
                                                onClick={(e) => {
                                                    if (
                                                        user.id != chat_myUserId
                                                    ) {
                                                        toggleEmojibar(false);
                                                        togglePrivateMSGS();
                                                        openPrivate(user.id);
                                                        setPrivatePic(
                                                            user.chat_img
                                                        );
                                                        setPrivateNick(
                                                            user.nickname
                                                        );
                                                    }
                                                }}
                                            >
                                                <img
                                                    className="onlineListImg"
                                                    alt={user.nickname}
                                                    src={
                                                        (chat_myUserId ==
                                                            user.id &&
                                                            onlineUserPic) ||
                                                        (user.chat_img &&
                                                            user.chat_img) ||
                                                        "./../avatar.png"
                                                    }
                                                ></img>

                                                <span
                                                    style={{
                                                        color:
                                                            (chat_myUserId ==
                                                                user.id &&
                                                                chatColor) ||
                                                            user.chat_color ||
                                                            `lime`,
                                                    }}
                                                >
                                                    {user.nickname}{" "}
                                                </span>
                                                {privateMessages &&
                                                    privateMessages.map(
                                                        (msg) => {
                                                            if (
                                                                !msg.receiver_seen &&
                                                                msg.msg_sender_id ==
                                                                    user.id
                                                            ) {
                                                                return (
                                                                    <div
                                                                        className="notification"
                                                                        key={
                                                                            msg.id
                                                                        }
                                                                    ></div>
                                                                );
                                                            }
                                                        }
                                                    )}
                                            </div>
                                        </div>
                                    ))}
                                {privateMode && (
                                    <div>
                                        <img
                                            src={
                                                privatePic || "./../avatar.png"
                                            }
                                            id="privateUserImage"
                                        ></img>
                                    </div>
                                )}
                            </div>
                            {privateMode && (
                                <div id="privateMsgUserNick">{privateNick}</div>
                            )}
                        </div>
                    )}

                    {userPicBar && (
                        <div className="fileUploaderChat">
                            <img
                                src={chat_img || "./../avatar.png"}
                                id="privateUserImage"
                            ></img>
                            <h1>Chat Image</h1>

                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={(e) => handleUploaderChange(e)}
                                onClick={(e) => setErrorMsg(false)}
                            />

                            <div className="uploadChat">
                                <h1 onClick={() => handleUploaderClick()}>
                                    UPDATE
                                </h1>
                                {closeTag && (
                                    <h1
                                        className="toggleChatUploader"
                                        onClick={() => {
                                            setErrorMsg(false);
                                            toggleUploader();
                                        }}
                                    >
                                        CLOSE
                                    </h1>
                                )}
                            </div>
                            {errorMsg && (
                                <p className="error" id="error">
                                    Select an Image [Max Size: 2MB]
                                </p>
                            )}
                        </div>
                    )}
                    {!closeTag && !privateMode && (
                        <div className="chatMenuOptions">
                            <div
                                title="User Network"
                                className="networkList"
                                onClick={() => setNetworkList(!networkList)}
                            ></div>

                            <img
                                className="uploaderTogglerImg"
                                onClick={() => toggleUploader()}
                            ></img>
                            <input
                                className="colorSelector"
                                title="Change Chat Color"
                                type="color"
                                defaultValue={chat_color || `#00f01c`}
                                onChange={(e) => handleColorChange(e)}
                            ></input>
                        </div>
                    )}
                </div>
                {emojiBar && (
                    <div className="emoticons">
                        {emoji &&
                            emoji.map((emoj) => (
                                <div key={emoj.id}>
                                    <img
                                        src={emoj.url}
                                        onClick={(e) => sendEmoji(e)}
                                    ></img>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </>
    );
}
