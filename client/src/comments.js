import { useState, useEffect, useRef } from "react";
import axios from "./tools/axios";
import { Link } from "react-router-dom";
import { socket } from "./tools/socket";
import { useSelector } from "react-redux";

export default function Comments({
    selectedGigId,
    myUserId,
    super_admin,
    nickname,
    toggleComments,
}) {
    const [post, setPost] = useState(false);

    const elemRef = useRef();

    const comments = useSelector((state) => state && state.comments);

    useEffect(
        function () {
            axios
                .post("/get-comments/", {
                    selectedGigId: selectedGigId,
                })
                .then(({ data }) => {
                    socket.emit("COMMENTS", data.data);
                })
                .catch((err) => {
                    console.log("err in Gig Entry GET Request : ", err);
                });
        },
        [selectedGigId]
    );

    useEffect(() => {
        if (elemRef.current) {
            const newScrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
            elemRef.current.scrollTop = newScrollTop;
        }
    }, [comments]);

    const getPost = (e) => {
        setPost(e.target.value);
    };

    const elem = document.querySelectorAll("#commentsTypeLine");

    const addComment = (e) => {
        if (!post) {
            return;
        } else {
            axios
                .post("/add-comment/", {
                    selectedGigId: selectedGigId,
                    myUserId: myUserId,
                    comment: post,
                })
                .then(({ data }) => {
                    socket.emit("ADD COMMENT", data.data[0]);
                    elem[0].value = "";
                    setPost(false);
                })
                .catch((err) => {
                    console.log("err in Gig Entry GET Request : ", err);
                });
        }
    };

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            if (e.target.value !== "") {
                e.preventDefault();
                addComment();
                e.target.value = "";
            }
            e.preventDefault();
        }
    };

    return (
        <div className="commentsContainer">
            <div className="commentHead">Comments</div>

            <div className="commentBox" ref={elemRef}>
                {comments && comments.length == 0 && (
                    <h1>Nothing here yet .</h1>
                )}
                {comments &&
                    comments.map((comment) => (
                        <div key={comment.id}>
                            {comment.gig_id == selectedGigId && (
                                <div>
                                    <div className="comment" id={comment.id}>
                                        {comment.comment}
                                        <div>
                                            {comment.nickname || nickname}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
            <textarea
                rows="1"
                className="chatTypeLine"
                id="commentsTypeLine"
                onChange={(e) => {
                    getPost(e);
                }}
                onKeyDown={(e) => keyCheck(e)}
            ></textarea>
            <div
                className="mainMenuLink"
                id="commentButton"
                onClick={(e) => addComment(e)}
            >
                Send
            </div>
            <div className="communityConfig">
                <div
                    className="onlineUsersRedDot"
                    id="commentsBack"
                    title="Back"
                    onClick={() => toggleComments()}
                ></div>
            </div>
        </div>
    );
}
