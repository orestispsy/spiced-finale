import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import useSound from "use-sound";
import introSfx from "./../public/21space.mp3";

export default function GigList({ gigsList, listSet }) {
    useEffect(function () {
        listSet(true);
     
    }, []);
    // console.log("GIGSLIST IN GIGSLIST", gigsList);

    if (gigsList) {
        for (var i = 0; i < gigsList.length; i++) {
            let propsDate = gigsList[i].date.split("-");
            var fixedDate =
                propsDate[2] + "-" + propsDate[1] + "-" + propsDate[0];
            gigsList[i].date = fixedDate;
        }
    }

    return (
        <div className="gigListContainer">
            <h1>Gig Entries</h1>
            <p>
                <span
                    style={{
                        color: `crimson`,
                        backgroundColor: `lime`,
                        borderRadius: `50%`,
                        padding: `5px`,
                    }}
                >
                    {gigsList && gigsList.length}
                </span>
            </p>
            <div className="gigEntries">
                {gigsList &&
                    gigsList.map((gig) => (
                        <Link to={`/gig/${gig.id}`} key={gig.id}>
                            <div className="gigBox">
                                <div
                                    style={{
                                        color: `yellow`,
                                        textDecoration: `underline`,
                                    }}
                                >
                                    {gig.date}
                                </div>{" "}
                                <div
                                    style={{
                                        color: `lime`,
                                    }}
                                >
                                    {gig.venue}
                                </div>{" "}
                                <div
                                    style={{
                                        color: `white`,
                                    }}
                                >
                                    {gig.city}
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
            <Link to="/" className="backLink">
                Back
            </Link>
            <Link to="/gig-list-animation" className="gigAnimationLink">
                Animate
            </Link>
        </div>
    );
}
