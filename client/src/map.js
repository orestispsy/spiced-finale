import GoogleMapReact from "google-map-react";
import mapStyles from "./tools/mapStyles";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "./tools/axios";

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("../../secrets.json");
}

const Pin = ({ text }) => (
    <div className="pinContainer">
        <img
            src="https://support.lasers.leica-geosystems.com/lino/l2-l2G/gb/Content/Resources/Images/led_blinksgreen.gif"
            className="pin"
        ></img>
        <p className="pinText">{text}</p>
    </div>
);

export default function Map({ gigsList, mapVisible }) {

    useEffect(function () {
        mapVisible()
        console.log(gigsList)
    }, []);

    return (
        <div className="mapContainer">
            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={secrets}
                    defaultCenter={{
                        lat: 35.15941671007103,
                        lng: -40.37015727806882,
                    }}
                    defaultZoom={0}
                    options={{ styles: mapStyles.blackRed }}
                >
                    {gigsList &&
                        gigsList.map((gig) => (
                            <Pin
                                key={gig.id}
                                lat={gig.lat}
                                lng={gig.lng}
                                text={gig.venue}
                            />
                        ))}
                </GoogleMapReact>
            </div>
        </div>
    );
}
