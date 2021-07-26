import { useState, useEffect } from "react";
import axios from "./tools/axios";

export default function Community({ selectedGigId, myUserId }) {
    const [contribute, setContribute] = useState(false);
    const [file, setFile] = useState("");
    const [images, setImages] = useState("");
    const [error, setError] = useState(false);
    useEffect(
           
        function () {
             setError(false);
            setContribute(false);
            axios
                .post("/get-community-images/", {
                    selectedGigId: selectedGigId,
                })
                .then(({ data }) => {
                    setImages(data.rows);
                })
                .catch((err) => {
                    console.log("err in Gig Entry GET Request : ", err);
                });
        },
        [selectedGigId]
    );

    useEffect(
        function () {
            console.log("IMAGES", images);
        },
        [images]
    );

    const handleUploaderClick = () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify(selectedGigId));
        formData.append("user", JSON.stringify(myUserId));
        axios
            .post("/upload-community-image", formData)
            .then(({ data }) => {
                if(data.success){
                    setImages(images.concat(data.rows[0]));
                    setContribute(false)
                     setError(false);
                } else if (data.error){
                    setError(true)
                }
                
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
                // console.log("err in axios in Image Uploader ", err);
            });
    };

    return (
        <div className="communityContainer">
            <div>Community</div>
            <div className="communityPhotos">
                {images &&
                    images.map((img) => (
                        <a href={img.img_url} target="_blank" key={img.id}>
                            <img src={img.img_url}></img>
                        </a>
                    ))}
            </div>
            {!contribute && (
                <div
                    id="contribute"
                    className="mainMenuLink"
                    onClick={() => setContribute(true)}
                >
                    Contribute!
                </div>
            )}
            {contribute && (
                <div className="fileUploader">
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        onClick={() => setError(false)}
                    />

                    <div
                        title="Upload Image"
                        className="upload"
                        onClick={() => handleUploaderClick()}
                    ></div>
                </div>
            )}
            {error && <p className="error">Select an Image [Max Size: 2MB]</p>}
        </div>
    );
}
