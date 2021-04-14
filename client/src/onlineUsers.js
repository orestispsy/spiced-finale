import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function OnlineUsers() {
    const onlineUsers = useSelector((state) => state && state.onlineUsers);
    console.log("onlineUsers", onlineUsers);

    return (
        <>
            <div className="onlineUsers">
                {onlineUsers &&
                    onlineUsers.map((msg) => (
                        <p key={msg.id}>
                            <span>
                                {msg.nickname}
                            </span>
                            {msg.chat_msg}
                        </p>
                    ))}
            </div>
        </>
    );
}
