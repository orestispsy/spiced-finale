import React from "react";
import axios from "./tools/axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleClick() {
        axios
            .post("/register", this.state)
            .then(({ data }) => {
                // console.log("DATA", data.data);
                if (data.data) {
                    location.replace("/");
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
                console.log("err in axios POST /registration: ", err);
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
            <div className="registerContainer">
                <h1>Register</h1>
                <span>Enter a Nickname</span>
                <input
                    autoComplete="none"
                    name="nickname"
                    placeholder="Nickname"
                    onChange={(e) => this.handleChange(e)}
                    onClick={() => this.handleErrorMsg()}
                />
                <span>Give a Password</span>
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                    onClick={() => this.handleErrorMsg()}
                />
                {this.state.error && (
                    <p className="error">Oups! Something Went Wrong.</p>
                )}
                <button onClick={() => this.handleClick()}>Submit</button>
                <span className="regSpan">
                    Joined Already?
                    <Link to="/login" className="links">
                         Login
                    </Link>
                </span>
            </div>
        );
    }
}
