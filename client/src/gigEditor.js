import { Link } from "react-router-dom";
import React from "react";
import axios from "./tools/axios";

export default class GigEditor extends React.Component {
    constructor(props) {
        // console.log("PROPS IN EDITOR", props);
        super(props);
        this.state = {
            error: false,
            delete: false,
            selectedGig: "",
            success: false,
            deleteSuccess: false,
            file: false,
        };
    }

    handleClick() {
        axios
            .post("/gig-update", this.state)
            .then(({ data }) => {
                // console.log("DATA", data.data);
                if (data.data) {
                    location.reload();
                } else {
                    // console.log("data fail");
                    this.setState({
                        error: true,
                        file: null,
                    });
                }
            })
            .catch((err) => {
                // console.log("err in axios POST /gig-creator: ", err);
            });
    }

    handleUploaderClick() {
        const formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("data", JSON.stringify(this.state.selectedGig));
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                if (data.success) {
                   this.setState({
                       success: true,
                   });
                   setTimeout(function () {
                       location.reload();
                   }, 2000);
                   
                } else {
                    // console.log("data fail");
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
                // console.log("err in axios in Image Uploader ", err);
            });
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            // () => console.log("State after setState: ", this.state)
        );
    }

    handleUploaderChange(e) {
        this.setState(
            {
                file: e.target.files[0],
            },
            // () =>
            //     console.log(
            //         "this.state after setState: ",
            //         this.state,
            //         "ok",
            //         this.state.file
            //     )
        );
    }

    inputsReset() {
        this.setState(
            {
                date: "",
                venue: "",
                lat: "",
                lng: "",
                tour_name: "",
                city: "",
            },
            // () => console.log("State after setState: ", this.state)
        );
    }

    inputReset(e) {
        this.setState(
            {
                selectedGig: {
                    ...this.state.selectedGig,
                    [e.target.name]: e.target.value,
                },
            },
            // () => console.log("STEEEEEIT: ", this.state)
        );
    }

    gigSelector(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => {
                // console.log("State after setState: ", this.state);
                axios
                    .post("/get-gig-to-edit", this.state)
                    .then(({ data }) => {
                        if (data.data) {
                            this.setState({
                                selectedGig: data.data,
                            });
                            // console.log("selected Gig", this.state.selectedGig);
                        }
                    })
                    .catch((err) => {
                        console.log(
                            "err in axios App User POST Request : ",
                            err
                        );
                    });
            }
        );
    }

    gigDelete() {
        axios
            .post("/gig-delete", this.state)
            .then(({ data }) => {
                // console.log("got it", data);
                if (data.deleteSuccess) {
                    this.setState({
                        deleteSuccess: true,
                        delete:false
                    });
                    setTimeout(function () {
                        location.replace("/");
                    }, 2000);
                }
                
            })
            .catch((err) => {
                console.log("err in axios App User POST Request : ", err);
            });
    }

    deleteWarn(e) {
        this.setState({
            delete: e,
        });
    }

    resetUploader() {
         this.setState({
             success: false,
         });
    }

    handleErrorMsg(e) {
        this.setState({
            error: false,
        });
    }

    render() {
        return (
            <div className="gigEditorContainer">
                <form>
                    <select
                        name="selectedGig"
                        className="selectGig"
                        onChange={(e) => this.gigSelector(e)}
                        onClick={() => this.inputsReset()}
                        onClick={(e) => this.deleteWarn(false)}
                        onClick={() => this.resetUploader()}
                    >
                        <option
                            className="chooseGig"
                            value=""
                            onClick={() => this.inputsReset()}
                        >
                            Select Gig
                        </option>
                        {this.props.gigsList &&
                            this.props.gigsList.map((gig) => (
                                <option value={gig.date} key={gig.id}>
                                    {gig.date} {gig.venue}
                                </option>
                            ))}
                    </select>
                    <span>Date</span>
                    <input
                        value={
                            this.state.date || this.state.selectedGig.date || ""
                        }
                        autoComplete="none"
                        name="date"
                        placeholder="date"
                        type="date"
                        onChange={(e) => this.handleChange(e)}
                        onClick={() => this.handleErrorMsg()}
                        onChange={(e) => this.inputReset(e)}
                        onClick={(e) => this.deleteWarn(false)}
                    />
                    <span>City</span>
                    <input
                        value={
                            this.state.city || this.state.selectedGig.city || ""
                        }
                        autoComplete="none"
                        name="city"
                        placeholder="City"
                        onChange={(e) => this.handleChange(e)}
                        onClick={() => this.handleErrorMsg()}
                        onChange={(e) => this.inputReset(e)}
                        onClick={(e) => this.deleteWarn(false)}
                    />
                    <span>Venue</span>
                    <input
                        value={
                            this.state.venue ||
                            this.state.selectedGig.venue ||
                            ""
                        }
                        autoComplete="none"
                        name="venue"
                        placeholder="Venue"
                        onChange={(e) => this.handleChange(e)}
                        onClick={() => this.handleErrorMsg()}
                        onChange={(e) => this.inputReset(e)}
                        onClick={(e) => this.deleteWarn(false)}
                    />
                    <span>Latitude</span>
                    <input
                        value={
                            this.state.lat || this.state.selectedGig.lat || ""
                        }
                        autoComplete="none"
                        name="lat"
                        placeholder="Latitude"
                        onChange={(e) => this.handleChange(e)}
                        onClick={() => this.handleErrorMsg()}
                        onChange={(e) => this.inputReset(e)}
                        onClick={(e) => this.deleteWarn(false)}
                    />
                    <span>Longitude</span>
                    <input
                        value={
                            this.state.lng || this.state.selectedGig.lng || ""
                        }
                        autoComplete="none"
                        name="lng"
                        placeholder="Longitude"
                        onChange={(e) => this.handleChange(e)}
                        onClick={() => this.handleErrorMsg()}
                        onChange={(e) => this.inputReset(e)}
                        onClick={(e) => this.deleteWarn(false)}
                    />
                    <span>Tour</span>
                    <input
                        value={
                            this.state.tour_name ||
                            this.state.selectedGig.tour_name ||
                            ""
                        }
                        autoComplete="none"
                        name="tour_name"
                        placeholder="Tour Name"
                        onChange={(e) => this.handleChange(e)}
                        onClick={() => this.handleErrorMsg()}
                        onChange={(e) => this.inputReset(e)}
                        onClick={(e) => this.deleteWarn(false)}
                    />

                    {this.state.error && (
                        <p className="error">Oups! Something Went Wrong.</p>
                    )}
                    <button onClick={() => this.handleClick()}>Update</button>
                    {!this.state.deleteSuccess && (<div
                        className="delete"
                        onClick={(e) => this.deleteWarn(true)}
                    >
                        Delete
                    </div>)}
                    {this.state.delete &&
                        this.state.selectedGig.date &&
                        !this.state.deleteSuccess && (
                            <div
                                className="deleteWarn"
                                onClick={() => this.gigDelete()}
                            >
                                Confirm
                            </div>
                        )}
                    {this.state.deleteSuccess && (
                        <div className="deleteSuccess"></div>
                    )}
                </form>

                {this.state.selectedGig.id && (
                    <div className="fileUploader">
                        <p>Poster ➤</p>
                        <img
                            className="imgPreview"
                            src={this.state.selectedGig.poster || "na.jpg"}
                        ></img>

                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={(e) => this.handleUploaderChange(e)}
                        />
                        {!this.state.success && (
                            <div
                                className="upload"
                                onClick={() => this.handleUploaderClick()}
                            >
                                Upload
                            </div>
                        )}
                        {this.state.success && (
                            <div className="uploadSuccess"></div>
                        )}
                    </div>
                )}

                <Link to="/" className="backLink">
                    Back
                </Link>
            </div>
        );
    }
}
