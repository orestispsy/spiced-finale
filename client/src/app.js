import { Component } from "react";
import axios from "./tools/axios";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Main from "./main"

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // // componentDidMount() {
    // //     axios
    // //         .get("/user-details")
    // //         .then(({ data }) => {
    // //             if (data) {
    // //                 console.log("data in APP")
    // //                 this.setState({
    // //                     synchIt: true,
    // //                     nickname: data.data.nickname,
                       
    // //                 });
    // //             }
    // //         })
    // //         .catch((err) => {
    // //             console.log("err in axios App User POST Request : ", err);
    // //         });
    // // }

    render() {
        return (
            <BrowserRouter>
                <div className="appContainer">
                    <Route exact path="/" render={(props) => <Main />} />
                </div>
            </BrowserRouter>
        );
    }
}
