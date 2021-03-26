import { HashRouter, Route } from "react-router-dom";

import Registration from "./registration";

import Login from "./login";

export default function Welcome() {
    return (
        <div className="welcomeContainer">
            <h1>1000mods </h1>
            <h2>gig guide</h2>

            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
