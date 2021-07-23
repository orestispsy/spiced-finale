import { useState, useEffect, useRef } from "react";
import axios from "./tools/axios";
import { socket } from "./tools/socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OnlineUsers from "./onlineUsers";
import Ticker from "./ticker";

import useSound from "use-sound";

import chatSfx from "./../public/msg.mp3";

export default function Chat({ chat_color, chat_img, chat_myUserId, admin }) {
    const [emojiBar, setEmojiBar] = useState(false);
    const [tickerBar, setTickerBar] = useState(false);
    const [mute, setMute] = useState(false);

    const [play] = useSound(chatSfx, { volume: 0.75 });

    const elemRef = useRef();

    const chatMessages = useSelector((state) => state && state.chatMessages);

    // console.log("THE MESSAGES", chatMessages);

    useEffect(() => {
        if (elemRef.current) {
            const newScrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
            elemRef.current.scrollTop = newScrollTop;
        }
        if (!mute) {
            play();
        }
    }, [chatMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            if (e.target.value !== "") {
                e.preventDefault();
                // console.log("TEXTAREA VALUE", e.target.value);
                var msgLink = e.target.value.split(/\s+/);
                // console.log("yep", msgLink);
                msgLink.forEach((element, index) => {
                    if (
                        element.startsWith("http") ||
                        element.startsWith("www.")
                    ) {
                        let url = element;
                        if (element.startsWith("www.")) {
                            url = `https://` + url;
                        }
                        // console.log("yes", element);
                        msgLink[
                            index
                        ] = `<a href=${url} target="_blank">${element}</a>`;
                        e.target.value = msgLink.join(" ");
                    }
                }, msgLink);
                socket.emit("A CHAT MSG", e.target.value);
                e.target.value = "";
            }
            e.preventDefault();
        }
    };

    const elem = document.querySelectorAll(".chatTypeLine");
    var chatMSG = false;
    const chat = (e) => {
        chatMSG = e.target.value;
    };

    const sendChatMsgButton = () => {
        if (chatMSG) {
            socket.emit("A CHAT MSG", chatMSG);
            chatMSG = false;
            elem[0].value = "";
        }
    };

    const next20ChatMsgs = () => {
        socket.emit("NEXT MSGS", chatMessages[0].id);
        const timer = setTimeout(() => {
            elemRef.current.scrollTop = -elemRef.current.scrollTop;
        }, 500);
        return () => clearTimeout(timer);
    };

    const getBack2Top = () => {
        elemRef.current.scrollTop = -elemRef.current.scrollTop;
    };
    const getBack2Bottom = () => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    };
    const sendEmoji = (e) => {
        chatMSG = e.target.attributes[0].value;
        var msg = `<img class="emojis" src=${chatMSG}>`;
        socket.emit("A CHAT MSG", msg);
    };

    const toggleEmojibar = () => {
        setEmojiBar(!emojiBar);
    };

    const toggleTicker = () => {
        setTickerBar(!tickerBar);
    };

    const handleChatPostDelete = (e) => {
        const position = elemRef.current.scrollTop;

        socket.emit(
            "DELETE MSG",
            chatMessages.reverse().filter((msg) => msg.id !== e),
            e
        );

        const timer = setTimeout(() => {
            elemRef.current.scrollTop = position;
        }, 500);
        return () => clearTimeout(timer);
    };

    if (!chatMessages) {
        return null;
    }

    return (
        <div className="chatContainerBack">
            {tickerBar && <Ticker tickerBar={tickerBar} />}
            <div className="mobileChat">
                <div className="chatContainer">
                    <h1>Chat Room</h1>
                    <div className="chatScreenBack">
                        <div className="chatScreen" ref={elemRef}>
                            <div className="chatNextControls">
                                <div
                                    title="Chat Top"
                                    className="up"
                                    onClick={() => getBack2Top()}
                                >
                                    ▲
                                </div>
                                <div
                                    title="Chat Bottom"
                                    className="down"
                                    onClick={() => getBack2Bottom()}
                                >
                                    ▼
                                </div>
                                <div
                                    title="Load Μore Chat Messages"
                                    className="next"
                                    onClick={() => next20ChatMsgs()}
                                >
                                    ⦿
                                </div>
                            </div>
                            {chatMessages.map((msg) => {
                                var diff = new Date().getTimezoneOffset() / -60;

                                let msgDate = msg.created_at
                                    .slice(0, 10)
                                    .split("-");
                                var fixedDate =
                                    msgDate[2] +
                                    "-" +
                                    msgDate[1] +
                                    "-" +
                                    msgDate[0];

                                let msgTime = msg.created_at
                                    .slice(11, 19)
                                    .split(":");

                                if (msgTime[0].startsWith("0")) {
                                    msgTime[0] = msgTime[0].slice(1, 2);
                                }
                                var fixedTime =
                                    JSON.parse(msgTime[0]) +
                                    diff +
                                    ":" +
                                    msgTime[1] +
                                    ":" +
                                    msgTime[2];

                                if (msg.chat_msg === "--##--left--##--") {
                                    // console.log("msgDate", msgDate[2]);
                                    // const date1 = new Date();
                                    // console.log(date1.getDay());
                                    // if (date1.getDate() > msgDate[2]) {
                                    //     return;
                                    // } else
                                    {
                                        return (
                                            <p
                                                className="userLeaves"
                                                key={msg.id}
                                            >
                                                {msg.nickname} has left the chat
                                            </p>
                                        );
                                    }
                                } else if (
                                    msg.chat_msg === "--##--entered--##--"
                                ) {
                                    return (
                                        <p className="userEnters" key={msg.id}>
                                            {msg.nickname} joined the chat !
                                        </p>
                                    );
                                } else {
                                    return (
                                        <div className="chatPost" key={msg.id}>
                                            <div className="post">
                                                <div className="userChatDetails">
                                                    <img
                                                        src={
                                                            msg.chat_img ||
                                                            "./../na.jpg"
                                                        }
                                                    ></img>
                                                    <h1>{msg.nickname}</h1>
                                                </div>
                                                {admin && chat_myUserId ==
                                                    msg.msg_sender_id && (
                                                    <div
                                                        title="Delete"
                                                        className="deleteChatMsg"
                                                        onClick={(e) =>
                                                            handleChatPostDelete(
                                                                msg.id
                                                            )
                                                        }
                                                    ></div>
                                                )}
                                                <div
                                                    className="finalMessage"
                                                    style={{
                                                        color:
                                                            msg.chat_color ||
                                                            `yellow`,
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: msg.chat_msg,
                                                    }}
                                                ></div>
                                            </div>

                                            <div className="date">
                                                {fixedDate}
                                            </div>
                                            <div className="time">
                                                {fixedTime}
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div className="typeLine">
                        <textarea
                            rows="1"
                            className="chatTypeLine"
                            onKeyDown={(e) => keyCheck(e)}
                            onChange={(e) => {
                                chat(e);
                            }}
                        ></textarea>
                        <div
                            title="Send Message"
                            className="sendChatMsg"
                            onClick={() => sendChatMsgButton()}
                        ></div>
                        <div className="chatControls">
                            {!mute && (
                                <div
                                    title="Mute"
                                    className="mute"
                                    onClick={() => setMute(!mute)}
                                ></div>
                            )}
                            {mute && (
                                <div
                                    title="Play"
                                    className="play"
                                    onClick={() => setMute(!mute)}
                                ></div>
                            )}
                        </div>
                        <div
                            title="Emojis!"
                            className="emojiBarToggler"
                            onClick={() => toggleEmojibar()}
                        ></div>
                    </div>
                </div>
                <OnlineUsers
                    mute={mute}
                    chat_img={chat_img}
                    chat_myUserId={chat_myUserId}
                    emojiBar={emojiBar}
                    sendEmoji={(e) => sendEmoji(e)}
                    chat_color={chat_color}
                />
            </div>
            <Link to="/" className="backLink">
                Back
            </Link>
            <div
                className="tickerButton"
                onClick={() => toggleTicker(!tickerBar)}
            >
                {tickerBar && `Stop Ticker`} {!tickerBar && `Start Ticker`}
            </div>
        </div>
    );
}
