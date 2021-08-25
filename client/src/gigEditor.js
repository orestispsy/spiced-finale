import { Link } from "react-router-dom";
import React from "react";
import axios from "./tools/axios";

import EditMap from "./editMap";

import Posters from "./posters";
import { Discovery } from "aws-sdk";

export default class GigEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            delete: false,
            selectedGig: "",
            success: false,
            deleteSuccess: false,
            file: false,
            map: false,
            selectedPoster: "",
            posterSection: false,
        };
    }

    componentDidMount() {
        if (!this.props.admin) {
            location.replace("/");
        }
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
                        error2: true,
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    error2: true,
                });
                // console.log("err in axios in Image Uploader ", err);
            });
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            }
            // () => console.log("State after setState: ", this.state)
        );
    }

    handleUploaderChange(e) {
        this.setState(
            {
                file: e.target.files[0],
            }
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
                poster: "",
                selectedPoster: "",
            }
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
            }
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
                            "err in axios Gig Editor POST Request : ",
                            err
                        );
                    });
            }
        );
    }

    posterSelector(e) {
        this.setState({
            selectedGig: {
                ...this.state.selectedGig,
                poster: e,
            },
        });
    }

    gigDelete() {
        axios
            .post("/gig-delete", this.state)
            .then(({ data }) => {
                // console.log("got it", data);
                if (data.deleteSuccess) {
                    this.setState({
                        deleteSuccess: true,
                        delete: false,
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

    setPosterSection() {
        this.setState({
            posterSection: !this.state.posterSection,
        });
    }

    coordinator(e) {
        this.setState({
            selectedGig: {
                ...this.state.selectedGig,
                lng: parseFloat(e.latLng.lng()),
                lat: parseFloat(e.latLng.lat()),
            },
            new_lng: parseFloat(e.latLng.lng()),
            new_lat: parseFloat(e.latLng.lat()),
        });
    }

    mapToggler() {
        this.setState({
            map: !this.state.map,
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
                <div className="gigEditorContainerInner">
                    <form>
                        <select
                            name="selectedGig"
                            className="selectGig"
                            onChange={(e) => this.gigSelector(e)}
                            onClick={() => this.inputsReset()}
                            onClick={(e) => {
                                this.handleErrorMsg();
                                this.deleteWarn(false);
                            }}
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
                        {this.state.posterSection && (
                            <Posters
                                posterSelector={(e) => this.posterSelector(e)}
                            />
                        )}
                        {!this.state.map && !this.state.posterSection && (
                            <div className="inputBack">
                                <span>Date</span>
                                <input
                                    value={
                                        this.state.date ||
                                        this.state.selectedGig.date ||
                                        ""
                                    }
                                    autoComplete="none"
                                    name="date"
                                    placeholder="Date"
                                    type="date"
                                    onChange={(e) => this.handleChange(e)}
                                    onChange={(e) => this.inputReset(e)}
                                    onClick={(e) => {
                                        this.handleErrorMsg();
                                        this.deleteWarn(false);
                                    }}
                                />
                            </div>
                        )}
                        {!this.state.map && !this.state.posterSection && (
                            <div className="inputBack">
                                <span>City</span>
                                <input
                                    value={
                                        this.state.city ||
                                        this.state.selectedGig.city ||
                                        ""
                                    }
                                    autoComplete="none"
                                    name="city"
                                    placeholder="City"
                                    onChange={(e) => this.handleChange(e)}
                                    onChange={(e) => this.inputReset(e)}
                                    onClick={(e) => {
                                        this.handleErrorMsg();
                                        this.deleteWarn(false);
                                    }}
                                />
                            </div>
                        )}
                        {!this.state.map && !this.state.posterSection && (
                            <div className="inputBack">
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
                                    onChange={(e) => this.inputReset(e)}
                                    onClick={(e) => {
                                        this.handleErrorMsg();
                                        this.deleteWarn(false);
                                    }}
                                />
                            </div>
                        )}
                        {!this.state.map && !this.state.posterSection && (
                            <div className="inputBack">
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
                                    onChange={(e) => this.inputReset(e)}
                                    onClick={(e) => {
                                        this.handleErrorMsg();
                                        this.deleteWarn(false);
                                    }}
                                />
                            </div>
                        )}
                        {!this.state.posterSection && (
                            <div className="inputBack">
                                <span>Latitude</span>
                                <input
                                    value={
                                        this.state.selectedGig.lat ||
                                        this.state.new_lat ||
                                        this.state.lat ||
                                        ""
                                    }
                                    autoComplete="none"
                                    name="lat"
                                    placeholder="Latitude"
                                    onChange={(e) => this.handleChange(e)}
                                    onChange={(e) => this.inputReset(e)}
                                    onClick={(e) => {
                                        this.handleErrorMsg();
                                        this.deleteWarn(false);
                                    }}
                                />
                            </div>
                        )}
                        {!this.state.posterSection && (
                            <div className="inputBack">
                                <span>Longitude</span>
                                <input
                                    value={
                                        this.state.selectedGig.lng ||
                                        this.state.new_lng ||
                                        this.state.lng ||
                                        ""
                                    }
                                    autoComplete="none"
                                    name="lng"
                                    placeholder="Longitude"
                                    onChange={(e) => this.handleChange(e)}
                                    onChange={(e) => this.inputReset(e)}
                                    onClick={(e) => {
                                        this.handleErrorMsg();
                                        this.deleteWarn(false);
                                    }}
                                />
                            </div>
                        )}
                        {this.state.selectedGig &&
                            !this.state.deleteSuccess &&
                            !this.state.posterSection && (
                                <div
                                    className="editMapToggler"
                                    onClick={() => this.mapToggler()}
                                >
                                    {!this.state.map && "Get Coordinates"}
                                    {this.state.map && "Close Map"}
                                </div>
                            )}
                        {!this.state.map && !this.state.deleteSuccess && (
                            <div className="posterEditBox">
                                <div className="inputBack">
                                    <span>Poster</span>
                                    <input
                                        value={
                                            this.state.selectedGig.poster ||
                                            this.state.poster ||
                                            this.state.selectedPoster ||
                                            ""
                                        }
                                        autoComplete="none"
                                        name="poster"
                                        placeholder="Poster"
                                        onChange={(e) => this.handleChange(e)}
                                        onChange={(e) => this.inputReset(e)}
                                        onClick={(e) => {
                                            this.handleErrorMsg();
                                            this.deleteWarn(false);
                                        }}
                                        onChange={(e) =>
                                            this.posterSelector(e.target.value)
                                        }
                                    />
                                </div>
                                {this.state.selectedGig.id && (
                                    <img
                                        title={
                                            (!this.state.posterSection &&
                                                "Poster Gallery") ||
                                            (this.state.posterSection &&
                                                "Close Gallery")
                                        }
                                        className="imgPreview"
                                        src={
                                            this.state.selectedPoster ||
                                            this.state.selectedGig.poster ||
                                            "na.jpg"
                                        }
                                        onClick={(e) => {
                                            this.setPosterSection();
                                            this.handleErrorMsg();
                                            this.deleteWarn(false);
                                        }}
                                    ></img>
                                )}
                                {this.state.selectedGig.id &&
                                    !this.state.deleteSuccess &&
                                    !this.state.posterSection && (
                                        <div className="fileUploader">
                                            <input
                                                type="file"
                                                name="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    this.handleUploaderChange(e)
                                                }
                                                onClick={(e) => {
                                                    this.handleErrorMsg();
                                                    this.deleteWarn(false);
                                                }}
                                            />
                                            {!this.state.success && (
                                                <div
                                                    title="Upload Poster"
                                                    className="upload"
                                                    onClick={() =>
                                                        this.handleUploaderClick()
                                                    }
                                                ></div>
                                            )}
                                            {this.state.success && (
                                                <div className="uploadSuccess"></div>
                                            )}
                                        </div>
                                    )}
                            </div>
                        )}

                        {this.state.map &&
                            this.state.selectedGig.date &&
                            !this.state.deleteSuccess && (
                                <EditMap
                                    coordinator={(e) => this.coordinator(e)}
                                    selectedGig={this.state.selectedGig}
                                />
                            )}
                        {!this.state.deleteSuccess && !this.state.map && (
                            <div className="formOptions">
                                <div
                                    className="button"
                                    onClick={() => this.handleClick()}
                                >
                                    Update
                                </div>

                                {this.state.selectedGig.date &&
                                    !this.state.map &&
                                    !this.state.posterSection && (
                                        <div
                                            className="delete"
                                            onClick={(e) =>
                                                this.deleteWarn(true)
                                            }
                                        >
                                            Delete
                                        </div>
                                    )}

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
                            </div>
                        )}
                    </form>

                    {!this.state.map && !this.state.posterSection && (
                        <Link to="/" className="backLink">
                            Back
                        </Link>
                    )}
                    {this.state.posterSection && (
                        <a
                            className="backLink"
                            onClick={() => {
                                this.setPosterSection();
                            }}
                        >
                            Back{" "}
                        </a>
                    )}
                    {this.state.map && (
                        <a
                            className="backLink"
                            onClick={() => {
                                this.mapToggler();
                            }}
                        >
                            Back{" "}
                        </a>
                    )}
                </div>
                {this.state.deleteSuccess && (
                    <div className="deleteSuccess"></div>
                )}
                {this.state.error && (
                    <p className="error">
                        {!this.state.selectedGig &&
                            "Select A Gig From The List"}{" "}
                        {this.state.selectedGig &&
                            "Be Sure That Date, Longitude & Latitude are Filled."}
                    </p>
                )}
                {this.state.error2 && (
                    <p className="error">Select an Image [Max Size: 2MB]</p>
                )}
            </div>
        );
    }
}
