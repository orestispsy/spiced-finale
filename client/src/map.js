import React from "react";
import { Link } from "react-router-dom";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";
import { useState, useEffect } from "react";
import mapStyles from "./tools/mapStyles";

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("../../secrets.json");
}

const WithGoogleMapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${secrets.key}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => {
    // console.log("take some props", props);

    if (props.selectedGig) {
        let propsDate = props.selectedGig.date.split("-");
        var fixedDate = propsDate[2] + "-" + propsDate[1] + "-" + propsDate[0];
        // console.log("FIXED DATE", fixedDate);
    }


    return (
        <GoogleMap
            zoom={3}
            center={props.center}
            options={{
                styles: mapStyles.modest,
                disableDefaultUI: true,
                zoomControl: true,
            }}
        >
            {props.gigsList &&
                props.gigsList.map((gig) => {
                    var dot = "greendot.gif";
                    if (gig.tour_name === "Life Tour") {
                        dot = "giphy.gif";
                        var scaleParam = 15;
                    }

                    return (
                        <Marker
                            key={gig.id}
                            position={{
                                lat: parseFloat(gig.lat),
                                lng: parseFloat(gig.lng),
                            }}
                            icon={{
                                url: dot,
                                scaledSize: new window.google.maps.Size(
                                    scaleParam || 30,
                                    15
                                ),
                            }}
                            onClick={() => {
                                props.setSelectedGig(gig);
                            }}
                        />
                    );
                })}
            {props.selectedGig && (
                <InfoWindow
                    position={{
                        lat: parseFloat(props.selectedGig.lat),
                        lng: parseFloat(props.selectedGig.lng),
                    }}
                    onCloseClick={() => {
                        props.setSelectedGig(null);
                    }}
                >
                    <div className="mapInfoCard">
                        <div
                            style={{
                                color: `yellow`,
                                textDecoration: `underline`,
                                textUnderlineOffset: `3px`,
                                fontFamily: "Poller One, cursive",
                            }}
                        >
                            {fixedDate}
                        </div>

                        {props.selectedGig.poster && (
                            <a href={props.selectedGig.poster} target="_blank">
                                <img
                                    className="infoPoster"
                                    src={
                                        props.selectedGig.poster &&
                                        props.selectedGig.poster
                                    }
                                ></img>
                            </a>
                        )}

                        {props.selectedGig.venue && (
                            <div>
                                Venue <span>➤</span> {props.selectedGig.venue}
                            </div>
                        )}
                        {props.selectedGig.city && (
                            <div>
                                City/Place <span>➤</span>{" "}
                                {props.selectedGig.city}
                            </div>
                        )}
                        {props.selectedGig.tour_name && (
                            <div>
                                Tour <span>➤</span>{" "}
                                {props.selectedGig.tour_name}
                            </div>
                        )}
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
});

const MyMap = ({ gigsList, mapVisible }) => {
    const [selectedGig, setSelectedGig] = useState(null);
    const [zoom, setZoom] = useState(4);
    const [center, setCenter] = useState({
        lat: 35.08702515417141,
        lng: -40.71445657001389,
    });

    useEffect(function () {
        mapVisible();
    }, []);

    return (
        <div className="google-map">
            <WithGoogleMapComponent
                gigsList={gigsList}
                selectedGig={selectedGig}
                setCenter={setCenter}
                center={center}
                setSelectedGig={setSelectedGig}
            />
        </div>
    );
};

export default MyMap;
