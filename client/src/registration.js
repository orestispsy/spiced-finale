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
            }
            // () => console.log("State after setState: ", this.state)
        );
    }

    handleErrorMsg(e) {
        this.setState({
            error: false,
        });
    }

    submitEnter(e) {
        if (e.keyCode === 13) {
            this.handleClick();
        }
    }

    render() {
        return (
            <div
                className="registerContainer"
                onKeyDown={(e) => this.submitEnter(e)}
            >
                <div className="logoBack">
                    <p id="logoIntro">WELCOME</p>
                </div>
                <h1>Register</h1>
                <span>Nickname</span>
                <input
                    autoComplete="none"
                    name="nickname"
                    placeholder="Nickname"
                    onChange={(e) => this.handleChange(e)}
                    onClick={() => this.handleErrorMsg()}
                />
                <span>Password</span>
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                    onClick={() => this.handleErrorMsg()}
                />

                <div className="button" onClick={() => this.handleClick()}>
                    Submit
                </div>
                <span className="regSpan">Joined Already?</span>
                <Link to="/" className="links">
                    Login
                </Link>
                {this.state.error && (
                    <p className="error">
                        {"Insert A Nickname And A Password to Proceed"}
                    </p>
                )}
            </div>
        );
    }
}
