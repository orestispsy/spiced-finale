import React from "react";
import axios from "./tools/axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleClick(e) {
        if (e) {
            axios
                .post("/register", {
                    nickname: "Guest" + Math.floor(Math.random() * 1000),
                    password: "1kggguest",
                })
                .then(({ data }) => {
                    if (data.data) {
                        location.replace("/");
                    } else {
                        this.setState({
                            error: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log("err in axios POST /login: ", err);
                });
        } else {
            axios
                .post("/login", this.state)
                .then(({ data }) => {
                    if (data.data) {
                        location.replace("/");
                    } else {
                        this.setState({
                            error: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log("err in axios POST /login: ", err);
                });
        }
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            }
            // () => console.log("this.state after setState: ", this.state)
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
                className="loginContainer"
                onKeyDown={(e) => this.submitEnter(e)}
            >
                <div className="logoBack">
                    <p id="logoIntro">WELCOME</p>
                </div>
                <h1>Login</h1>
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

                <div id="button" className="mainMenuLink" onClick={() => this.handleClick()}>
                    Submit
                </div>
                <span className="regSpan">Not a Member?</span>
                <div className="mainMenuBottom">
                    <Link to="/register" className="links">
                        Register
                    </Link>
           
                    <div
                        onClick={(e) => this.handleClick(true)}
                        className="guest"
                    >
                        Join as Guest
                    </div>
                </div>
                {this.state.error && (
                    <p className="error">
                        {" "}
                        {"Oups ! Your Nickname or Password is Wrong"}
                    </p>
                )}
            </div>
        );
    }
}
