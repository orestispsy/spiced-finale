import { Link } from "react-router-dom";

export default function Main({ admin }) {
    return (
        <div className="mainContainer">
            <div className="logoBack">
                <div className="logo"></div>
                <p>GIG GUIDE</p>
            </div>
            <div className="mainMenu">
                {admin && (
                    <div className="easterEgg">
                        <Link to="/map">
                            <img src="earth-globe.gif"></img>
                        </Link>
                    </div>
                )}
                {!admin && <Link to="/map"> Map</Link>}
                {admin && (
                    <>
                        <Link to="/gig-creator"> Add</Link>
                        <Link to="/gig-editor"> Edit</Link>
                    </>
                )}
                <Link to="/gig-list"> Gig List</Link>
            </div>
        </div>
    );
}
