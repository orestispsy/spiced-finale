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
import chatEnterSfx from "./../public/chatEnter.mp3";
import kickedOut from "./../public/kickedOut.mp3";
import hornSfx from "./../public/horn.mp3";
import privateMSGSfx from "./../public/privateMSG.mp3";

export default function Chat({
    chat_color,
    chat_img,
    chat_myUserId,
    admin,
    setAdmin,
    super_admin,
    setProfileImage,
    nickname,
    guest,
    setNickname,
    listSet,
    list,
    darkMode,
    setDarkMode,
    setRadioBroadcast,
    radioBroadcasts,
    nightFlightProg,
    setChatMode,
}) {
    const [emojiBar, setEmojiBar] = useState(false);
    const [tickerBar, setTickerBar] = useState(false);
    const [mute, setMute] = useState(false);
    const [postScroll, setPostScroll] = useState(false);
    const [scrollTop, setScrollTop] = useState(2);
    const [privateMode, setPrivateMode] = useState(false);
    const [userPrivate, setUserPrivate] = useState(false);
    const [privatePic, setPrivatePic] = useState(false);
    const [privateNick, setPrivateNick] = useState(false);
    const [privateMessages, setPrivateMessages] = useState(false);
    const [configTimer, setConfigTimer] = useState(false);
    const [shakeUser, setShakeUser] = useState(false);

    const [play] = useSound(chatSfx, { volume: 0.75 });
    const [playIntro] = useSound(chatEnterSfx, { volume: 0.5 });

    const [playKickedOut] = useSound(kickedOut, { volume: 0.75 });
    const [playHorn] = useSound(hornSfx, { volume: 0.75 });
    const [playPrivateMsg] = useSound(privateMSGSfx, { volume: 0.75 });

    const elemRef = useRef();

    const timerRef = useRef();

    const chatMessages = useSelector((state) => state && state.chatMessages);

    const browserCount = useSelector((state) => state && state.count);

    const onlineUsers = useSelector((state) => state && state.onlineUsers);

    const chatBan = useSelector((state) => state && state.chat_ban);

    const banTimer = useSelector((state) => state && state.ban_timer);

    const horn = useSelector((state) => state && state.horn);

    useEffect(() => {
        setChatMode(true);
        listSet(darkMode);
        setDarkMode(darkMode);
    }, []);

    useEffect(() => {
        if (chatBan) {
            setPrivateMode(false);
            countDown();
        }
    }, [chatBan]);

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
        if (chat_myUserId) {
            if (browserCount < 2) {
                const timer = setTimeout(() => {
                    socket.emit("A CHAT MSG", "--##--entered--##--");
                }, 1500);
                return () => clearTimeout(timer);
            }
        }
    }, [browserCount]);

    useEffect(() => {
        if (elemRef.current) {
            setScrollBarBottom();
        }
    }, [privateMode]);

    useEffect(() => {
        if (horn && horn.horn && !mute) {
            playHorn();

            horn.admin_shaked = false;
        }
    }, [horn]);

    useEffect(() => {
        if (
            chatMessages &&
            chatMessages.length > 0 &&
            chatMessages[chatMessages.length - 1].chat_msg ==
                "--##--entered--##--" &&
            chatMessages[chatMessages.length - 1].msg_sender_id !=
                chat_myUserId &&
            !mute
        ) {
            playIntro();
        }
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

    const playNotification = (e) => {
        if (!mute) {
            playPrivateMsg();
        }
    };

    const setScrollBarBottom = () => {
        if (elemRef.current) {
            elemRef.current.scrollTop = scrollTop;
        }
    };

    const run = (e) => {
        if (onlineUsers) {
            let users = onlineUsers;
            users.forEach((element) => {
                if (element.id == chat_myUserId) {
                    element.online = false;
                    axios
                        .post("/set-user-status", { online: e })
                        .then(({ data }) => {
                            socket.emit("ONLINE USERS", users);
                        })
                        .catch((err) => {
                            console.log("error", err);
                        });
                }
            });
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

    const countDown = () => {
        playKickedOut();
        let counter = banTimer;

        const interval = setInterval(() => {
            console.log(counter);
            counter--;
            timerRef.current.innerHTML = counter;
            if (counter < 0) {
                timerRef.current.innerHTML = "B O O M !";
            }
        }, 1000);

        const clientReset = setTimeout(() => {
            location.replace("/");
        }, banTimer * 1000 + 2000);

        return () => clearTimeout(clientReset);
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
                    list={list}
                />
            )}

            <div className="mobileChat">
                {!privateMode && (
                    <div
                        className={
                            (!chatBan && "chatContainer") ||
                            (chatBan && "chatContainerBan")
                        }
                        id={(list && "chatContainerDark") || ""}
                    >
                        <div
                            className="chatHeadline"
                            id={(list && "chatHeadlineDark") || ""}
                        >
                            {!chatBan && (
                                <Link
                                    to="/"
                                    className="buttonBack"
                                    onClick={(e) => {
                                        setChatMode(false);
                                        {
                                            if (browserCount == 1) {
                                                socket.emit(
                                                    "A CHAT MSG",
                                                    "--##--left--##--"
                                                );
                                                run(false);
                                            }
                                        }
                                    }}
                                >
                                    X
                                </Link>
                            )}

                            {!chatBan && <div id="chatTitle">Chat Room</div>}
                        </div>
                        <div
                            className="chatScreenBack"
                            id={(shakeUser && horn && "hornShake") || ""}
                        >
                            <div
                                className="chatScreen"
                                style={{
                                    margin: chatBan && `4vmax`,
                                }}
                                id={(list && "chatScreenDark") || ""}
                                ref={elemRef}
                                onScrollCapture={() =>
                                    setScrollTop(elemRef.current.scrollTop)
                                }
                            >
                                {!chatBan && (
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
                                )}
                                {chatBan && (
                                    <div className="chatBanCover">
                                        YOU'VE BEEN BANNED !
                                        <span>Take a Deep Breath,</span>{" "}
                                        <span>or Chill Your Ass and.. </span>
                                        <a href="https://thousandgigs.herokuapp.com">
                                            Try Again
                                        </a>
                                        {chatBan && (
                                            <div id="timer" ref={timerRef}>
                                                {banTimer && banTimer}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {!chatBan &&
                                    chatMessages.map((msg) => {
                                        handleTime(msg);

                                        if (
                                            msg.chat_msg === "--##--left--##--"
                                        ) {
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
                                                        {msg.nickname} has left
                                                        the chat
                                                    </p>
                                                );
                                            }
                                        } else if (
                                            msg.chat_msg ===
                                            "--##--entered--##--"
                                        ) {
                                            return (
                                                <p
                                                    className="userEnters"
                                                    key={msg.id}
                                                >
                                                    {msg.nickname} joined the
                                                    chat !
                                                </p>
                                            );
                                        } else if (
                                            msg.chat_msg ===
                                            "--##--left-the-network--##--"
                                        ) {
                                            return (
                                                <p
                                                    className="userLeavesNetwork"
                                                    key={msg.id}
                                                >
                                                    {msg.nickname} left The
                                                    Network
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
                                                                className="postImg"
                                                                src={
                                                                    msg.chat_img ||
                                                                    "./../na.jpg"
                                                                }
                                                            ></img>
                                                            <h1>
                                                                {msg.nickname}
                                                            </h1>
                                                        </div>
                                                        {admin &&
                                                            !super_admin &&
                                                            chat_myUserId ==
                                                                msg.msg_sender_id && (
                                                                <div
                                                                    title="Delete"
                                                                    className="deleteChatMsg"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
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
                        {!chatBan && (
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
                                            onClick={() => {
                                                setMute(!mute);
                                            }}
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
                        )}
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
                    guest={guest}
                    nickname={nickname}
                    setNickname={(e) => setNickname(e)}
                    setAdmin={(e) => setAdmin(e)}
                    onlineUsers={onlineUsers}
                    list={list}
                    super_admin={super_admin}
                    configTimer={configTimer}
                    setConfigTimer={(e) => setConfigTimer(e)}
                    chatBan={chatBan}
                    horn={horn}
                    playNotification={(e) => playNotification(e)}
                    shakeUser={shakeUser}
                    setShakeUser={(e) => setShakeUser(e)}
                />
            </div>
            <div
                className="jukeBox"
                onClick={(e) => {
                    if (!nightFlightProg) {
                        setRadioBroadcast(
                            radioBroadcasts.radioBroadcasts[
                                radioBroadcasts.radioBroadcasts.length - 1
                            ]
                        );
                    } else {
                        setRadioBroadcast(false);
                    }
                }}
            ></div>
            <div
                className="tickerButton"
                onClick={(e) => {
                    toggleTicker(!tickerBar);
                }}
            >
                {tickerBar && `Stop Ticker`} {!tickerBar && `Start Ticker`}
            </div>
            <div
                className={(list && "DarkMode") || (!list && "lightMode")}
                onClick={(e) => {
                    listSet(!list);
                    setDarkMode(false);
                }}
            ></div>
        </div>
    );
}
