import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "./tools/axios";

export default function SuperAdmin({ mapVisible }) {
    const [userList, setUserList] = useState(null);
    useEffect(function () {
        mapVisible();
        axios
            .get("/get-all-users")
            .then(({ data }) => {
                console.log("data", data.data);
                setUserList(data.data);
            })
            .catch((err) => {
                console.log("err in axios get-all-users ", err);
            });
    }, []);

    const deleteUser = (e) => {
        console.log("id", e);
        axios
            .post("/delete-user", { id: e })
            .then(({ data }) => {
                setUserList(userList.filter((user) => user.id != e));
            })
            .catch((err) => {
                console.log("err in axios get-all-users ", err);
            });
    };

    return (
        <div className="superAdminContainer">
            <div className="superList">
                {userList &&
                    userList.map((user) => {
                        var diff = new Date().getTimezoneOffset() / -60;

                        let msgDate = user.created_at.slice(0, 10).split("-");
                        var fixedDate =
                            msgDate[2] + "-" + msgDate[1] + "-" + msgDate[0];

                        let msgTime = user.created_at.slice(11, 19).split(":");

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
                        return (
                            <div key={user.id} className="superListItem">
                                <img src={user.chat_img || "na.jpg"}></img>
                                 <h1>{user.nickname}</h1>
                                <div>Last Online</div>
                                <span>{fixedDate}</span>
                                <span>{fixedTime}</span>
                                {user.admin && (
                                    <div className="adminYes">ADMIN</div>
                                )}
                                {!user.admin && (
                                    <div className="adminNo">ADMIN</div>
                                )}
                                {user.super_admin && (
                                    <div className="superAdminYes">
                                        SUPER ADMIN
                                    </div>
                                )}
                                {!user.super_admin && (
                                    <div className="superAdminNo">
                                        SUPER ADMIN
                                    </div>
                                )}
                                <div
                                    className="deleteUser"
                                    title={user.id}
                                    onClick={(e) => deleteUser(e.target.title)}
                                >
                                    DELETE USER
                                </div>
                            </div>
                        );
                    })}
            </div>
            <Link to="/" className="backLink" onClick={() => mapVisible()}>
                Back
            </Link>
        </div>
    );
}
