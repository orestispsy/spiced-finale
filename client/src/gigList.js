import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function GigList({ gigsList, list, listSet }) {

       useEffect(function () {
           listSet(true)
       }, []);
    // console.log("GIGSLIST IN GIGSLIST", gigsList);
    return (
        <div className="gigListContainer">
            <h1>Gig Entries</h1>
            <p>Total: {gigsList && gigsList.length}</p>
            <div className="gigEntries">
                {gigsList &&
                    gigsList.map((gig) => (
                        <div key={gig.id}>
                            <h2>
                                <span
                                    style={{
                                        color: `lime`,
                                    }}
                                >
                                    {gig.date}
                                </span>{" "}
                                <span
                                    style={{
                                        color: `crimson`,
                                    }}
                                >
                                    {gig.venue}
                                </span>{" "}
                                <span
                                    style={{
                                        color: `white`,
                                    }}
                                >
                                    {gig.city}
                                </span>{" "}
                            </h2>
                        </div>
                    ))}
            </div>
            <Link to="/" className="backLink">
                Back
            </Link>
        </div>
    );
}
