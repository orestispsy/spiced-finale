import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Main({ admin, listSet, visitors }) {
      useEffect(function () {
          listSet(false);
      }, []);

    return (
        <div className="mainContainer">
            <div className="logoBack">
                <div className="logo"></div>
                <p>GIG GUIDE</p>
            </div>
            <div className="mainMenu">
                {admin && (
                    <div className="easterEgg">
                        <Link to="/map">
                            <img src="redBall.gif"></img>
                        </Link>
                    </div>
                )}
                {!admin && <Link to="/map"> Map</Link>}
                {admin && (
                    <>
                        <Link to="/gig-creator"> Add</Link>
                        <Link to="/gig-editor"> Edit</Link>
                    </>
                )}
                <Link to="/gig-list">
                    Gig List
                </Link>
                {visitors && <div className="visitors">Visitors Counter<div>{visitors}</div></div>}
            </div>
        </div>
    );
}
