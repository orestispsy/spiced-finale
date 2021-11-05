import { useState, useEffect } from "react";
import axios from "./tools/axios";
import { Link} from "react-router-dom";

export default function About({ setAboutMode, aboutMode }) {
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
            
                    <Link
                        to="/"
                        className="buttonBack"
                        id="aboutClose"
                        title="Back"
                        onClick={(e) => {
                            setAboutMode(false);
                        }}
                    >
                        X
                    </Link>
             

                <a target="_blank" href="https://www.1000mods.com">
                    <div className="logo2About"></div>
                </a>

                <div className="logo2AboutDesc"> The Gig Guide</div>

                <div className="aboutBack">
                    <div className="author"> About</div>
                    <div className="authWrapper">
                        <div className="authorText">
                            <div>
                                Friend, fan and brother soul of The Almighty{" "}
                                <a
                                    href="https://www.1000mods.com"
                                    target="_blank"
                                >
                                    1000mods
                                </a>
                                . We met back in the early daze, when the
                                universe joined lines and brought things
                                together.
                            </div>
                            <div>
                                Some years ago I asked them if there is a
                                concert archive for all these years on stage.
                                The answer was: " Yes, the first 500 are stored
                                in documents or hand-written in lists. As for
                                the rest, nowadays they can be found ! ".
                            </div>
                            <div>
                                Lately, after summoning some super-tech-powers
                                up, I started building an "archive" website for
                                1000mods, their fans and all these nights of
                                sweat on stage and the floor.
                            </div>
                            <div>
                                The "Thousand Gigs Guide" is a tool for the band
                                to create, manage and maintain their own concert
                                history. On the same time, it is an online band
                                concert agenda for fans , to get the past &
                                future band's Touring Info, contribute in it and
                                interact with each other.
                            </div>
                        </div>
                    </div>
                    <div className="author"> The Author</div>
                    <div className="authWrapper">
                        <div className="authPic"></div>
                        <div className="authorText">
                            <div>
                                Web Developer, Drummer, Story Teller from Outer
                                Space.
                            </div>

                            <div>
                                Can be found hitch-hiking the Super Van when on
                                tour, letting the dates decide for the day back
                                home...
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
