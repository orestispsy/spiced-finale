import { useState, setState, useEffect, useRef } from "react";
import { socket } from "./tools/socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import OnlineUsers from "./onlineUsers";

import useSound from "use-sound";

import chatSfx from "./../public/msg.mp3";

let emoji = require("./tools/customEmoj.json");
console.log(emoji)

export default function Chat({}) {
    const [mute, setMute] = useState(false);

    const [play] = useSound(chatSfx, { volume: 0.75 });
    const [playOff] = useSound(chatSfx, { volume: 0 });

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
        var y = `<img class="emojis" src=${chatMSG}><img>`;
         console.log(chatMSG);
            socket.emit("A CHAT MSG", y);
    };


    if (!chatMessages) {
        return null;
    }

    return (
        <div className="chatContainerBack">
            <div className="chatContainer">
                <h1>Chat Room</h1>
                <div className="chatScreenBack">
                    <div className="chatScreen" ref={elemRef}>
                        {chatMessages.map((msg) => {
                            // var msgLink = msg.chat_msg.split(" ");
                            // console.log(msgLink)
                            // var fixedLinkMsg="";
                            // for (let i=0; i<=msgLink.length; i++) {
                            //     if (
                            //         msgLink[i]) {
                            //             if  (msgLink[i].startsWith("http")) {
                            //                 fixedLinkMsg = (
                            //                     <a
                            //                         href={msgLink[i]}
                            //                         target="_blank"
                            //                         style={{
                            //                             color: `coral`,
                            //                             fontSize: `20px`,
                            //                         }}
                            //                     >
                            //                         {msgLink[i]}
                            //                     </a>
                            //                 );

                            //             }

                            //         }

                            // }

                            //     console.log("there you go", msg.chat_msg)

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
                                    <p
                                        className="userLeaves"
                                       
                                        key={msg.id}
                                    >
                                        {msg.nickname} has left the chat
                                    </p>
                                );
                            } else if (msg.chat_msg === "--##--entered--##--") {
                                return (
                                    <p
                                        className="userEnters"
                                      
                                        key={msg.id}
                                    >
                                        {msg.nickname} joined the chat !
                                    </p>
                                );
                            } else if (
                                msg.chat_msg.startsWith("http") &&
                                !msg.chat_msg.includes(" ") &&
                                msg.chat_msg.length > 11
                            ) {
                                return (
                                    <div key={msg.id}>
                                        <p>
                                            <span>{msg.nickname}</span>
                                            <a
                                                href={msg.chat_msg}
                                                target="_blank"
                                                style={{
                                                    color: `greenolive`,
                                                    fontSize: `20px`,
                                                }}
                                            >
                                                {msg.chat_msg}
                                            </a>
                                        </p>
                                        <div
                                            style={{
                                                color: `black`,
                                                fontSize: `10px`,
                                                marginTop: `-20px`,
                                            }}
                                        >
                                            {fixedDate} {fixedTime}
                                        </div>
                                    </div>
                                );
                            } else if (
                                msg.chat_msg.startsWith("www") &&
                                !msg.chat_msg.includes("http") &&
                                !msg.chat_msg.includes(" ") &&
                                msg.chat_msg.length > 8
                            ) {
                                return (
                                    <div key={msg.id}>
                                        <p>
                                            <span>{msg.nickname}</span>
                                            <a
                                                href={"https://" + msg.chat_msg}
                                                target="_blank"
                                                style={{
                                                    color: `coral`,
                                                    fontSize: `20px`,
                                                }}
                                            >
                                                {msg.chat_msg}
                                            </a>
                                        </p>
                                        <div
                                            style={{
                                                color: `black`,
                                                fontSize: `10px`,
                                                marginTop: `-20px`,
                                            }}
                                        >
                                            {fixedDate} {fixedTime}
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={msg.id}>
                                        <p>
                                            <span>{msg.nickname}</span>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: msg.chat_msg,
                                                }}
                                            >     
                                            </div>
                                        </p>
                                        <div
                                            style={{
                                                color: `yellow`,
                                                fontSize: `10px`,
                                                marginTop: `-20px`,
                                            }}
                                        >
                                            {fixedDate} {fixedTime}
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className="emoticons">
                    {emoji &&
                        emoji.map((emoj) => (
                            <p key={emoj.id}>
                                <img
                                    src={emoj.url}
                                    onClick={(e) => sendEmoji(e)}
                                ></img>
                            </p>
                        ))}
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
                </div>
            </div>
            <OnlineUsers mute={mute} />
        </div>
    );
}
