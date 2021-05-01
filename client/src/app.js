import { Component } from "react";
import axios from "./tools/axios";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Main from "./main";
import MyMap from "./map";
import GigCreator from "./gigCreator";
import GigEditor from "./gigEditor";
import GigList from "./gigList";
import Chat from "./chat";

var body = document.querySelectorAll("body");

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maps: false,
            list: false,
            visitors: false,
            chat_img: false,
            chat_color: false,
            left: body[0].offsetWidth,
            sliderWidth: 0,
            move: false,
            sliderHidden: false,
        };
    }

    componentDidMount() {
        axios
            .get("/user-details")
            .then(({ data }) => {
                if (data) {
                    // console.log("Current User's data in APP", data);
                    this.setState({
                        id: data.data.id,
                        nickname: data.data.nickname,
                        admin: data.data.admin,
                        chat_img: data.data.chat_img,
                        chat_color: data.data.chat_color,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios App User POST Request : ", err);
            });
        axios
            .get("/get-gigs")
            .then(({ data }) => {
                this.setState({
                    gigsList: data.data,
                });
                // console.log("APP GIGS List", this.state.gigsList);
            })
            .catch((err) => {
                console.log("err in axios App User POST Request : ", err);
            });
        axios
            .get("/counter")
            .then(({ data }) => {
                this.setState({
                    visitors: data.data,
                });
                // console.log("APP GIGS List", this.state.gigsList);
            })
            .catch((err) => {
                console.log("err in axios App User POST Request : ", err);
            });
    }

    mapVisible() {
        this.setState({
            maps: !this.state.maps,
        });
    }

    listSet(e) {
        this.setState({
            list: e,
        });
    }

    sliderAction(e) {
        e.preventDefault();
        this.setState({
            move: true,
            sliderWidth: e.target.clientWidth,
        });
    }

    sliderStop() {
        this.setState({
            move: false,
        });
    }

    hideSlider() {
         this.setState({
             sliderHidden:true
         });
    }

    handleMouseMove(e) {
        if (this.state.move && e.clientX >= body[0].offsetWidth - this.state.sliderWidth / 8) {
            this.setState({
                move: false,
                left: body[0].offsetWidth,
            });
        }

        if (e.clientX == 0) {
             this.setState({
                 sliderHidden: true,
             });
        } else {
            this.setState({
                sliderHidden: false,
            });
        }

        if (this.state.move) {
            this.setState({
                left: e.clientX,
            });
        }
    }
 
    logOut() {
        axios
            .get("/logout")
            .then(() => {
                location.replace("/");
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
                console.log("error", err);
            });
    }

    render() {
        return (
            <BrowserRouter>
                <div
                    // onMouseMove={(e) => this.handleMouseMove(e)}
                    // onMouseUp={() => this.sliderStop()}
                    // onTouchEnd={() => this.sliderStop()}
                >
                    <div className="introPreCover">
                        <div
                            className={
                                (this.state.list && "appContainerList") ||
                                (!this.state.maps && "appContainer") ||
                                (this.state.maps && "appContainerMap")
                            }
                        >
                            <div className="appBar">
                                <div className="barLeftSection">
                                    <div className="barProfile">
                                        {this.state.nickname}
                                    </div>
                                    {!this.state.maps && (
                                        <Link to="/chat">
                                            <div className="chatBar"></div>
                                        </Link>
                                    )}
                                </div>
                                <a
                                    target="_blank"
                                    href="https://www.1000mods.com"
                                >
                                    <div className="logo2Back">
                                        <div className="logo2"></div>
                                    </div>
                                </a>
                                <div
                                    className="logout"
                                    onClick={() => this.logOut()}
                                >
                                    LogOut
                                </div>
                                {this.state.maps && (
                                    <Link
                                        to="/"
                                        className="barMainLink"
                                        onClick={() => this.mapVisible()}
                                    ></Link>
                                )}
                            </div>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <Main
                                        admin={this.state.admin}
                                        listSet={(e) => this.listSet(e)}
                                        visitors={this.state.visitors}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/gig-creator"
                                render={(props) => (
                                    <GigCreator admin={this.state.admin} />
                                )}
                            />
                            <Route
                                exact
                                path="/gig-editor"
                                render={(props) => (
                                    <GigEditor gigsList={this.state.gigsList} />
                                )}
                            />
                            <Route
                                exact
                                path="/map"
                                render={(props) => (
                                    <MyMap
                                        gigsList={this.state.gigsList}
                                        mapVisible={() => this.mapVisible()}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/gig-list"
                                render={(props) => (
                                    <GigList
                                        gigsList={this.state.gigsList}
                                        listSet={(e) => this.listSet(e)}
                                    />
                                )}
                            />
                            <Route
                                path="/chat"
                                render={(props) => (
                                    <Chat
                                        chat_img={this.state.chat_img}
                                        chat_myUserId={this.state.id}
                                        chat_color={this.state.chat_color}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    {/* {!this.state.sliderHidden && (
                        <div
                            className="introCover"
                            style={{
                                width: this.state.left + "px",
                            }}
                        >
                            <div
                                className="intro"
                                style={{
                                    width: this.state.left + "px",
                                }}
                            >
                                Welcome
                                <span>
                                    Hover on the right to find the "slider" and
                                    then move it horizontally to see behind the
                                    void.
                                </span>
                            </div>
                        </div>
                    )}
                    <div
                        style={{
                            left:
                                this.state.left - this.state.sliderWidth + "px",
                        }}
                        className="slider"
                        onMouseDown={(e) => this.sliderAction(e)}
                        onTouchMove={(e) => this.sliderAction(e)}
                    ></div> */}
                </div>
            </BrowserRouter>
        );
    }
}
