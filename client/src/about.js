import { useState, useEffect } from "react";
import axios from "./tools/axios";

export default function About({ setAboutMode, about }) {
    const [imgCount, setImgCount] = useState(2);

    useEffect(function () {
        setAboutMode(true);
    }, []);

    return (
        <div className="aboutContainer">
            <div
                className="aboutDescription"
                onClick={(e) => {
                    if (imgCount < 9) {
                        setImgCount(imgCount + 1);
                    } else {
                        setImgCount(2);
                    }
                }}
            >
                <a target="_blank" href="https://www.1000mods.com">
                    <div className="logo2About"></div>
                </a>

                <div className="logo2AboutDesc"> The Gig Guide</div>

                <div className="aboutBack">
                    <div className="author"> About</div>
                    <div className="authWrapper">
                        <div className="authorText">
                            <div>
                                Some years ago I asked them if there is a
                                concert archive for all these years on stage.
                                The answer was: " Yes, the first 500 are stored
                                in documents or hand-written in lists or
                                somewhere! As for the rest, in our times, they
                                can be found ! ".
                            </div>
                            <div>
                                Lately, after summoning some tech super-powers
                                up I started building an "archive" website for
                                the band, the fans and all these nights of sweat
                                on stage and the floor.
                            </div>
                            <div>
                                The "Thousand Gigs Guide" is a tool for the band
                                to create, manage and maintain their own concert
                                history. It is an online concert agenda for Fans
                                on the same time, to get the past & future
                                band's Touring Info, contribute in it and
                                interact with each other.
                            </div>
                        </div>
                    </div>
                    <div className="author"> The Author</div>
                    <div className="authWrapper">
                        <div className="authPic"></div>
                        <div className="authorText">
                            <div>
                                Web Developer, Percussionist / Drummer, Story
                                Teller from Outer Space
                            </div>
                            <div>
                                Friend, fan and brother soul of The Almighty{" "}
                                <a
                                    href="https://www.1000mods.com"
                                    target="_blank"
                                >
                                    1000mods
                                </a>
                                . They met back in the early daze, when the
                                universe joined lines and brought things
                                together.
                            </div>
                            
                            <div>
                                Can be found hitch-hiking the Super Van when on
                                tour, letting the dates decide for his day back
                                home.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="aboutCover"
                style={{
                    backgroundImage: `url(/about/about${imgCount}.jpg)`,
                }}
            ></div>
        </div>
    );
}
