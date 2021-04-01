import { Link } from "react-router-dom";

export default function Main({ admin }) {
    return (
        <div className="mainContainer">
            <div className="logoBack">
                <div className="logo"></div>
                <p>GIG GUIDE</p>
            </div>
            <div className="mainMenu">
                {!admin && <Link to="/map"> Map</Link>}
                {admin && <Link to="/gig-creator"> Add</Link>}
                {admin && (
                    <div className="easterEgg">
                        <Link to="/gig-editor"> Edit</Link>

                        <Link to="/map">
                            <img src="redBall.gif"></img>
                        </Link>
                    </div>
                )}
                <Link to="/gig-list"> Gig List</Link>
            </div>
        </div>
    );
}
