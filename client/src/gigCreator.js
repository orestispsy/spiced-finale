import { Link } from "react-router-dom";
import React from "react";
import axios from "./tools/axios";



export default class GigCreator extends React.Component {
    constructor(props) {
         console.log("PROOOOOOOPS",props);
        super(props);
        this.state = {
            error: false,
        };
    }

   

    handleClick() {
        axios
            .post("/gig-creator", this.state)
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

    handleErrorMsg(e) {
        this.setState({
            error: false,
        });
    }

    render() {
        return (
            <div className="gigCreatorContainer">
                <form>
                    <h1>Gig Creator</h1>
                    <span>Date</span>
                    <input
                        autoComplete="none"
                        name="date"
                        placeholder="date"
                        type="date"
                        onChange={(e) => this.handleChange(e)}
                        onClick={() => this.handleErrorMsg()}
                    />
                    <span>Venue</span>
                    <input
                        autoComplete="none"
                        name="venue"
                        placeholder="Venue"
                        onChange={(e) => this.handleChange(e)}
                        onClick={() => this.handleErrorMsg()}
                    />
                    <span>Latitude</span>
                    <input
                        autoComplete="none"
                        name="lat"
                        placeholder="Latitude"
                        onChange={(e) => this.handleChange(e)}
                        onClick={() => this.handleErrorMsg()}
                    />
                    <span>Longitude</span>
                    <input
                        autoComplete="none"
                        name="lng"
                        placeholder="Longitude"
                        onChange={(e) => this.handleChange(e)}
                        onClick={() => this.handleErrorMsg()}
                    />
                    <span>Tour</span>
                    <input
                        autoComplete="none"
                        name="tour_name"
                        placeholder="Tour Name"
                        onChange={(e) => this.handleChange(e)}
                        onClick={() => this.handleErrorMsg()}
                    />

                    {this.state.error && (
                        <p className="error">Oups! Something Went Wrong.</p>
                    )}
                    <button onClick={() => this.handleClick()}>Submit</button>
                </form>
            </div>
        );
    }
}
