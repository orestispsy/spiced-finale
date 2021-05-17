import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "./tools/axios";
import useSound from "use-sound";

import chatSfx from "./../public/chat.mp3";

let emoji = require("./tools/customEmoj.json");

var count = 0;
export default function OnlineUsers({
    mute,
    chat_img,
    chat_myUserId,
    emojiBar,
    sendEmoji,
    chat_color,
}) {
    if (chat_img) {
        chat_img = "";
    }
    const [userPicBar, setUserPicBar] = useState(false);
    const [onlineUserPic, setOnlineUserPic] = useState(chat_img);
    const [file, setFile] = useState(null);
    const [closeTag, setcloseTag] = useState(false);
    const [chatColor, setChatColor] = useState(false);

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
                    setUserPicBar(!userPicBar);
                    setcloseTag(!closeTag);
                } else {
                    console.log("data fail");
                }
            })
            .catch((err) => {
                console.log("error", err);
                // console.log("err in axios in Image Uploader ", err);
            });
    };

    const handleColorChange = (e) => {
        axios
            .post("/changeColor", e.target.value)
            .then(({ data }) => {
                setChatColor(data.data.chat_color);
            })
            .catch((err) => {
                //   console.log("error", err);
            });
    };

    const privateMessage = (e) => {
        axios
            .post("/changeColor", e.target.value)
            .then(({ data }) => {
                setChatColor(data.data.chat_color);
            })
            .catch((err) => {
                //   console.log("error", err);
            });
    };

    const toggleUploader = () => {
        setUserPicBar(!userPicBar);
        setcloseTag(!closeTag);
    };

    return (
        <>
            <div className="onlineUsersBack">
                <div className="onlineUsers">
                {!userPicBar && !emojiBar && (      <Link to="/">
                
                            <div className="onlineUsersRedDot"></div>
                       
                    </Link>)}
                    {userPicBar && <img className="imageUploaderImage" src={chat_img && chat_img}></img>}
                   {!userPicBar && <div className="mobileOnlineUsers">
                        <div className="chatUserHeadline">Online</div>
                        <span className="onlineUserCounter">
                            {onlineUsers && onlineUsers.length}
                        </span>
                        <div className="usersBack">
                            {onlineUsers &&
                                onlineUsers.map((user) => (
                                    <div className="onlineList" key={user.id}>
                                        <a href={user.chat_img} target="_blank">
                                            <img
                                                className="onlineListImg"
                                                title={user.id}
                                                alt={user.nickname}
                                                src={
                                                    (chat_myUserId == user.id &&
                                                        onlineUserPic) ||
                                                    (user.chat_img &&
                                                        user.chat_img) ||
                                                    "./../na.jpg"
                                                }
                                                onClick={(e) => console.log(e)}
                                            ></img>
                                        </a>
                                        <span
                                            style={{
                                                color:
                                                    (chat_myUserId == user.id &&
                                                        chatColor) ||
                                                    user.chat_color ||
                                                    `lime`,
                                            }}
                                        >
                                            {user.nickname}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                    }

                    {userPicBar && (
                        <div className="fileUploaderChat">
                            <h1>Select Image</h1>
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
                                <h1>UPDATE</h1>
                                {closeTag && (
                                    <h1
                                        className="toggleChatUploader"
                                        onClick={() => toggleUploader()}
                                    >
                                        CLOSE
                                    </h1>
                                )}
                            </div>
                        </div>
                    )}
                    {!closeTag && (
                        <div className="chatMenuOptions">
                            <img
                                className="uploaderTogglerImg"
                                onClick={() => toggleUploader()}
                            ></img>

                            <input
                                className="colorSelector"
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
