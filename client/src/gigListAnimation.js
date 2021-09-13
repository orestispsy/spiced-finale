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
    
    useEffect(function () {
        play();
    }, [go]);

    if (gigsList) {
        for (var i = 0; i < gigsList.length; i++) {
            let propsDate = gigsList[i].date.split("-");
            var fixedDate =
                propsDate[2] + "-" + propsDate[1] + "-" + propsDate[0];
            gigsList[i].date = fixedDate;
        }
    }

    return (
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
