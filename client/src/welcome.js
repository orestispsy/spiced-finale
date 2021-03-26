import { HashRouter, Route } from "react-router-dom";

import Registration from "./registration";

import Login from "./login";


export default function Welcome() {
    return (
        <div>
        HELLO
            <h1 className="welcomeContainer">
                <div className="logo"></div>
                1000mods
                <span>gig guide</span>
            </h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
