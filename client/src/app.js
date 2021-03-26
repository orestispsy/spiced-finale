import { Component } from "react";
import axios from "./tools/axios";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Main from "./main";
import Map from "./map";

const location = [
    {
        id: 1,
        address: "",
        lat: 52.479409311044535,
        lng: 13.443859511278864,
    },
    {
        id: 2,
        address: "",
        lat: 36.91033232808084,
        lng: 21.69713399942608,
    },
];

const center = {
    id: 1,
    address: "",
    lat: 35.15941671007103,
    lng: -40.37015727806882,
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentDidMount() {
    //     axios
    //         .get("/user-details")
    //         .then(({ data }) => {
    //             if (data) {
    //                 console.log("data in APP", data)
    //                 this.setState({
    //                     nickname: data.data.nickname,

    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("err in axios App User POST Request : ", err);
    //         });
    // }

    render() {
        return (
            <BrowserRouter>
                <div className="appContainer">
                    <Route
                        exact
                        path="/"
                        render={(props) => (
                            <Map
                                location={location}
                                zoomLevel={0}
                                center={center}
                                // nickname={this.state.nickname}
                            />
                        )}
                    />
                </div>
            </BrowserRouter>
        );
    }
}
