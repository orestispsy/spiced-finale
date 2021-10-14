import { Link } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import axios from "./tools/axios";

export default function SuperAdmin({ listSet, chat_myUserId, super_admin }) {
    const [userList, setUserList] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [guestList, setGuestList] = useState(false);
    const [selectedUser, setSelectedUser] = useState(0);
    const [guestUser, setGuestUser] = useState(0);
    const [guestDeleteConfirm, setGuestDeleteConfirm] = useState(false);
    const [networkUsers, setNetworkUsers] = useState(false);

    useEffect(function () {
        if (!super_admin) {
            location.replace("/");
        }
        listSet(true);
        axios
            .get("/get-all-users")
            .then(({ data }) => {
                setUserList(data.data);
            })
            .catch((err) => {
                console.log("err in axios get-all-users ", err);
            });
        axios
            .get("/get-network-users")
            .then(({ data }) => {
                setNetworkUsers(data.data);
            })
            .catch((err) => {
                console.log("err in axios get-network-users", err);
            });
        axios
            .get("/get-guests")
            .then(({ data }) => {
                setGuestList(data.data);
            })
            .catch((err) => {
                console.log("err in axios get-guests", err);
            });
    }, []);

    const deleteGuests = () => {
        axios
            .get("/delete-guests")
            .then(({ data }) => {})
            .catch((err) => {
                console.log("err in axios delete-guests", err);
            });
    };

    const deleteUser = (e) => {
        axios
            .post("/delete-user", { id: e })
            .then(({ data }) => {
                setUserList(userList.filter((user) => user.id != e));
                setNetworkUsers(networkUsers.filter((user) => user.id != e));
                setSelectedUser(false);
            })
            .catch((err) => {
                console.log("err in axios delete-user ", err);
            });
    };

    const setAdmin = (e, boolean) => {
        for (var x = 0; x < networkUsers.length; x++) {
            if (networkUsers[x].id == e) {
                let newList = [...networkUsers];
                newList[x].admin = !boolean;
                setUserList(newList);
            }
        }
        axios
            .post("/set-admin", { id: e, boolean: !boolean })
            .then(({ data }) => {})
            .catch((err) => {
                console.log("err in axios set-admin", err);
            });
    };

    let fixedTime;
    let fixedDate;
    let msgDate;
    let msgTime;
    let diff = new Date().getTimezoneOffset() / -60;
    const handleTime = (e) => {
        if (e) {
            msgDate = e.slice(0, 10).split("-");
            fixedDate = msgDate[2] + "-" + msgDate[1] + "-" + msgDate[0];

            msgTime = e.slice(11, 19).split(":");

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

    const setSuperAdmin = (e, boolean) => {
        for (var x = 0; x < networkUsers.length; x++) {
            if (networkUsers[x].id == e) {
                let newList = [...networkUsers];
                newList[x].super_admin = !boolean;
                setUserList(newList);
            }
        }
        axios
            .post("/set-super-admin", { id: e, boolean: !boolean })
            .then(({ data }) => {})
            .catch((err) => {
                console.log("err in axios set-super-admin ", err);
            });
    };

    return (
        <div className="superAdminContainer">
            <div className="superAdminContainerInner">
                <select
                    value={selectedUser}
                    name="selectedGig"
                    className="selectSuperUserMode"
                    onChange={(e) => {
                        setConfirm(false);
                        setSelectedUser(parseInt(e.target.value));
                    }}
                >
                    <option className="chooseSuperUserMode" value="">
                        Select User
                    </option>

                    {userList &&
                        userList.map((user) => {
                            handleTime(user.created_at);

                            return (
                                chat_myUserId != user.id &&
                                !user.nickname.includes("Guest") && (
                                    <option
                                        value={user.id}
                                        key={user.id}
                                        className="chooseSuperUserMode"
                                    >
                                        {user.nickname}
                                        {" ○ "}
                                        {msgDate[2] + "-" + msgDate[1]}
                                        {" || "}
                                        {JSON.parse(msgTime[0]) +
                                            diff +
                                            ":" +
                                            msgTime[1]}
                                    </option>
                                )
                            );
                        })}
                    {networkUsers &&
                        userList &&
                        networkUsers.map((user) => {
                            handleTime(user.last_online || user.created_at);
                            function userExists(id) {
                                return userList.some(function (user) {
                                    return user.id === id;
                                });
                            }

                            return (
                                chat_myUserId != user.id &&
                                !user.nickname.includes("Guest") &&
                                !userExists(user.id) && (
                                    <option
                                        value={user.id}
                                        key={user.id}
                                        className={
                                            (!user.last_online &&
                                                "chooseSuperUserModeOld") ||
                                            (user.last_online &&
                                                "chooseSuperUserModeOldLight")
                                        }
                                    >
                                        {user.last_online && " ⌛ "}
                                        {user.nickname}
                                        {" ○ "}
                                        {msgDate[2] + "-" + msgDate[1]}
                                        {" || "}
                                        {JSON.parse(msgTime[0]) +
                                            diff +
                                            ":" +
                                            msgTime[1]}
                                    </option>
                                )
                            );
                        })}
                </select>
                {selectedUser > 0 && (
                    <div
                        title="Reset"
                        className="superUserReset"
                        onClick={(e) => {
                            setSelectedUser(0);
                        }}
                    >
                        reset
                    </div>
                )}
                {!selectedUser && (
                    <div className="superList">
                        <div className="superListItemBack">
                            <div className="superListItem">
                                <Link
                                    to="/"
                                    className="buttonBack"
                                    id="superCloseTab"
                                >
                                    X
                                </Link>
                                <img src={"avatar.png"}></img>
                                <div
                                    className="superAdminGuestList"
                                    id="superAdminGuestsHead"
                                >
                                    Guests
                                    <span
                                        className="superAdminGuestList"
                                        id="superAdminGuestList"
                                    >
                                        {guestList.length > 0 &&
                                            guestList.length}
                                    </span>
                                </div>
                                {guestList[0] && (
                                    <>
                                        <select
                                            value={guestUser}
                                            name="selectedGig"
                                            className="selectGuestSuperMode"
                                            onChange={(e) => {
                                                setGuestUser(
                                                    parseInt(e.target.value)
                                                );
                                                setConfirm(false);
                                            }}
                                        >
                                            <option
                                                className="chooseGuestSuperMode"
                                                value=""
                                            >
                                                Select
                                            </option>
                                            {guestList &&
                                                guestList.map((guest) => {
                                                    handleTime(
                                                        guest.created_at
                                                    );
                                                    return (
                                                        <option
                                                            value={guest.id}
                                                            key={guest.id}
                                                            className="chooseGuestSuperMode"
                                                        >
                                                            {guest.nickname}
                                                            {" ○ "}
                                                            {msgDate[2] +
                                                                "-" +
                                                                msgDate[1]}
                                                            {" || "}
                                                            {JSON.parse(
                                                                msgTime[0]
                                                            ) +
                                                                diff +
                                                                ":" +
                                                                msgTime[1]}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                        {guestUser > 0 && (
                                            <div
                                                title="Reset"
                                                className="superUserReset"
                                                onClick={(e) => {
                                                    setGuestUser(0);
                                                }}
                                            >
                                                reset
                                            </div>
                                        )}
                                        {(!confirm && guestUser > 0 && (
                                            <div
                                                className="deleteUser"
                                                id="deleteUser"
                                                onClick={(e) => {
                                                    setConfirm(!confirm);
                                                }}
                                            >
                                                DELETE
                                            </div>
                                        )) ||
                                            (confirm && (
                                                <div
                                                    className="deleteUserConfirm"
                                                    id="deleteUser"
                                                    onClick={(e) => {
                                                        deleteUser(guestUser);
                                                        setGuestList(
                                                            guestList.filter(
                                                                (guest) =>
                                                                    guest.id !=
                                                                    guestUser
                                                            )
                                                        );
                                                        setConfirm(!confirm);
                                                    }}
                                                >
                                                    Confirm
                                                </div>
                                            ))}
                                    </>
                                )}

                                <span
                                    className="superAdminGuestList"
                                    id="superAdminGuestList"
                                >
                                    {!guestList[0] && "Nothing here"}
                                </span>
                                {!guestDeleteConfirm && (
                                    <span
                                        id="deleteAllGuests"
                                        onClick={(e) => {
                                            setGuestDeleteConfirm(true);
                                        }}
                                    >
                                        {guestList[0] && "delete all"}
                                    </span>
                                )}
                                {guestDeleteConfirm && (
                                    <span
                                        id="deleteAllGuestsConfirm"
                                        onClick={(e) => {
                                            deleteGuests();
                                            setGuestList(false);
                                        }}
                                    >
                                        {guestList[0] && "confirm"}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {networkUsers &&
                    networkUsers.map((user) => {
                        var diff = new Date().getTimezoneOffset() / -60;
                        if (user.created_at) {
                            handleTime(user.created_at);
                        }
                        return (
                            <React.Fragment key={user.id}>
                                {chat_myUserId != user.id &&
                                    user.id == selectedUser && (
                                        <div className="superList">
                                            <div className="superListItemBack">
                                                <div className="superListItem">
                                                    <img
                                                        src={
                                                            user.chat_img ||
                                                            "avatar.png"
                                                        }
                                                    ></img>
                                                    <h1>{user.nickname}</h1>
                                                    <div>Last Online</div>
                                                    <span>
                                                        {user.created_at &&
                                                            fixedDate}
                                                    </span>
                                                    <span>
                                                        {user.created_at &&
                                                            fixedTime}
                                                    </span>
                                                </div>
                                                <div
                                                    className="superListItem"
                                                    id="superListItem"
                                                >
                                                    {" "}
                                                    {(user.admin && (
                                                        <div
                                                            id={user.id}
                                                            className="adminYes"
                                                            onClick={(
                                                                e,
                                                                boolean
                                                            ) =>
                                                                setAdmin(
                                                                    e.target.id,
                                                                    user.admin
                                                                )
                                                            }
                                                        >
                                                            ADMIN
                                                        </div>
                                                    )) ||
                                                        (!user.admin && (
                                                            <div
                                                                id={user.id}
                                                                className="adminNo"
                                                                onClick={(
                                                                    e,
                                                                    boolean
                                                                ) =>
                                                                    setAdmin(
                                                                        e.target
                                                                            .id,
                                                                        user.admin
                                                                    )
                                                                }
                                                            >
                                                                ADMIN
                                                            </div>
                                                        ))}
                                                    {(user.super_admin && (
                                                        <div
                                                            id={user.id}
                                                            className="superAdminYes"
                                                            onClick={(
                                                                e,
                                                                boolean
                                                            ) =>
                                                                setSuperAdmin(
                                                                    e.target.id,
                                                                    user.super_admin
                                                                )
                                                            }
                                                        >
                                                            SUPER ADMIN
                                                        </div>
                                                    )) ||
                                                        (!user.super_admin && (
                                                            <div
                                                                id={user.id}
                                                                className="superAdminNo"
                                                                onClick={(
                                                                    e,
                                                                    boolean
                                                                ) =>
                                                                    setSuperAdmin(
                                                                        e.target
                                                                            .id,
                                                                        user.super_admin
                                                                    )
                                                                }
                                                            >
                                                                SUPER ADMIN
                                                            </div>
                                                        ))}
                                                    {(confirm != user.id && (
                                                        <div
                                                            id={user.id}
                                                            className="deleteUser"
                                                            onClick={(e) =>
                                                                setConfirm(
                                                                    e.target.id
                                                                )
                                                            }
                                                        >
                                                            DELETE
                                                        </div>
                                                    )) ||
                                                        (confirm == user.id && (
                                                            <div
                                                                className="deleteUserConfirm"
                                                                id={user.id}
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    setConfirm(
                                                                        false
                                                                    );
                                                                    setGuestList(
                                                                        guestList.filter(
                                                                            (
                                                                                user
                                                                            ) =>
                                                                                user.id !=
                                                                                selectedUser
                                                                        )
                                                                    );
                                                                    deleteUser(
                                                                        e.target
                                                                            .id
                                                                    );
                                                                }}
                                                            >
                                                                CONFIRM
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </React.Fragment>
                        );
                    })}
                <Link
                    to="/"
                    className="superAdminExit"
                    title="Back"
                    onClick={() => listSet(false)}
                >
                    <img src="redBall.gif"></img>
                </Link>
            </div>
        </div>
    );
}
