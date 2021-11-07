import { useState, useEffect } from "react";
import axios from "./tools/axios";
import { Link } from "react-router-dom";

export default function About({ setAboutMode, aboutMode }) {
    const [imgCount, setImgCount] = useState(2);
    const [userName, setUserName] = useState(false);
    const [email, setEmail] = useState(false);
    const [website, setWebsite] = useState("");
    const [comment, setComment] = useState(false);
    const [commentSection, setCommentSection] = useState(true);
    const [blogComments, setBlogComments] = useState(false);

    useEffect(function () {
        setAboutMode(true);
       getAboutComments()
    }, []);

    const getAboutComments = (e) => {
         axios
             .get("/get-about-comments/")
             .then(({ data }) => {
                 setBlogComments(data.rows);
             })
             .catch((err) => {
                 console.log("err in Gig Entry GET Request : ", err);
             });

    }

    const sendComment = (e) => {
        if (comment && userName && email) {
            axios
                .post("/add-about-comment/", {
                    comment: comment,
                    userName: userName,
                    email: email,
                    website: website,
                })
                .then(({ data }) => {
                   setCommentSection(true)
                   getAboutComments()
                })
                .catch((err) => {
                    console.log("err in Gig Entry GET Request : ", err);
                });
        }
    };

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
                    <div className="about"> About</div>
                    <div className="authWrapper">
                        <div className="aboutText">
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
                    <div className="author">
                        {(!commentSection && "Say A Word") || "Comments"}
                    </div>
                    {!commentSection && (
                        <div
                            className="sendAboutCommentClose"
                            onClick={(e) => {
                                setCommentSection(!commentSection);
                            }}
                        >
                            X
                        </div>
                    )}
                    {commentSection && (
                        <div className="saySomethingBack" id="saySomethingBack">
                            {blogComments &&
                                blogComments.map((blogEntry) => {
                                    return (
                                        <div
                                            className="blogEntry"
                                            key={blogEntry.id}
                                        >
                                            <div className="blogName">
                                                {blogEntry.name}
                                            </div>
                                            <div className="blogText">
                                                {blogEntry.comment}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                    {!commentSection && (
                        <textarea
                            className="saySomethingBack"
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                        ></textarea>
                    )}

                    {commentSection && (
                        <div
                            className="sendAboutCommentToggler"
                            onClick={(e) => {
                                setCommentSection(!commentSection);
                            }}
                        >
                            Leave A Comment
                        </div>
                    )}
                    {!commentSection && (
                        <div className="aboutCommentControls">
                            <input
                                autoComplete="none"
                                placeholder="Your Name"
                                className="aboutInput"
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                }}
                            ></input>
                            <input
                                className="aboutInput"
                                autoComplete="none"
                                placeholder="Your Email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            ></input>
                            <input
                                className="aboutInput"
                                autoComplete="none"
                                placeholder="Website"
                                onChange={(e) => {
                                    setWebsite(e.target.value);
                                }}
                            ></input>
                        </div>
                    )}
                    {!commentSection && (
                        <div
                            className="sendAboutComment"
                            id={
                                (!comment &&
                                    !userName &&
                                    !email &&
                                    "sendAboutComment") ||
                                ""
                            }
                            onClick={(e) => {
                                sendComment();
                            }}
                        >
                            Send
                        </div>
                    )}
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
