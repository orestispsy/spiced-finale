import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "./tools/axios";
import useSound from "use-sound";

import chatSfx from "./../public/chat.mp3";

var count = 0;
export default function OnlineUsers({ mute, chat_img, chat_myUserId }) {
    if (chat_img) {
        chat_img = "";
    }
    const [userPicBar, setUserPicBar] = useState(false);
    const [onlineUserPic, setOnlineUserPic] = useState(chat_img);
    const [file, setFile] = useState(null);
    const [closeTag, setcloseTag] = useState(false);

    const [play] = useSound(chatSfx, { volume: 0.25 });

    const onlineUsers = useSelector((state) => state && state.onlineUsers);
    // console.log("onlineUsers", onlineUsers);
    useEffect(() => {
        if (onlineUsers) {
            count = onlineUsers.length;
            // console.log("count", count);
        }
    }, []);
    useEffect(() => {
        if (onlineUsers) {
            if (onlineUsers.length >= count) {
                if (!mute) {
                    play();
                }
                count++;
                // console.log("count+", count);
            } else {
                count--;
                // console.log("count-", count);
            }
        }
    }, [onlineUsers]);

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
                } else {
                    console.log("data fail");
                }
            })
            .catch((err) => {
                console.log("error", err);
                // console.log("err in axios in Image Uploader ", err);
            });
    };

    const toggleUploader = () => {
        setUserPicBar(!userPicBar);
        setcloseTag(!closeTag);
    };

    return (
        <>
            <div className="onlineUsers">
                <Link to="/">
                    <div className="onlineUsersRedDot"></div>
                </Link>
                <div className="chatUserHeadline">Online</div>
                <span className="onlineUserCounter">
                    {onlineUsers && onlineUsers.length}
                </span>
                <div className="usersBack">
                    {onlineUsers &&
                        onlineUsers.map((msg) => (
                            <div className="onlineList" key={msg.id}>
                                <img
                                    className="onlineListImg"
                                    src={
                                        (chat_myUserId == msg.id &&
                                            onlineUserPic) ||
                                        (msg.chat_img && msg.chat_img) ||
                                        "./../na.jpg"
                                    }
                                ></img>
                                <span>{msg.nickname}</span>
                            </div>
                        ))}
                </div>
                <div
                    className="toggleChatUploader"
                    onClick={() => toggleUploader()}
                >
                    {" "}
                    {!closeTag && "Change Pic"} {closeTag && "Close"}
                </div>
                {userPicBar && (
                    <div className="fileUploaderChat">
                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={(e) => handleUploaderChange(e)}
                        />

                        <div
                            className="uploadChat"
                            onClick={() => handleUploaderClick()}
                        >
                            ➤
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
