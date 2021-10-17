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
            error2: false,
            delete: false,
            selectedGig: "",
            success: false,
            deleteSuccess: false,
            file: false,
            map: false,
            selectedPoster: "",
            posterSection: false,
            doneUpdate: false,
            updatedPoster: false,
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
                if (data.data) {
                    this.updateDatabase();
                    this.setDoneUpdate(true);
                } else {
                    this.setState({
                        error: true,
                        file: null,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios POST /gig-editor: ", err);
            });
    }

    handleUploaderClick() {
        this.handleUploaderSuccess(true);
        const formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("data", JSON.stringify(this.state.selectedGig));
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        selectedPoster: data.data[0].poster,
                        selectedGig: {
                            ...this.state.selectedGig,
                            poster: data.data[0].poster,
                        },
                    });
                    this.updateDatabase();
                    this.setDoneUpdate(true);
                    this.handleUploaderSuccess(false);
                } else {
                    this.setState({
                        error2: true,
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    error2: true,
                    success: false,
                });
            });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleUploaderChange(e) {
        this.setState({
            file: e.target.files[0],
        });
    }

    inputsReset() {
        this.setState({
            date: "",
            venue: "",
            lat: "",
            lng: "",
            tour_name: "",
            city: "",
            poster: "",
            selectedPoster: "",
        });
    }

    inputReset(e) {
        this.setState({
            selectedGig: {
                ...this.state.selectedGig,
                [e.target.name]: e.target.value,
            },
        });
    }

    gigSelector(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => {
                axios
                    .post("/get-gig-to-edit", this.state)
                    .then(({ data }) => {
                        if (data.data) {
                            this.setState({
                                selectedGig: data.data,
                            });
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

    setDoneUpdate(e) {
        this.setState({
            doneUpdate: e,
        });
    }

    gigDelete() {
        this.setState({
            deleteSuccess: true,
            delete: false,
        });
        axios
            .post("/gig-delete", this.state)
            .then(({ data }) => {
                if (data.deleteSuccess) {
                    this.updateDatabase();
                    this.setState({
                        selectedGig: false,
                    });

                    const timer = setTimeout(() => {
                        this.setState({
                            deleteSuccess: false,
                        });
                    }, 2000);
                    return () => clearTimeout(timer);
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
            error2: false,
        });
    }

    handleUploaderSuccess(e) {
        this.setState({
            success: e,
        });
    }

    updateDatabase() {
        axios
            .get("/get-gigs")
            .then(({ data }) => {
                this.props.setGigsList(data.data.reverse());
            })
            .catch((err) => {
                console.log("err in axios App User POST Request : ", err);
            });
    }

    render() {
        return (
            <div className="gigEditorContainer">
                <div
                    className="gigEditorContainerInner"
                    id={this.props.darkMode && "logoBoxDarkEdit"}
                >
                    <form>
                        {!this.state.posterSection && !this.state.map && (
                            <div id="editorCloseTab">
                                <Link to="/" className="buttonBack">
                                    X
                                </Link>
                            </div>
                        )}
                        {this.state.posterSection && (
                            <div
                                title="Back"
                                id="editorCloseTab"
                                onClick={(e) => {
                                    this.setPosterSection(false);
                                }}
                            >
                                <div className="buttonBack">X</div>
                            </div>
                        )}
                        {!this.state.posterSection && this.state.map && (
                            <div
                                title="Back"
                                id="editorCloseTab"
                                onClick={(e) => {
                                    this.mapToggler();
                                }}
                            >
                                <div className="buttonBack">X</div>
                            </div>
                        )}
                        <select
                            size="1"
                            name="selectedGig"
                            className="selectGig"
                            onChange={(e) => this.gigSelector(e)}
                            onClick={() => this.inputsReset()}
                            onClick={(e) => {
                                this.handleErrorMsg();
                                this.deleteWarn(false);
                                this.setDoneUpdate(false);
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
                        </select>{" "}
                        {this.state.posterSection && (
                            <Posters
                                posterSelector={(e) => this.posterSelector(e)}
                            />
                        )}
                        {!this.state.map && !this.state.posterSection && (
                            <div className="gigMainDetails">
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
                                            this.setDoneUpdate(false);
                                        }}
                                    />
                                </div>

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
                                            this.setDoneUpdate(false);
                                        }}
                                    />
                                </div>

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
                                            this.setDoneUpdate(false);
                                        }}
                                    />
                                </div>

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
                                            this.setDoneUpdate(false);
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        {!this.state.posterSection && (
                            <div className="coordinatesEditorBox">
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
                                            this.setDoneUpdate(false);
                                        }}
                                    />
                                </div>
                                <div className="coordinatesMenuFlipper">
                                    {this.state.selectedGig &&
                                        !this.state.deleteSuccess && (
                                            <div className="coordinatesMenu">
                                                <div className="lngLtdMenu">
                                                    {!this.state.map &&
                                                        "Get ltd/lng"}{" "}
                                                    {this.state.map && "Close"}
                                                </div>

                                                <div
                                                    title="Open Map"
                                                    className="editMapTogglerGlobe"
                                                    onClick={() =>
                                                        this.mapToggler()
                                                    }
                                                ></div>
                                            </div>
                                        )}
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
                                            onChange={(e) =>
                                                this.handleChange(e)
                                            }
                                            onChange={(e) => this.inputReset(e)}
                                            onClick={(e) => {
                                                this.handleErrorMsg();
                                                this.deleteWarn(false);
                                                this.setDoneUpdate(false);
                                            }}
                                        />
                                    </div>
                                </div>
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
                                            this.setDoneUpdate(false);
                                        }}
                                        onChange={(e) =>
                                            this.posterSelector(e.target.value)
                                        }
                                    />
                                </div>
                                {this.state.selectedGig.id && (
                                    <div className="editorGallery">
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
                                                this.setDoneUpdate(false);
                                            }}
                                        ></img>
                                        {!this.state.posterSection && (
                                            <div>Poster Gallery</div>
                                        )}
                                    </div>
                                )}
                                {this.state.selectedGig.id &&
                                    !this.state.deleteSuccess &&
                                    !this.state.posterSection && (
                                        <div
                                            className="fileUploader"
                                            id="fileUploaderEdit"
                                        >
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
                                                    this.setDoneUpdate(false);
                                                }}
                                            />
                                            {!this.state.success &&
                                                !this.state.doneUpdate && (
                                                    <div
                                                        title="Upload Poster"
                                                        id="upload"
                                                        onClick={() =>
                                                            this.handleUploaderClick()
                                                        }
                                                    >
                                                        Upload
                                                    </div>
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
                        {this.state.error && (
                            <p className="error" id="errorEdit">
                                {!this.state.selectedGig &&
                                    "Select A Gig From The List"}{" "}
                                {this.state.selectedGig &&
                                    "Be Sure That Date, Longitude & Latitude are Filled."}
                            </p>
                        )}
                        {this.state.error2 && (
                            <p className="error" id="errorEdit">
                                Select an Image [Max Size: 2MB]
                            </p>
                        )}
                        {!this.state.deleteSuccess && !this.state.map && (
                            <div className="formOptions">
                                {!this.state.doneUpdate && (
                                    <div
                                        className="button"
                                        onClick={() => {
                                            if (!this.state.doneUpdate) {
                                                this.handleClick();
                                            } else {
                                                this.handleUploaderSuccess(
                                                    false
                                                );
                                                this.setDoneUpdate(false);
                                            }
                                        }}
                                    >
                                        {!this.state.doneUpdate && "Update"}
                                        {this.state.doneUpdate && "Done"}
                                    </div>
                                )}

                                {this.state.selectedGig.date &&
                                    !this.state.doneUpdate &&
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
                    {this.state.deleteSuccess && (
                        <div className="deleteSuccess"></div>
                    )}
                    {this.state.doneUpdate && (
                        <div
                            className={this.state.doneUpdate && "doneUpdate"}
                            onClick={() => {
                                this.setDoneUpdate(false);
                            }}
                        >
                            Done
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
