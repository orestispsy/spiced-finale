import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function GigList({ gigsList, listSet }) {

    const [sortedGigs, setSortedGigs] = useState(false);
    const [year, setYear] = useState(false);

    useEffect(function () {
        listSet(true);
    }, []);

    // console.log("GIGSLIST IN GIGSLIST", gigsList);

    const gigListFiltering = (e) => {
        setSortedGigs(gigsList.filter((gig) => gig.date.includes(e)))
    }

     const gigsReset = (e) => {
         setYear(false)
         setSortedGigs(gigsList)
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
            <div
                style={{
                    color: `#529DE1 `,
                    backgroundColor: `black`,
                    borderRadius: `50%`,
                    borderBottom: `1px solid yellow`,
                    borderTop: `1px solid yellow`,
                    padding: `1.5vmax`,
                    marginTop: "-1.5vmax",
                    zIndex: `23423`,
                }}
            >
                {gigsList && !sortedGigs && gigsList.length}
                {sortedGigs && sortedGigs.length}
            </div>
            <div className="gigEntries">
                {sortedGigs &&
                    sortedGigs.map((gig) => (
                        <Link to={`/api/gig/${gig.id}`} key={gig.id}>
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
