import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "./tools/axios";

import { socket } from "./tools/socket";
import { useSelector } from "react-redux";

export default function PrivateMSGS({
    chat_myUserId,
    userPrivate,
    chat_img,
    privatePic,
    nickname,
    privateNick,
    setFilteredPrivateMessages,
    list,
    darkMode,
    playNotification,
    mute
}) {
    const [firstMsgId, setFirstMsgId] = useState(null);

    const messages = useSelector((state) => state && state.messages);

    const elemRef = useRef();

    useEffect(() => {
        if (elemRef.current) {
            const newScrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
            elemRef.current.scrollTop = newScrollTop;
        }
        setFirstMsgId(messages[messages.length - 1]);

    }, [messages]);

    useEffect(() => {
        if (chat_myUserId && userPrivate) {
            axios
                .post("/get-private-messages", {
                    chat_myUserId,
                    userPrivate,
                    privatePic,
                })
                .then(({ data }) => {
                    socket.emit("PRIVATE MESSAGES", data.data);
                    if (data.data[0]) {
                        setFirstMsgId(data.data[data.data.length - 1]);
                    }
                })
                .catch((err) => {
                    console.log("error", err);
                });
            axios
                .get("/filtered-private")
                .then(({ data }) => {
                    setFilteredPrivateMessages(data.data);
                })
                .catch((err) => {
                    console.log("error", err);
                });
        }
    }, []);

    useEffect(() => {
        if (firstMsgId) {
                if (!mute && firstMsgId.msg_seen) {
                    playNotification();
                }
         
            axios
                .post("/get-private-messages", {
                    chat_myUserId,
                    userPrivate,
                    privatePic,
                })
                .then(({ data }) => {
                    if (
                        data.data[data.data.length - 1].id ==
                        messages[messages.length - 1]
                    ) {
                        if (
                            firstMsgId.msg_receiver_id == chat_myUserId &&
                            firstMsgId.id == messages[messages.length - 1]
                        ) {
                            setPrivateMsgsIfSeen(firstMsgId.id);
                        }
                    }
                })
                .catch((err) => {
                    console.log("error", err);
                });
            if (
                firstMsgId.msg_sender_id == userPrivate
            ) {
                setPrivateMsgsIfSeen(firstMsgId.id);
            }
        }
    }, [firstMsgId]);

    const setPrivateMsgsIfSeen = (e) => {
        axios
            .post("/seen-private-messages", {
                firstMsgId: e,
            })
            .then(({ data }) => {})
            .catch((err) => {
                console.log("error", err);
            });
    };

    const addPrivateMsg = (e) => {
        if (e == "") {
            return;
        }
        axios
            .post("/add-private-message/", {
                chat_myUserId,
                userPrivate,
                message: e,
            })
            .then(({ data }) => {
                socket.emit("PRIVATE MESSAGE", {
                    ...data.data[0],
                    chat_img: chat_img,
                });
                elem[0].value = "";
            })
            .catch((err) => {
                console.log("err in Private Message Post Request : ", err);
            });
    };

    let fixedTime;
    let fixedDate;
    let msgDate;
    let msgTime;
    let diff = new Date().getTimezoneOffset() / -60;
    const handleTime = (e) => {
        if (e.created_at) {
            msgDate = e.created_at.slice(0, 10).split("-");
            fixedDate = msgDate[2] + "-" + msgDate[1] + "-" + msgDate[0];

            msgTime = e.created_at.slice(11, 19).split(":");

            if (msgTime[0].startsWith("0")) {
                msgTime[0] = msgTime[0].slice(1, 2);
            }
            fixedTime =
                JSON.parse(msgTime[0]) +
                diff +
                ":" +
                msgTime[1] +
                ":" +
                msgTime[2];
        }
    };

    const elem = document.querySelectorAll(".chatTypeLine");
    var chatMSG = false;
    const chat = (e) => {
        chatMSG = e.target.value;
    };

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            if (e.target.value !== "") {
                e.preventDefault();
                var msgLink = e.target.value.split(/\s+/);
                msgLink.forEach((element, index) => {
                    if (
                        element.startsWith("http") ||
                        element.startsWith("www.")
                    ) {
                        let url = element;
                        if (element.startsWith("www.")) {
                            url = `https://` + url;
                        }
                        msgLink[
                            index
                        ] = `<a href=${url} target="_blank">${element}</a>`;
                        e.target.value = msgLink.join(" ");
                    }
                }, msgLink);
                addPrivateMsg(e.target.value);
                e.target.value = "";
            }
            e.preventDefault();
        }
    };

    return (
        <>
            <div
                className="chatContainer"
                id={(list && "chatContainerDark") || ""}
            >
                <h1 id="chatTitlePriv">Private Chat</h1>
                <div className="chatScreenBack">
                    <div
                        className="chatScreen"
                        id={(darkMode && "chatScreenDark") || ""}
                        ref={elemRef}
                    >
                        {messages &&
                            messages.map((msg) => {
                                handleTime(msg);
                                return (
                                    <div key={msg.id}>
                                        {(msg.msg_receiver_id == userPrivate ||
                                            msg.msg_sender_id == userPrivate) &&
                                            (msg.msg_receiver_id ==
                                                chat_myUserId ||
                                                msg.msg_sender_id ==
                                                    chat_myUserId) && (
                                                <div className="chatPost">
                                                    <div className="post">
                                                        <div className="userChatDetails">
                                                            <img
                                                                className="postImg"
                                                                src={
                                                                    (msg.msg_sender_id ==
                                                                        chat_myUserId &&
                                                                        chat_img) ||
                                                                    (msg.msg_sender_id !=
                                                                        chat_myUserId &&
                                                                        privatePic) ||
                                                                    "./../avatar.png"
                                                                }
                                                            ></img>
                                                            <div id="nickname">
                                                                {(msg.msg_sender_id ==
                                                                    chat_myUserId &&
                                                                    nickname) ||
                                                                    privateNick}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="finalMessage"
                                                            id="finalMessage"
                                                            dangerouslySetInnerHTML={{
                                                                __html: msg.private_msg,
                                                            }}
                                                        ></div>

                                                        <div
                                                            className="date"
                                                            id={
                                                                (darkMode &&
                                                                    "datePrivDark") ||
                                                                (!darkMode &&
                                                                    "date")
                                                            }
                                                        >
                                                            {fixedDate}
                                                        </div>
                                                        <div
                                                            className="time"
                                                            id="time"
                                                        >
                                                            {fixedTime}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                );
                            })}
                    </div>
                    <div className="typeLine" id="typeline">
                        <textarea
                            rows="1"
                            className="chatTypeLine"
                            onKeyDown={(e) => keyCheck(e)}
                            onChange={(e) => {
                                chat(e);
                            }}
                        ></textarea>
                        <div
                            title="Send Private Message"
                            className="sendChatMsg"
                            onClick={(e) => addPrivateMsg(chatMSG)}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    );
}
