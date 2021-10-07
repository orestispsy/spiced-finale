import { Link } from "react-router-dom";
import React from "react";
import axios from "./tools/axios";

import EditMap from "./editMap";

export default class GigCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            success: false,
            map: false,
        };
    }

    componentWilldMount() {
        if (!this.props.admin) {
            location.replace("/");
        }
    }

    handleClick() {
        axios
            .post("/gig-creator", this.state)
            .then(({ data }) => {
                // console.log("DATA", data.data);
                if (data.success) {
                    this.setState({
                        success: true,
                    });
                    location.replace("/");
                } else {
                    // console.log("data fail");
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios POST /gig-creator: ", err);
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

    handleErrorMsg(e) {
        this.setState({
            error: false,
        });
    }

    coordinator(e) {
        this.setState({
            lng: parseFloat(e.latLng.lng()),
            lat: parseFloat(e.latLng.lat()),
        });
    }

    mapToggler() {
        this.setState({
            map: !this.state.map,
        });
    }

    render() {
        return (
            <div className="gigCreatorContainer">
                <div
                    className="gigCreatorContainerInner"
                    id={this.props.darkMode && "logoBoxDarkEdit"}
                >
                    <div id="creatorCloseTab">
                        <Link to="/" className="buttonBack">
                            X
                        </Link>
                    </div>
                    <form>
                        <h1>Add Gig</h1>

                        {!this.state.map && (
                            <div className="inputBack">
                                <span>Date*</span>
                                <input
                                    value={this.state.date || ""}
                                    autoComplete="none"
                                    name="date"
                                    placeholder="date"
                                    type="date"
                                    onChange={(e) => this.handleChange(e)}
                                    onClick={() => this.handleErrorMsg()}
                                />
                            </div>
                        )}
                        {!this.state.map && (
                            <div className="inputBack">
                                <span>City</span>
                                <input
                                    value={this.state.city || ""}
                                    autoComplete="none"
                                    name="city"
                                    placeholder="City"
                                    onChange={(e) => this.handleChange(e)}
                                    onClick={() => this.handleErrorMsg()}
                                />
                            </div>
                        )}
                        {!this.state.map && (
                            <div className="inputBack">
                                <span>Tour</span>
                                <input
                                    value={this.state.tour_name || ""}
                                    autoComplete="none"
                                    name="tour_name"
                                    placeholder="Tour Name"
                                    onChange={(e) => this.handleChange(e)}
                                    onClick={() => this.handleErrorMsg()}
                                />
                            </div>
                        )}
                        {!this.state.map && (
                            <div className="inputBack">
                                <span>Venue</span>
                                <input
                                    value={this.state.venue || ""}
                                    autoComplete="none"
                                    name="venue"
                                    placeholder="Venue"
                                    onChange={(e) => this.handleChange(e)}
                                    onClick={() => this.handleErrorMsg()}
                                />
                            </div>
                        )}
                        <div className="inputBack">
                            <span>Latitude*</span>
                            <input
                                value={this.state.lat || ""}
                                autoComplete="none"
                                name="lat"
                                placeholder="Latitude"
                                onChange={(e) => this.handleChange(e)}
                                onClick={() => this.handleErrorMsg()}
                            />
                        </div>

                        <div className="inputBack">
                            <span>Longitude*</span>
                            <input
                                value={this.state.lng || ""}
                                autoComplete="none"
                                name="lng"
                                placeholder="Longitude"
                                onChange={(e) => this.handleChange(e)}
                                onClick={() => this.handleErrorMsg()}
                            />
                        </div>

                        <div
                            className="editMapToggler"
                            onClick={() => this.mapToggler()}
                        >
                            {!this.state.map && "Get Coordinates"}
                            {this.state.map && "Close Map"}
                        </div>
                        {this.state.map && (
                            <EditMap coordinator={(e) => this.coordinator(e)} />
                        )}
                        <div className="formOptions">
                            {!this.state.success && !this.state.map && (
                                <div
                                    className="button"
                                    onClick={() => {
                                        this.handleClick();
                                    }}
                                >
                                    Submit
                                </div>
                            )}

                            {this.state.success && (
                                <div className="uploadSuccess"></div>
                            )}
                        </div>
                        {!this.state.success &&
                            !this.state.error &&
                            !this.state.map && (
                                <p className="required">*required</p>
                            )}
                        {this.state.error && (
                            <p className="error">
                                {
                                    "Date, Latitude & Longitude Fields Are Required"
                                }
                            </p>
                        )}
                    </form>
                </div>
            </div>
        );
    }
}
