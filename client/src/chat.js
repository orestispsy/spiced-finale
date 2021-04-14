import { useEffect, useRef } from "react";
import { socket } from "./tools/socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import OnlineUsers from "./onlineUsers";

export default function Chat({}) {
    const elemRef = useRef();

    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("THE MESSAGES", chatMessages);

    useEffect(() => {
        if (elemRef.current) {
            const newScrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
            elemRef.current.scrollTop = newScrollTop;
        }
    }, [chatMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("TEXTAREA VALUE", e.target.value);
            socket.emit("A CHAT MSG", e.target.value);
            e.target.value = "";
        }
    };

    if (!chatMessages) {
        return null;
    }

    return (
        <div className="chatContainerBack">
            <div className="chatContainer">
                <h1>Live Chat</h1>
                <div className="chatScreenBack">
                    <div className="chatScreen" ref={elemRef}>
                        {chatMessages.map((msg) => (
                            <p key={msg.id}>
                                <span>
                                    {msg.nickname}
                                </span>
                                {msg.chat_msg}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="typeLine">
                    <p>Chat</p>
                    <textarea
                        className="chatTypeLine"
                        onKeyDown={(e) => keyCheck(e)}
                    ></textarea>
                </div>
            </div>
            <OnlineUsers />
            <Link to="/" className="backLink">
                Back
            </Link>
        </div>
    );
}
