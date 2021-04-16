import { useState, setState, useEffect, useRef } from "react";
import { socket } from "./tools/socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import OnlineUsers from "./onlineUsers";

import useSound from "use-sound";

import chatSfx from "./../public/msg.mp3";

export default function Chat({}) {
    const [mute, setMute] = useState(false);

    
    const [play] = useSound(chatSfx, { volume: 0.75 });
    const [playOff] = useSound(chatSfx, { volume: 0});


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
            if (e.target.value !== ""){
                e.preventDefault();
                // console.log("TEXTAREA VALUE", e.target.value);
                socket.emit("A CHAT MSG", e.target.value);
                e.target.value = "";
            }
            e.preventDefault();
        }
    };

    const elem = document.querySelectorAll(".chatTypeLine");
    var chatMSG=false;
    const chat = (e) => {
        chatMSG = e.target.value
    };

    const sendChatMsg = () => {
       if (chatMSG) {
           socket.emit("A CHAT MSG", chatMSG);
           chatMSG = false;
           elem[0].value = "";  
       }           
    }

    if (!chatMessages) {
        return null;
    }

    return (
        <div className="chatContainerBack">
            <div className="chatContainer">
                <h1>Live Chat</h1>
                <div className="chatScreenBack">
                    <div className="chatScreen" ref={elemRef}>
                        {chatMessages.map((msg) => {
                            if (msg.chat_msg === "--##--left--##--") {
                                return (
                                    <p
                                        style={{
                                            color: `red`,
                                        }}
                                        key={msg.id}
                                    >
                                        {msg.nickname} has left the chat
                                    </p>
                                );
                            } else if (msg.chat_msg === "--##--entered--##--") {
                                return (
                                    <p
                                        style={{
                                            color: `cyan`,
                                        }}
                                        key={msg.id}
                                    >
                                        {msg.nickname} joined the chat !
                                    </p>
                                );
                            } else if (
                                msg.chat_msg.startsWith("http") &&
                                !msg.chat_msg.includes(" ")
                            ) {
                                console.log("yes");
                                return (
                                    <p key={msg.id}>
                                        <span>{msg.nickname}</span>
                                        <a
                                            href={msg.chat_msg}
                                            target="_blank"
                                            style={{
                                                color: `coral`,
                                                fontSize: `20px`,
                                            }}
                                        >
                                            {msg.chat_msg}
                                        </a>
                                    </p>
                                );
                            } else if (
                                msg.chat_msg.startsWith("www") &&
                                !msg.chat_msg.includes("http") &&
                                !msg.chat_msg.includes(" ")
                            ) {
                                console.log("yes");
                                return (
                                    <p key={msg.id}>
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
                                );
                            } else {
                                return (
                                    <p key={msg.id}>
                                        <span>{msg.nickname}</span>
                                        {msg.chat_msg}
                                    </p>
                                );
                            }})}
                    </div>
                </div>
                <div className="typeLine">
                
                        <textarea
                           
                            rows="1"
                            className="chatTypeLine"
                            onKeyDown={(e) => keyCheck(e)}
                            onChange={(e) => {
                                chat(e)}}
                        ></textarea>
                        <div
                            className="sendChatMsg"
                            onClick={() => sendChatMsg()}
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
            <Link to="/" className="backLink">
                Back
            </Link>
        </div>
    );
}
