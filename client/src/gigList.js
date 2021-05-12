import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import useSound from "use-sound";
import introSfx from "./../public/21space.mp3";

export default function GigList({ gigsList, listSet }) {

       useEffect(function () {
           listSet(true)
       }, []);
    // console.log("GIGSLIST IN GIGSLIST", gigsList);
    
                const [play] = useSound(introSfx, { volume: 0.75 });
    
    if (gigsList) {
        for (var i = 0; i < gigsList.length; i++) {
            let propsDate = gigsList[i].date.split("-");
            var fixedDate =
                propsDate[2] + "-" + propsDate[1] + "-" + propsDate[0];
            gigsList[i].date = fixedDate
        }
    }

    return (
        // <div className="pre-wrapper">
        //     <div className="wrapper">
        //         <div className="scroll-text">
        //             <h1>YOLO</h1>
        //             <h2>YUHUUUUUUUUU</h2>
        //             <p>
        //                 thrrtwthwthwthwetvwhh whvwhvwhwvthvwth
        //                 whvwthwthvwthvwhwrt wehtvwtehvwthvwhvwthvwthvwthw
        //             </p>
        //             <p>
        //                 thrrtwthwthwthwetvwhh whvwhvwhwvthvwth
        //                 whvwthwthvwthvwhwrt wehtvwtehvwthvwhvwthvwthvwthw
        //             </p>
        //             <p>
        //                 thrrtwthwthwthwetvwhh whvwhvwhwvthvwth
        //                 whvwthwthvwthvwhwrt wehtvwtehvwthvwhvwthvwthvwthw
        //             </p>
        //             <p>
        //                 thrrtwthwthwthwetvwhh whvwhvwhwvthvwth
        //                 whvwthwthvwthvwhwrt wehtvwtehvwthvwhvwthvwthvwthw
        //             </p>
        //         </div>
        //     </div>
        // </div>
        <div className="gigListContainer">
            <h1>Gig Entries</h1>
            <p>
                Total:{" "}
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
                        <div key={gig.id}>
                            <h2>
                                <span
                                    style={{
                                        color: `white`,
                                    }}
                                >
                                    {gig.date}
                                </span>{" "}
                                •{" "}
                                <span
                                    style={{
                                        color: `yellow`,
                                    }}
                                >
                                    {gig.venue}
                                </span>{" "}
                                •{" "}
                                <span
                                    style={{
                                        color: `white`,
                                    }}
                                >
                                    {gig.city}
                                </span>
                            </h2>
                        </div>
                    ))}
            </div>
            <Link to="/" className="backLink">
                Back
            </Link>
            <Link
                to="/gig-list-animation"
                className="gigAnimationLink"
           
            >
                Animate!
            </Link>
        </div>
    );
}
