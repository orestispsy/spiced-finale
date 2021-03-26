import GoogleMapReact from "google-map-react";
import mapStyles from "./tools/mapStyles";

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

export default function Map ({ location, zoomLevel, center}) {
    console.log(location)
     return (
         <div className="mapContainer">
             <div className="google-map">
                 <GoogleMapReact
                     bootstrapURLKeys={secrets}
                     defaultCenter={center}
                     defaultZoom={zoomLevel}
                     options={{ styles: mapStyles.blackRed }}
                 >
                     {location.map((gig) => (
                         <Pin
                             key={gig.id}
                             lat={gig.lat}
                             lng={gig.lng}
                             text={gig.address}
                         />
                     ))}
                 </GoogleMapReact>
             </div>
         </div>
     );
     
};
