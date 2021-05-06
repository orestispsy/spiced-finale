import { useState, useEffect, useRef } from "react";
import { socket } from "./tools/socket";
import { useSelector } from "react-redux";

import OnlineUsers from "./onlineUsers";
import Ticker from "./ticker";

import useSound from "use-sound";

import chatSfx from "./../public/msg.mp3";

export default function Chat({ chat_color, chat_img, chat_myUserId }) {
    const [emojiBar, setEmojiBar] = useState(false);
    const [tickerBar, setTickerBar] = useState(true);
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

    if (!chatMessages) {
        return null;
    }

    return (
        <div className="chatContainerBack">
            {tickerBar && <Ticker />}
            <div className="chatContainer">
                <h1>Chat Room</h1>
                <div className="chatScreenBack">
                    <div className="chatScreen" ref={elemRef}>
                        {chatMessages.map((msg) => {
                            var msgLink = msg.chat_msg.split(/\s+/);
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
                                    msgLink[index] = `
                                                <a  
                                                    href=${url}
                                                    target="_blank"
                                                   
                                                >
                                                    ${element}
                                                </a>`;
                                    msg.chat_msg = msgLink.join(" ");
                                }
                            }, msgLink);

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
                                return (
                                    <p className="userLeaves" key={msg.id}>
                                        {msg.nickname} has left the chat
                                    </p>
                                );
                            } else if (msg.chat_msg === "--##--entered--##--") {
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
                                            <div
                                                className="customColor"
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
                                        <div className="date">{fixedDate}</div>
                                        <div className="time">{fixedTime}</div>
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
                        className="sendChatMsg"
                        onClick={() => sendChatMsgButton()}
                    >
                        ➤
                    </div>

                    {!mute && (
                        <div
                            className="mute"
                            onClick={() => setMute(!mute)}
                        ></div>
                    )}
                    {mute && (
                        <div
                            className="play"
                            onClick={() => setMute(!mute)}
                        ></div>
                    )}
                    <div
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
            {tickerBar && (
                <div
                    className="tickerButton"
                    onClick={() => toggleTicker(!tickerBar)}
                >
                    Stop Ticker
                </div>
            )}
        </div>
    );
}
