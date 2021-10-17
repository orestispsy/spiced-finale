import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import radioBroadcasts from "./tools/radioBroadcasts";
import { useSelector } from "react-redux";
export default function appBar({
    chat_img,
    chatNotification,
    maps,
    nickname,
    setGigEntry,
    mapVisible,
    setRadioBroadcast,
    nightFlightProg,
    top,
    left,
    setPlayerPosition,
    setChatNotification,
    chatMode,
}) {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    useEffect(
        function () {
            if (chatMessages) {
                const timer = setTimeout(() => {
                    if (
                        !chatNotification &&
                        !chatMode &&
                        chatMessages.length > 10
                    ) {
                        if (
                            chatMessages[chatMessages.length - 1].chat_msg ==
                                "--##--entered--##--" ||
                            chatMessages[chatMessages.length - 1].chat_msg ==
                                "--##--left--##--"
                        ) {
                            return;
                        }
                        setChatNotification(true);
                    }
                }, 1000);
                return () => clearTimeout(timer);
            }
        },
        [chatMessages]
    );

    return (
        <div className="appBar">
            <div className="barLeftSection">
                <Link to="/chat">
                    <img
                        src={chat_img || "./../avatar.png"}
                        className="barProfileImage"
                    ></img>
                </Link>
                {!maps && (
                    <Link to="/chat">
                        <div
                            title="Chat Room"
                            className="chatBar"
                            id={
                                (chatNotification && !chatMode && "chatBar") ||
                                ""
                            }
                        ></div>
                    </Link>
                )}
                <div className="barProfile">{!maps && nickname}</div>
            </div>
            {maps && (
                <a target="_blank" href="https://www.1000mods.com">
                    <div className="logo2Back">
                        <div className="logo2"></div>
                    </div>
                </a>
            )}

            {maps && (
                <Link
                    to="/"
                    className="barMainLink"
                    title="Back"
                    onClick={(e) => {
                        setGigEntry(false);
                        mapVisible(false);
                    }}
                ></Link>
            )}
            {nightFlightProg && (
                <div
                    className="mixCloudPlayerControls"
                    style={{
                        top: top,
                        left: left,
                    }}
                >
                    <div className="broadcastScroller">
                        <div className="radioControlsSymbol">
                            <div
                                id="broadLeft"
                                onClick={(e) => {
                                    if (nightFlightProg.id <= 0) {
                                        return;
                                    } else {
                                        setRadioBroadcast(
                                            radioBroadcasts.radioBroadcasts[
                                                nightFlightProg.id - 1
                                            ]
                                        );
                                    }
                                }}
                            ></div>
                            <div className="radioControls">prev</div>
                        </div>
                        <div className="radioControlsSymbol">
                            <div
                                id="broadRight"
                                onClick={(e) => {
                                    if (
                                        nightFlightProg.id >=
                                        radioBroadcasts.radioBroadcasts.length -
                                            1
                                    ) {
                                        return;
                                    } else {
                                        setRadioBroadcast(
                                            radioBroadcasts.radioBroadcasts[
                                                nightFlightProg.id + 1
                                            ]
                                        );
                                    }
                                }}
                            ></div>

                            <div className="radioControls">next</div>
                        </div>
                        <div
                            className="radioControlsSymbol"
                            onClick={(e) => {
                                setRadioBroadcast(false);
                            }}
                        >
                            <div id="broadClose">x</div>

                            <div className="radioControls">close</div>
                        </div>
                    </div>
                    <ReactPlayer
                        url={nightFlightProg.href}
                        controls
                        config={{
                            mixcloud: {
                                options: {
                                    mini: true,
                                },
                            },
                        }}
                        id="mixCloudPlayer"
                        width="100%"
                        height="100%"
                    />
                    <div
                        className="dragPlayer"
                        draggable
                        onDragCapture={(e) => {
                            setPlayerPosition(
                                e.pageY,
                                e.screenX - e.screenX * 0.1
                            );
                        }}
                        onDragEndCapture={(e) => {
                            setPlayerPosition(
                                e.pageY,
                                e.screenX - e.screenX * 0.1
                            );
                        }}
                        onTouchStart={(e) => {
                            setPlayerPosition(
                                e.changedTouches[0].pageY,
                                e.changedTouches[0].screenX -
                                    e.changedTouches[0].screenX * 0.1
                            );
                        }}
                        onTouchMoveCapture={(e) => {
                            setPlayerPosition(
                                e.changedTouches[0].pageY,
                                e.changedTouches[0].pageX
                            );
                        }}
                    ></div>
                </div>
            )}
        </div>
    );
}
