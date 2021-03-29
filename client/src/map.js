import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";
import mapStyles from "./tools/mapStyles";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useSupercluster from "use-supercluster";

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("../../secrets.json");
}

export default function MyMap({ gigsList, mapVisible }) {
    console.log("giglist", gigsList);
    const mapRef = useRef();
    useEffect(function () {
        mapVisible();
        console.log(gigsList);
    }, []);

    const [selectedGig, setSelectedGig] = useState(null);
    const [zoom, setZoom] = useState(5);
    const [bounds, setBounds] = useState(null);

    if (gigsList) {
        var points = gigsList.map((gig) => ({
            type: "Feature",
            properties: {
                cluster: false,
                gigId: gig.id,
                category: " Live-Gigs",
            },
            geometry: {
                type: "Point",
                coordinates: [parseFloat(gig.lng), parseFloat(gig.lat)],
            },
        }));
    }

    if (!points) {
        points = [];
    }

    const { clusters } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 80, maxZoom: 20 },
    });

    console.log("clusters", clusters);

    function Map() {
        return (
            <GoogleMap
                zoom={3}
                center={{
                    lat: 35.15941671007103,
                    lng: -40.37015727806882,
                }}
                options={{
                    styles: mapStyles.modest,
                    disableDefaultUI: true,
                    zoomControl: true,
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => {
                    mapRef.current = map;
                }}
                onChange={({ zoom, bounds }) => {
                    setZoom(zoom);
                    setBounds([
                        bounds.nw.lng,
                        bounds.se.lat,
                        bounds.se.lng,
                        bounds.nw.lat,
                    ]);
                }}
            >
                {gigsList &&
                    gigsList.map((gig) => (
                        <Marker
                            key={gig.id}
                            position={{
                                lat: parseFloat(gig.lat),
                                lng: parseFloat(gig.lng),
                            }}
                            icon={{
                                url: "greendot.gif",
                                scaledSize: new window.google.maps.Size(50, 25),
                            }}
                            onClick={() => {
                                setSelectedGig(gig);
                            }}
                        />
                    ))}
                {selectedGig && (
                    <InfoWindow
                        position={{
                            lat: parseFloat(selectedGig.lat),
                            lng: parseFloat(selectedGig.lng),
                            disableAutoPan: true,
                        }}
                        onCloseClick={() => {
                            setSelectedGig(null);
                        }}
                    >
                        <div>
                            {selectedGig.date}
                            <div>{selectedGig.venue}</div>
                            <div>{selectedGig.tour_name}</div>
                            <div>{selectedGig.city}</div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        );
    }

    const WrappedMap = withScriptjs(withGoogleMap(Map));

    return (
        <div className="google-map">
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${secrets.key}`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
            />
        </div>
    );
}
