import { Component } from "react";
import axios from "./tools/axios";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Main from "./main";
import Map from "./map";
import GigCreator from "./gigCreator";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get("/user-details")
            .then(({ data }) => {
                if (data) {
                    console.log("Current User's data in APP", data);
                    this.setState({
                        nickname: data.data.nickname,
                        admin: data.data.admin
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios App User POST Request : ", err);
            });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="appContainer">
                    <div className="appBar">
                        <div className="barProfile">{this.state.nickname}</div>
                        <Link to="/" className="barMainLink"></Link>
                    </div>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Main admin={this.state.admin} />}
                    />
                    <Route
                        exact
                        path="/gig-creator"
                        render={(props) => (
                            <GigCreator admin={this.state.admin} />
                        )}
                    />
                    <Route exact path="/map" render={(props) => <Map />} />
                </div>
            </BrowserRouter>
        );
    }
}
