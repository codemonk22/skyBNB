import React from "react";
import { Map, Marker, GoogleApiWrapper} from "google-maps-react";
import { useState, useEffect} from "react";

function RentalsMap({locations, google, setHighLight}) {
  const [center, setCenter] = useState();

  useEffect(() => {
    var arr = Object.keys(locations);
    var getLat = (key) => locations[key]["lat"];
    var avgLat = arr.reduce((a,c) => a + Number(getLat(c)), 0) / arr.length;

    var getLng = (key) => locations[key]["lng"];
    var avgLng = arr.reduce((a,c) => a + Number(getLng(c)), 0) / arr.length;

    setCenter({lat:avgLat, lng:avgLng})

  }, [locations])

  return (
    <>
      <div>Map</div>
      {center && (
        <Map
        google={google}
        containerStyle={{
          width: "50vw",
          height: "calc(100vh - 135px)",
          // position: "relative",
        }}
        center={center}
        initialCenter={locations[0]}
        zoom={13}
        disableDefaultUI={true}
        >
          {locations.map((coords, i) => (
            <Marker position={coords} onClick={() => setHighLight(i)} />
          ))}
        </Map>
      )}
    </>
  );
}

// export default RentalsMap;
export default GoogleApiWrapper({
  //apiKey: "AIzaSyAssx9wIJDlUola6rN7Pgg_4ZijhG0gdVQ"
  apiKey: "AIzaSyAzJkhosIvFdY1-8oxCaU57cMhn-bJN5DY"
  //apiKey:""
}) (RentalsMap);
