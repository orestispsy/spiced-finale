import { useState, useEffect, useRef } from "react";
import axios from "./tools/axios";
import { Link } from "react-router-dom";
import { socket } from "./tools/socket";
import { useSelector } from "react-redux";

export default function Community({
    selectedGigId,
    myUserId,
    super_admin,
    nickname,
    toggleComments,
}) {
    const [contribute, setContribute] = useState(false);
    const [file, setFile] = useState("");

    const [error, setError] = useState(false);
    const [upload, setUpload] = useState(false);

    const elemRef = useRef();

    const images = useSelector((state) => state && state.images);

    useEffect(() => {
        if (elemRef.current) {
            const newScrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
            elemRef.current.scrollTop = newScrollTop;
        }
    }, [images]);

    useEffect(
        function () {
            if (selectedGigId) {
                setError(false);
                setContribute(false);
                axios
                    .post("/get-community-images/", {
                        selectedGigId: selectedGigId,
                    })
                    .then(({ data }) => {
                        socket.emit("GET IMAGES", data.rows);
                    })
                    .catch((err) => {
                        console.log("err in Gig Entry GET Request : ", err);
                    });
            }
        },
        [selectedGigId]
    );

    const imageDelete = (e) => {
        axios
            .post("/delete-community-image/", {
                imageId: e,
            })
            .then(({ data }) => {
                if (data.success) {
                    socket.emit("DELETE IMAGE", data.data);
                }
            })
            .catch((err) => {
                console.log("err in Gig Entry GET Request : ", err);
            });
    };

    const handleUploaderClick = () => {
        setUpload(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify(selectedGigId));
        formData.append("user", JSON.stringify(myUserId));
        formData.append("nickname", nickname);
        axios
            .post("/upload-community-image", formData)
            .then(({ data }) => {
                if (data.success) {
                    socket.emit("ADD IMAGE", data.rows[0]);
                    setContribute(false);
                    setError(false);
                    setFile("");
                    setUpload(false);
                } else if (data.error) {
                    setError(true);
                    setUpload(false);
                }
            })
            .catch((err) => {
                setError(true);
                setUpload(false);
                // console.log("err in axios in Image Uploader ", err);
            });
    };

    return (
        <div className="communityContainer">
            <Link
                to="/gig-list"
                className="buttonBack"
                id="buttonBack"
                style={{
                    marginBottom: `-2.5vmax`,
                }}
            >
                X
            </Link>
            <div className="gallery">Gallery</div>
            <div className="communityPhotos" ref={elemRef}>
                {images && images.length == 0 && <h1>Nothing here yet .</h1>}

                {images &&
                    images.map((img) => (
                        <div key={img.id}>
                            {super_admin ||
                                (myUserId == img.img_sender_id && (
                                    <div
                                        className="deletecommunityPhoto"
                                        title="Delete"
                                        id={img.id}
                                        onClick={(e) =>
                                            imageDelete(e.target.id)
                                        }
                                    ></div>
                                ))}
                            {img.gig_id == selectedGigId && super_admin && (
                                <div
                                    className="deletecommunityPhoto"
                                    title="Delete"
                                    id={img.id}
                                    onClick={(e) => imageDelete(e.target.id)}
                                ></div>
                            )}
                            {img.gig_id == selectedGigId && (
                                <div className="communityPhotosDetails">
                                    <a href={img.img_url} target="_blank">
                                        <img src={img.img_url}></img>
                                    </a>
                                    Uploaded by: <div>{img.nickname}</div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
            {!contribute && (
                <div className="galleryControls">
                    <div
                        id="contribute"
                        className="mainMenuLink"
                        onClick={() => setContribute(true)}
                    >
                        Contribute!
                    </div>
                    <div
                        id="commentsButton"
                        className="mainMenuLink"
                        onClick={() => toggleComments()}
                    >
                        Comments
                    </div>
                </div>
            )}

            {contribute && (
                <div className="fileUploaderBack">
                    <div className="addPhoto"> Add Image</div>
                    <div className="fileUploader" id="fileUploader">
                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            onClick={() => setError(false)}
                        />

                        {!upload && (
                            <div
                                title="Upload Image"
                                className="upload"
                                onClick={() => handleUploaderClick()}
                            ></div>
                        )}
                        {upload && <div className="uploading"></div>}
                    </div>
                    {contribute && (
                        <div className="communityConfig">
                            <div
                                className="onlineUsersRedDot"
                                id="commentsBack"
                                title="Back"
                                onClick={() => {
                                    setContribute(false);
                                    setError(false);
                                }}
                            ></div>
                        </div>
                    )}
                </div>
            )}

            {error && <p className="error">Select an Image [Max Size: 2MB]</p>}
        </div>
    );
}
