import { Link } from "react-router-dom";
import React from "react";
import axios from "./tools/axios";

export default class GigEditor extends React.Component {
    constructor(props) {
        console.log("PROPS IN EDITOR", props);
        super(props);
        this.state = {
            error: false,
            selectedGig: "",
        };
    }

    handleClick() {
        axios
            .post("/gig-update", this.state)
            .then(({ data }) => {
                console.log("DATA", data.data);
                if (data.data) {
                    location.replace("/");
                } else {
                    console.log("data fail");
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
            () => console.log("State after setState: ", this.state)
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
            () => console.log("State after setState: ", this.state)
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
            () => console.log("STEEEEEIT: ", this.state)
        );
    }

    gigSelector(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => {
                console.log("State after setState: ", this.state);
                axios
                    .post("/get-gig-to-edit", this.state)
                    .then(({ data }) => {
                        this.setState({
                            selectedGig: data.data,
                        });
                        console.log("selected Gig", this.state.selectedGig);
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
                console.log("got it", data);
            })
            .catch((err) => {
                console.log("err in axios App User POST Request : ", err);
            });
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
                    <select
                        name="selectedGig"
                        className="selectGig"
                        onChange={(e) => this.gigSelector(e)}
                        onClick={() => this.inputsReset()}
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
                    />

                    {this.state.error && (
                        <p className="error">Oups! Something Went Wrong.</p>
                    )}
                    <button onClick={() => this.handleClick()}>Submit</button>
                    <button onClick={() => this.gigDelete()}>Delete</button>
                </form>
                <Link to="/" className="backLink">
                    Back
                </Link>
            </div>
        );
    }
}
