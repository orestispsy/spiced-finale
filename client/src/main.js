import { Link } from "react-router-dom";

export default function Main({ admin }) {
    return (
        <div className="mainContainer">
            <div className="logoBack">
                <div className="logo"></div>
                <p>GIG GUIDE</p>
            </div>
            <div className="mainMenu">
                <Link to="/map"> Map</Link>
                <Link to="/gig-list"> Gig List</Link>
                {admin && <Link to="/gig-creator"> Add Gig</Link>}
                {admin && <Link to="/gig-editor"> Edit</Link>}
            </div>
        </div>
    );
}
