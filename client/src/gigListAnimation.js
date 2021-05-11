import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function GigList({ gigsList, listSet }) {
    useEffect(function () {
        listSet(true);
        
    const elem = document.querySelectorAll(".scroll-text");
    console.log(elem);

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
        <div className="pre-wrapper">
            <div className="wrapper">
           
                    <div className="scroll-text">
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
            </div>
            <Link to="/gig-list" className="backLink">
                Back
            </Link>
        </div>
    );
}
