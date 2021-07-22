import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "./tools/axios";

export default function Main({ admin, listSet, visitors }) {
    useEffect(function () {
        listSet(false);
    }, []);

    const logOut = () => {
        axios
            .get("/logout")
            .then(() => {
                location.replace("/");
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
                console.log("error", err);
            });
    };

    return (
        <div className="mainContainer">
            <div className="logoBack">
                <div className="logo"></div>
                <p>GIG GUIDE</p>
            </div>

            <div className="mainMenu">
                {!admin && (
                    <div className="easterEgg" title="Map">
                        <Link to="/map">
                            <img src="globe.gif"></img>
                        </Link>
                    </div>
                )}
                {admin && (
                    <div className="mainMenuEditOptions">
                        <Link to="/gig-creator" className="mainMenuLink">
                            {" "}
                            Add
                        </Link>
                        <div className="easterEgg" title="Map">
                            <Link to="/map">
                                <img src="globe.gif"></img>
                            </Link>
                        </div>
                        <Link to="/gig-editor" className="mainMenuLink">
                            {" "}
                            Edit
                        </Link>
                    </div>
                )}
                <Link to="/gig-list" className="mainMenuLink">
                    Gig List
                </Link>

                {visitors && (
                    <div className="visitors">
                        Visitors<div>{visitors}</div>
                        <div className="logout" onClick={() => logOut()}>
                            LogOut
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
