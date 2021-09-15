import { Link } from "react-router-dom";
import React, { useState, useEffect, Fragment } from "react";
import axios from "./tools/axios";

export default function SuperAdmin({ listSet, chat_myUserId, super_admin }) {
    const [userList, setUserList] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [guestList, setGuestList] = useState(false);

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
            .get("/get-guests")
            .then(({ data }) => {
                setGuestList(data.data);
           
            })
            .catch((err) => {
                console.log("err in axios get-all-users ", err);
            });
    }, []);

    const deleteGuests = () => {
        axios
            .get("/delete-guests")
            .then(({ data }) => {
                console.log("done")
            })
            .catch((err) => {
                console.log("err in axios get-all-users ", err);
            });
    }

    const deleteUser = (e) => {
        axios
            .post("/delete-user", { id: e })
            .then(({ data }) => {
                setUserList(userList.filter((user) => user.id != e));
            })
            .catch((err) => {
                console.log("err in axios get-all-users ", err);
            });
    };

    const setAdmin = (e, boolean) => {
        for (var x = 0; x < userList.length; x++) {
            if (userList[x].id == e) {
                let newList = [...userList];
                newList[x].admin = !boolean;
                setUserList(newList);
            }
        }
        axios
            .post("/set-admin", { id: e, boolean: !boolean })
            .then(({ data }) => {})
            .catch((err) => {
                console.log("err in axios get-all-users ", err);
            });
    };

    const setSuperAdmin = (e, boolean) => {
        for (var x = 0; x < userList.length; x++) {
            if (userList[x].id == e) {
                let newList = [...userList];
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
            {guestList.length>0 && (
                <div className="superAdminGuestList">
                    Guests: {guestList.length}
                    <span onClick={(e)=>{deleteGuests()
                    setGuestList(false)}}>delete</span>
                </div>
            )}
            {super_admin && (
                <div className="superList">
                    {userList &&
                        userList.map((user) => {
                            var diff = new Date().getTimezoneOffset() / -60;
                            if (user.created_at) {
                                let msgDate = user.created_at
                                    .slice(0, 10)
                                    .split("-");
                                var fixedDate =
                                    msgDate[2] +
                                    "-" +
                                    msgDate[1] +
                                    "-" +
                                    msgDate[0];

                                let msgTime = user.created_at
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
                            }
                            return (
                                <React.Fragment key={user.id}>
                                    {chat_myUserId != user.id && (
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
                                                {user.admin && (
                                                    <div
                                                        id={user.id}
                                                        className="adminYes"
                                                        onClick={(e, boolean) =>
                                                            setAdmin(
                                                                e.target.id,
                                                                user.admin
                                                            )
                                                        }
                                                    >
                                                        ADMIN
                                                    </div>
                                                )}
                                                {!user.admin && (
                                                    <div
                                                        id={user.id}
                                                        className="adminNo"
                                                        onClick={(e, boolean) =>
                                                            setAdmin(
                                                                e.target.id,
                                                                user.admin
                                                            )
                                                        }
                                                    >
                                                        ADMIN
                                                    </div>
                                                )}
                                                {user.super_admin && (
                                                    <div
                                                        id={user.id}
                                                        className="superAdminYes"
                                                        onClick={(e, boolean) =>
                                                            setSuperAdmin(
                                                                e.target.id,
                                                                user.super_admin
                                                            )
                                                        }
                                                    >
                                                        SUPER ADMIN
                                                    </div>
                                                )}
                                                {!user.super_admin && (
                                                    <div
                                                        id={user.id}
                                                        className="superAdminNo"
                                                        onClick={(e, boolean) =>
                                                            setSuperAdmin(
                                                                e.target.id,
                                                                user.super_admin
                                                            )
                                                        }
                                                    >
                                                        SUPER ADMIN
                                                    </div>
                                                )}
                                                {confirm != user.id && (
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
                                                )}
                                                {confirm == user.id && (
                                                    <div
                                                        className="deleteUserConfirm"
                                                        id={user.id}
                                                        onClick={(e) =>
                                                            deleteUser(
                                                                e.target.id
                                                            )
                                                        }
                                                    >
                                                        CONFIRM
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                </div>
            )}
            <Link
                to="/"
                className="superAdminExit"
                title="Back"
                onClick={() => listSet(false)}
            >
                <img src="redBall.gif"></img>
            </Link>
        </div>
    );
}
