import { Component } from "react";
import axios from "./tools/axios";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Main from "./main";
import MyMap from "./map";
import GigCreator from "./gigCreator";
import GigEditor from "./gigEditor";
import GigList from "./gigList";
import Chat from "./chat";
import GigListAnimation from "./gigListAnimation";
import GigEntry from "./gigEntry";
import SuperAdmin from "./superAdmin";

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
            selectedGigEntry: false,
            guest: false,
            listScroller: false,
            darkMode: true,
        };
    }

    componentDidMount() {
        this.mapVisible(false);
        axios
            .get("/user-details")
            .then(({ data }) => {
                if (!data.data) {
                    location.replace("/");
                }
                this.setState({
                    id: data.data.id,
                    nickname: data.data.nickname,
                    admin: data.data.admin,
                    super_admin: data.data.super_admin,
                    chat_img: data.data.chat_img,
                    chat_color: data.data.chat_color,
                });
                if (data.data.nickname) {
                    if (data.data.nickname.includes("Guest"))
                        this.setState({
                            guest: true,
                            admin: false,
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
            })
            .catch((err) => {
                console.log("err in axios App User POST Request : ", err);
            });
    }

    mapVisible(e) {
        this.setState({
            maps: e,
        });
    }

    setGigEntry(e) {
        this.setState({
            selectedGigEntry: e,
        });
    }

    setProfileImage(e) {
        this.setState({
            chat_img: e,
        });
    }

    listSet(e) {
        this.setState({
            list: e,
        });
    }

    setListScroller(e) {
        this.setState({
            listScroller: e,
        });
    }

    setNickname(e) {
        this.setState({
            nickname: e,
        });
    }

    setAdmin(e) {
        this.setState({
            admin: e,
        });
    }

    setDarkMode(e) {
        this.setState({
            darkMode: e,
        });
    }

    // sliderAction(e) {
    //     e.preventDefault();
    //     this.setState({
    //         move: true,
    //         sliderWidth: e.target.clientWidth,
    //     });
    // }

    // sliderStop() {
    //     this.setState({
    //         move: false,
    //     });
    // }

    // hideSlider() {
    //     this.setState({
    //         sliderHidden: true,
    //     });
    // }

    // handleMouseMove(e) {
    //     if (
    //         this.state.move &&
    //         e.clientX >= body[0].offsetWidth - this.state.sliderWidth / 8
    //     ) {
    //         this.setState({
    //             move: false,
    //             left: body[0].offsetWidth,
    //         });
    //     }

    //     if (e.clientX == 0) {
    //         this.setState({
    //             sliderHidden: true,
    //         });
    //     } else {
    //         this.setState({
    //             sliderHidden: false,
    //         });
    //     }

    //     if (this.state.move) {
    //         this.setState({
    //             left: e.clientX,
    //         });
    //     }
    // }

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
                                (this.state.maps && "appContainerMap") ||
                                (this.state.list && "appContainerList") ||
                                (this.state.darkMode && "appContainerDark") ||
                                (!this.state.list && "appContainer")
                            }
                        >
                            <div className="appBar">
                                <div className="barLeftSection">
                                    <Link to="/chat">
                                        <img
                                            src={
                                                this.state.chat_img ||
                                                "./../avatar.png"
                                            }
                                            className="barProfileImage"
                                        ></img>
                                    </Link>
                                    {!this.state.maps && (
                                        <Link to="/chat">
                                            <div
                                                title="Chat Room"
                                                className="chatBar"
                                            ></div>
                                        </Link>
                                    )}
                                    <div className="barProfile">
                                        {!this.state.maps &&
                                            this.state.nickname}
                                    </div>
                                </div>
                                {this.state.maps && (
                                    <a
                                        target="_blank"
                                        href="https://www.1000mods.com"
                                    >
                                        <div className="logo2Back">
                                            <div className="logo2"></div>
                                        </div>
                                    </a>
                                )}

                                {this.state.maps && (
                                    <Link
                                        to="/"
                                        className="barMainLink"
                                        title="Back"
                                        onClick={(e) => {
                                            this.setGigEntry(false);
                                            this.mapVisible(false);
                                        }}
                                    ></Link>
                                )}
                            </div>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <Main
                                        super_admin={this.state.super_admin}
                                        admin={this.state.admin}
                                        listSet={(e) => this.listSet(e)}
                                        visitors={this.state.visitors}
                                        guest={this.state.guest}
                                        darkMode={this.state.darkMode}
                                        listSet={(e) => this.listSet(e)}
                                        list={this.state.list}
                                        setDarkMode={(e) => this.setDarkMode(e)}
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
                                    <GigEditor
                                        gigsList={this.state.gigsList}
                                        admin={this.state.admin}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/map"
                                render={(props) => (
                                    <MyMap
                                        gigsList={this.state.gigsList}
                                        mapVisible={(e) => this.mapVisible(e)}
                                        selectedGigEntry={
                                            this.state.selectedGigEntry
                                        }
                                        setGigEntry={(e) => this.setGigEntry(e)}
                                        guest={this.state.guest}
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
                                        setListScroller={(e) =>
                                            this.setListScroller(e)
                                        }
                                        listScroller={this.state.listScroller}
                                    />
                                )}
                            />

                            <Route
                                path="/api/gig/:id"
                                render={(props) => (
                                    <GigEntry
                                        match={props.match}
                                        gigsList={this.state.gigsList}
                                        myUserId={this.state.id}
                                        super_admin={this.state.super_admin}
                                        nickname={this.state.nickname}
                                        listSet={(e) => this.listSet(e)}
                                        history={props.history}
                                        setGigEntry={(e) => this.setGigEntry(e)}
                                        selectedGigEntry={
                                            this.state.selectedGigEntry
                                        }
                                        guest={this.state.guest}
                                    />
                                )}
                            />

                            <Route
                                exact
                                path="/gig-list-animation"
                                render={(props) => (
                                    <GigListAnimation
                                        gigsList={this.state.gigsList}
                                        listSet={(e) => this.listSet(e)}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/chat"
                                render={(props) => (
                                    <Chat
                                        chat_img={this.state.chat_img}
                                        chat_myUserId={this.state.id}
                                        chat_color={this.state.chat_color}
                                        admin={this.state.admin}
                                        setAdmin={(e) => this.setAdmin(e)}
                                        super_admin={this.state.super_admin}
                                        setProfileImage={(e) =>
                                            this.setProfileImage(e)
                                        }
                                        nickname={this.state.nickname}
                                        guest={this.state.guest}
                                        setNickname={(e) => this.setNickname(e)}
                                        darkMode={this.state.darkMode}
                                        listSet={(e) => this.listSet(e)}
                                        list={this.state.list}
                                        setDarkMode={(e) => this.setDarkMode(e)}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/super-admin"
                                render={(props) => (
                                    <SuperAdmin
                                        super_admin={this.state.super_admin}
                                        chat_myUserId={this.state.id}
                                        listSet={(e) => this.listSet(e)}
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
