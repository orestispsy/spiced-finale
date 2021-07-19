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
            {admin && (
                <div className="easterEgg" title="Map">
                    <Link to="/map">
                        <img src="redBall.gif"></img>
                    </Link>
                </div>
            )}
            <div className="mainMenu">
                {!admin && (
                    <Link to="/map" title="Map">
                        Map
                    </Link>
                )}
                {admin && <Link to="/gig-creator"> Add</Link>}
                <Link to="/gig-list">Gig List</Link>
                {admin && <Link to="/gig-editor"> Edit</Link>}

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
