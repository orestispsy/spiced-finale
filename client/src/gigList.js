import { Link } from "react-router-dom";

export default function GigList({ gigsList }) {
    console.log("GIGSLIST IN GIGSLIST", gigsList);
    return (
        <div className="gigListContainer">
            <h1>Gig Entries</h1>
            Total: {gigsList && gigsList.length}
            {gigsList &&
                gigsList.map((gig) => (
                    <div key={gig.id}>
                        <h2>
                            {gig.date} {gig.venue}
                        </h2>
                    </div>
                ))}
            <Link to="/" className="backLink">
                Back
            </Link>
        </div>
    );
}
