import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "./tools/axios";

export default function SuperAdmin({}) {
    const [userList, setUserList] = useState(null);
    useEffect(function () {
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

    return (
        <div className="superAdminContainer">
            {userList &&
                userList.map((user) =>{
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
                            <div key={user.id} className="superList">
                                <div className="superListItem">
                                <img src={user.chat_img}></img>
                                {user.nickname}
                                <span>{user.chat_msg}</span>
                                <span>{fixedTime}</span>
                                <span>{fixedDate}</span>
                                </div>
                            </div>
                        );
                })}

            <Link to="/" className="backLink">
                Back
            </Link>
        </div>
    );
}
