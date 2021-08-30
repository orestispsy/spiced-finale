import { useState, useEffect, useRef } from "react";
import axios from "./tools/axios";
import { socket } from "./tools/socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OnlineUsers from "./onlineUsers";
import Ticker from "./ticker";
import PrivateMSGS from "./privateMSGS";

import useSound from "use-sound";

import chatSfx from "./../public/msg.mp3";
import tickerSfx from "./../public/ticker.mp3";

export default function Chat({
    chat_color,
    chat_img,
    chat_myUserId,
    admin,
    super_admin,
    setProfileImage,
    nickname,
}) {
    const [emojiBar, setEmojiBar] = useState(false);
    const [tickerBar, setTickerBar] = useState(false);
    const [mute, setMute] = useState(false);
    const [postScroll, setPostScroll] = useState(false);
    const [scrollTop, setScrollTop] = useState(false);
    const [privateMode, setPrivateMode] = useState(false);
    const [userPrivate, setUserPrivate] = useState(false);
    const [privatePic, setPrivatePic] = useState(false);
    const [privateNick, setPrivateNick] = useState(false);
    const [privateMessages, setPrivateMessages] = useState(false);

    const [play] = useSound(chatSfx, { volume: 0.75 });
    const [playTicker, { stop }] = useSound(tickerSfx, { volume: 0.75 });

    const elemRef = useRef();

    const chatMessages = useSelector((state) => state && state.chatMessages);

    
    const browserCount = useSelector((state) => state && state.count);

    useEffect(() => {
        if (chatMessages) {
            if (scrollTop < 1) {
                const timer = setTimeout(() => {
                    next20ChatMsgs();
                }, 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [scrollTop]);


  
    useEffect(() => {
        console.log("start", browserCount)
        if (browserCount==1) {
            socket.emit("A CHAT MSG", "--##--entered--##--");   
        }
    }, []);

        useEffect(() => {
            console.log("refreshed", browserCount)
            if (browserCount ==0) {
                socket.emit("A CHAT MSG", "--##--entered--##--");
            }
        }, [browserCount]);

    useEffect(() => {
        if (elemRef.current) {
            setScrollBarBottom();
        }
    }, [privateMode]);

    useEffect(() => {
        if (!postScroll) {
            if (elemRef.current) {
                const newScrollTop =
                    elemRef.current.scrollHeight - elemRef.current.clientHeight;
                elemRef.current.scrollTop = newScrollTop;
            }
        }
        if (!mute && scrollTop > 1) {
            play();
        }
        setPostScroll(false);
    }, [chatMessages]);

    const setScrollBarBottom = () => {
        if (elemRef.current) {
            elemRef.current.scrollTop = scrollTop;
        }
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
                socket.emit("A CHAT MSG", e.target.value);
                console.log(e.target.value)
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
        if (elemRef.current.scrollTop == 0) {
            elemRef.current.scrollTop = elemRef.current.scrollTop + 1;
        }
        setPostScroll(true);
        socket.emit("NEXT MSGS", chatMessages[0].id);
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

    const toggleEmojibar = (e) => {
        setEmojiBar(e);
    };

    const toggleTicker = (e) => {
        setTickerBar(e);
    };

    const openPrivate = (e, img) => {
        setUserPrivate(e);
        setPrivatePic(img);
    };

    const togglePrivateMSGS = () => {
        setPrivateMode(!privateMode);
    };

    const handleChatPostDelete = (e) => {
        if (
            elemRef.current.scrollHeight <=
            elemRef.current.scrollTop + elemRef.current.clientHeight + 100
        ) {
            setPostScroll(false);
        } else {
            setPostScroll(true);
        }

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
        return <div className="loading"></div>;
    }

    return (
        <div className="chatContainerBack">
            {tickerBar && <Ticker tickerBar={tickerBar} />}
            {privateMode && (
                <PrivateMSGS
                    chat_myUserId={chat_myUserId}
                    userPrivate={userPrivate}
                    chat_img={chat_img}
                    chat_myUserId={chat_myUserId}
                    privatePic={privatePic}
                    nickname={nickname}
                    privateNick={privateNick}
                    setChecker={(e) => setChecker(e)}
                    setPrivateMessages={(e) => setPrivateMessages(e)}
                />
            )}

            <div className="mobileChat">
                {!privateMode && (
                    <div className="chatContainer">
                        <div className="chatHeadline">
                       
                                <Link to="/" className="buttonBack"
                                onClick={()=>{socket.emit(
                                    "A CHAT MSG",
                                    "--##--left--##--"
                                );
                                }}>
                                    X
                                </Link>
                        
                            <div id="chatTitle">Chat Room</div>
                        </div>
                        <div className="chatScreenBack">
                            <div
                                className="chatScreen"
                                ref={elemRef}
                                onScrollCapture={() =>
                                    setScrollTop(elemRef.current.scrollTop)
                                }
                            >
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
                                    var diff =
                                        new Date().getTimezoneOffset() / -60;

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
                                                    {msg.nickname} has left the
                                                    chat
                                                </p>
                                            );
                                        }
                                    } else if (
                                        msg.chat_msg === "--##--entered--##--"
                                    ) {
                                        return (
                                            <p
                                                className="userEnters"
                                                key={msg.id}
                                            >
                                                {msg.nickname} joined the chat !
                                            </p>
                                        );
                                    } else {
                                        return (
                                            <div
                                                className="chatPost"
                                                key={msg.id}
                                            >
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
                                                    {admin && !super_admin &&
                                                        chat_myUserId ==
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
                                                    {super_admin && (
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
                                onClick={(e) => toggleEmojibar(!emojiBar)}
                            ></div>
                        </div>
                    </div>
                )}
                <OnlineUsers
                    mute={mute}
                    chat_img={chat_img}
                    chat_myUserId={chat_myUserId}
                    emojiBar={emojiBar}
                    toggleEmojibar={(e) => toggleEmojibar(e)}
                    sendEmoji={(e) => sendEmoji(e)}
                    chat_color={chat_color}
                    setProfileImage={(e) => setProfileImage(e)}
                    togglePrivateMSGS={() => togglePrivateMSGS()}
                    openPrivate={(e) => openPrivate(e)}
                    setPrivatePic={(e) => setPrivatePic(e)}
                    setPrivateNick={(e) => setPrivateNick(e)}
                    setPrivateMode={(e) => setPrivateMode(e)}
                    privateMode={privateMode}
                    userPrivate={userPrivate}
                    privateNick={privateNick}
                    privatePic={privatePic}
                    privateMessages={privateMessages}
                    setPrivateMessages={(e) => setPrivateMessages(e)}
                />
            </div>

   
            <div
                className="tickerButton"
                onClick={() => {
                    toggleTicker(!tickerBar);
                    if (!tickerBar) {
                        playTicker();
                    } else {
                        stop();
                    }
                }}
            >
                {tickerBar && `Stop Ticker`} {!tickerBar && `Start Ticker`}
            </div>
        </div>
    );
}
