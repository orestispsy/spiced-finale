import { HashRouter, Route } from "react-router-dom";

import Registration from "./registration";

import Login from "./login";

export default function Welcome() {
    return (
        <div className="welcomeContainer">
            <HashRouter>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Registration} />
                </div>
            </HashRouter>
        </div>
    );
}
