import { useEffect, useRef } from "react";
import React from "react";

export default function Ticker({}) {
    useEffect(function () {}, []);

    const tickerRef = useRef();

    if (tickerRef.current) {
        var { offsetLeft } = tickerRef.current;


        var headlines = document.querySelectorAll("#headlines");
        var body = document.querySelectorAll("body");

        var links = document.querySelectorAll(".tickerLink");

        var left = headlines[0].offsetLeft;

        var requestid;

        if (left) {
            const moveHeadlines = () => {
                left = left - 2;
                if (left < -headlines[0].offsetWidth) {
                    left = body[0].offsetWidth;
                }
                headlines[0].style.left = left + "px";
                requestid = requestAnimationFrame(moveHeadlines);
            };

            const stopHeadlines = () => {
                for (var i = 0; i < links.length; i++) {
                    links[i].addEventListener("mouseenter", function (event) {
                        event.target.style.color = "white";
                        cancelAnimationFrame(requestid);
                    });

                    links[i].addEventListener("mouseleave", function (event) {
                        moveHeadlines();
                        event.target.style.color = "lime";
                        event.target.style.textDecoration = "none";
                    });
                }
            };

            moveHeadlines();
            stopHeadlines();
        }
    }

    return (
        <div id="headlines" ref={tickerRef}>
            <a className="tickerBlankLink" target="_blank">
                Welcome My Friends
            </a>
            <a className="tickerBlankLink" target="_blank">
                Nice to see you here, enjoy your stay !
            </a>
            <a className="tickerBlankLink" target="_blank">
                Check out this selected music I've got here for you
            </a>

            <a
                className="tickerLink"
                href="https://www.mixcloud.com/WeirdFishesRadio/night-flight-du-beast-special-vol-i-sitting-at-the-bar-with-john/"
                target="_blank"
            >
                <span
                >
                    ➤
                </span>
                Du Beast Special Vol. I : "Sitting at the Bar with John"
            </a>

            <a
                className="tickerLink"
                href="https://www.mixcloud.com/WeirdFishesRadio/night-flight-09042020/"
                target="_blank"
            >
                <span
                >
                    ➤
                </span>
                Night Flight 09.04.2020
            </a>
            <a
                className="tickerLink"
                href="https://www.mixcloud.com/WeirdFishesRadio/night-flight-12112020/"
                target="_blank"
            >
                <span
                >
                    ➤
                </span>
                Night Flight 12.11.2020
            </a>
            <a
                className="tickerLink"
                href="https://www.mixcloud.com/WeirdFishesRadio/night-flight-du-beast-special-vol-ii/"
                target="_blank"
            >
                <span
                >
                    ➤
                </span>
                Du Beast Special Vol. II
            </a>
            <a
                className="tickerLink"
                href="https://www.mixcloud.com/WeirdFishesRadio/night-flight-30052019/"
                target="_blank"
            >
                <span
                >
                    ➤
                </span>
                Night Flight 30.05.2019
            </a>
            <a
                className="tickerLink"
                href=" https://www.mixcloud.com/WeirdFishesRadio/night-flight-08042021/"
                target="_blank"
            ><span
                >
                    ➤
                </span>
                Night Flight 08.04.2021
            </a>
        </div>
    );
}
