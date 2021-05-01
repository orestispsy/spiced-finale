import { Link } from "react-router-dom";
import React from "react";
import axios from "./tools/axios";

export default class GigCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            success: false
            
        };
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
            },
            // () => console.log("State after setState: ", this.state)
        );
    }

    handleErrorMsg(e) {
        this.setState({
            error: false,
        });
    }

    render() {
        return (
            <div className="gigCreatorContainer">
                <form>
                    <h1>Add Gig</h1>
                    <div className="inputBack">
                        <span>Date*</span>
                        <input
                            autoComplete="none"
                            name="date"
                            placeholder="date"
                            type="date"
                            onChange={(e) => this.handleChange(e)}
                            onClick={() => this.handleErrorMsg()}
                        />
                    </div>
                    <div className="inputBack">
                        <span>City</span>
                        <input
                            autoComplete="none"
                            name="city"
                            placeholder="City"
                            onChange={(e) => this.handleChange(e)}
                            onClick={() => this.handleErrorMsg()}
                        />
                    </div>
                    <div className="inputBack">
                        <span>Tour</span>
                        <input
                            autoComplete="none"
                            name="tour_name"
                            placeholder="Tour Name"
                            onChange={(e) => this.handleChange(e)}
                            onClick={() => this.handleErrorMsg()}
                        />
                    </div>
                    <div className="inputBack">
                        <span>Venue</span>
                        <input
                            autoComplete="none"
                            name="venue"
                            placeholder="Venue"
                            onChange={(e) => this.handleChange(e)}
                            onClick={() => this.handleErrorMsg()}
                        />
                    </div>
                    <div className="inputBack">
                        <span>Latitude*</span>
                        <input
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
                            autoComplete="none"
                            name="lng"
                            placeholder="Longitude"
                            onChange={(e) => this.handleChange(e)}
                            onClick={() => this.handleErrorMsg()}
                        />
                    </div>
                    <div className="formOptions">
                        {!this.state.success && (
                            <button
                                onClick={() => {
                                    this.handleClick();
                                }}
                            >
                                Submit
                            </button>
                        )}

                        {this.state.success && (
                            <div className="uploadSuccess"></div>
                        )}
                    </div>
                    {!this.state.success && (
                        <div className="inputBack">
                            <p className="required">*required</p>
                        </div>
                    )}
                </form>
                {this.state.error && (
                    <p className="error">Oups! Something Went Wrong.</p>
                )}
                <Link to="/" className="backLink">
                    Back
                </Link>
            </div>
        );
    }
}
