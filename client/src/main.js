import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "./tools/axios";

export default function Main({
    super_admin,
    admin,
    listSet,
    visitors,
    darkMode,
    setDarkMode,
}) {
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
            <div id={darkMode && "logoBoxDark"}>
                <div className="logoBack">
                    {!darkMode && (
                        <div className="logo" id={darkMode && "logoDark"}></div>
                    )}
                    <p id={darkMode && "logoDarkP"}>GIG GUIDE</p>
                </div>

                <div className="mainMenu" id={darkMode && "mainMenuDark"}>
                    {!admin && (
                        <div className="easterEgg" title="Map">
                            <Link to="/map">
                                <img
                                    id={darkMode && "globeDark"}
                                    src="globe.gif"
                                ></img>
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
                                    <img
                                        id={darkMode && "globeDark"}
                                        src="globe.gif"
                                    ></img>
                                </Link>
                            </div>
                            <Link to="/gig-editor" className="mainMenuLink">
                                {" "}
                                Edit
                            </Link>
                        </div>
                    )}
                    <Link to="/gig-list" className="mainMenuLink">
                        Entries
                    </Link>
                </div>
            </div>
            <div
                className={
                    (darkMode && "DarkMode") || (!darkMode && "lightMode")
                }
                onClick={() => {
                    setDarkMode(!darkMode);
                }}
            ></div>
            {super_admin && (
                <Link to="/super-admin">
                    <div className="superAdminButton">
                        <img src="superAdmin.png"></img>
                    </div>
                </Link>
            )}
            {visitors && (
                <div className="visitors">
                    Visitors<div>{visitors}</div>
                    <div className="logout" onClick={() => logOut()}>
                        LogOut
                    </div>
                </div>
            )}
        </div>
    );
}
