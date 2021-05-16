import { Link, useRef } from "react-router-dom";
import { useState, useEffect } from "react";

import useSound from "use-sound";

import introSfx from "./../public/21space.mp3";

export default function GigList({ gigsList, listSet }) {

    const [play, { stop }] = useSound(introSfx, { volume: 0.75 });
    const [go, setGo] = useState(false);



    useEffect(function () {
              
        listSet(true);
    }, []);
    // console.log("GIGSLIST IN GIGSLIST", gigsList);
    useEffect(function () {
        play();
    }, [go]);

    // const textMouseEffect = (e) => {
    //     e.target.offSetY = 0;
    //     console.log("elem2", elem);
    //     console.log(e.target.style);
    //     e.target.style.width = `150vw`;
    //     e.target.style.marginLeft = `-50vw`;
    // };

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
            {!go && (
                <div className="go" onClick={() => setGo(true)}>
                    GO!
                </div>
            )}
            {go && (
                <div className="wrapper">
                    <div className="scroll-text">
                        {gigsList &&
                            gigsList.map((gig) => (
                                <div key={gig.id}>
                                    <h2>
                                        <span>{gig.date}</span>

                                        <span>{gig.venue}</span>

                                        <span>{gig.city}</span>
                                    </h2>
                                </div>
                            ))}
                    </div>
                </div>
            )}
            <Link to="/gig-list" className="backLink" onClick={() => stop()}>
                Back
            </Link>
        </div>
    );
}
