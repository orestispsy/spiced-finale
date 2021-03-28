import { Link } from "react-router-dom";

export default function Main({ admin}) {
    return (
        <div className="mainContainer">
            <div className="logoBack">
                <div className="logo"></div>
                <p>GIG GUIDE</p>
            </div>
            <div className="mainMenu">
                <Link to="/map"> Gig Map</Link>
                {admin && <Link to="/gig-creator"> Gig Creator</Link>}
            </div>
        </div>
    );
}
