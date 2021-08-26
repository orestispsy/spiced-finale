import { Link } from "react-router-dom";
import React, {useState, useEffect, Fragment } from "react";

export default function GigList({ gigsList, listSet }) {
    const [sortedGigs, setSortedGigs] = useState(false);
    const [year, setYear] = useState(false);
    const [sortedMonths, setSortedMonths] = useState([]);
    const [months, setMonths] = useState([
        { id: "01", month: "January" },
        { id: "02", month: "February" },
        { id: "03", month: "March" },
        { id: "04", month: "April" },
        { id: "05", month: "May" },
        { id: "06", month: "June" },
        { id: "07", month: "July" },
        { id: "08", month: "August" },
        { id: "09", month: "September" },
        { id: "10", month: "October" },
        { id: "11", month: "November" },
        { id: "12", month: "December" },
    ]);

    useEffect(function () {
        listSet(true);
    }, []);

    var test = [];
    useEffect(
        function () {
            if (sortedGigs) {
                sortedGigs.map((gig) => {
                    var dateSplit = gig.date.split("-");
                    if (!test.includes(dateSplit[1])) {
                        test = test.concat(dateSplit[1]);
                        setSortedMonths(test);
                    } else {
                        return;
                    }
                });
            }
        },
        [sortedGigs]
    );


    const gigListFiltering = (e) => {
        setSortedGigs(gigsList.filter((gig) => gig.date.includes(e)));
        setSortedMonths([]);
    };

    const gigsReset = (e) => {
        setYear(false);
        setSortedGigs(false);
    };

    return (
        <div className="gigListContainer">
            <div className="gigEntriesBox">
                <h1>Gig Entries</h1>
                <div className="gigListControls">
                    <input
                        title="Set Year"
                        type="range"
                        min="2006"
                        max="2021"
                        name="selectedGig"
                        className="selectGigEntry"
                        onChange={(e) => {
                            gigListFiltering(e.target.value);
                            setYear(e.target.value);
                        }}
                    ></input>
                    <div
                        title="Reset"
                        className="sortedGigReset"
                        onClick={() => {
                            gigsReset();
                        }}
                    >
                        reset
                    </div>
                </div>
                <div className="year"> {year && year} </div>
            </div>
            <div className="gigEntriesCounter">
                {gigsList && !sortedGigs && gigsList.length}
                {sortedGigs && sortedGigs.length}
            </div>
            <div className="gigEntries">
                {sortedGigs && (
                    <div className="gigListMonths">
                        {months &&
                            months.map((month) => (
                                <React.Fragment key={month.id}>
                                    {sortedMonths.includes(month.id) && (
                                        <div className="exactMonth">
                                            {month.month}

                                            <div className="monthInnerBox">
                                                {sortedGigs &&
                                                    sortedGigs.map((gig) => {
                                                        var splitDate =
                                                            gig.date.split("-");

                                                        return (
                                                            <React.Fragment
                                                                key={gig.id}
                                                            >
                                                                {splitDate[1] ==
                                                                    month.id && (
                                                                    <Link
                                                                        to={`/api/gig/${gig.id}`}
                                                                    >
                                                                        <div className="gigBox">
                                                                            <div
                                                                                style={{
                                                                                    color: `yellow`,
                                                                                    textDecoration: `underline`,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    gig.date
                                                                                }
                                                                            </div>
                                                                            <div
                                                                                style={{
                                                                                    color: `lime`,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    gig.venue
                                                                                }
                                                                            </div>
                                                                            <div
                                                                                style={{
                                                                                    color: `white`,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    gig.city
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                )}
                                                            </React.Fragment>
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}{" "}
                    </div>
                )}
                {gigsList &&
                    !sortedGigs &&
                    gigsList.map((gig) => (
                        <Link to={`/api/gig/${gig.id}`} key={gig.id}>
                            <div className="gigBox">
                                <div
                                    style={{
                                        color: `yellow`,
                                        textDecoration: `underline`,
                                    }}
                                >
                                    {gig.date}
                                </div>
                                <div
                                    style={{
                                        color: `lime`,
                                    }}
                                >
                                    {gig.venue}
                                </div>
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
