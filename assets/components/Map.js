import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = (props) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // const url =
  //   "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
  //   "Rosendalinkuja 7A 01520 Vantaa";
  console.log(url);
  const url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
    props?.streetname +
    " " +
    props?.postalCode +
    " " +
    props?.city;

  console.log(url);
  useEffect(() => {
    const getCoords = async () => {
      try {
        const res = await axios.get(url);
        console.log(res.data);
        console.log(res.data[0].lat);
        console.log(res.data[0].lon);
        console.log(res.data[0].display_name);

        const numberLat = Number(res.data[0].lat);
        const numberLong = Number(res.data[0].lon);
        setLatitude(numberLat);
        setLongitude(numberLong);
        console.log(typeof numberLat, numberLong);
      } catch (error) {
        console.log(error);
      }
    };

    getCoords();
    // axios.get(url).then((res) => {
    //   console.log(res.data);
    //   console.log(res.data[0].lat);
    //   console.log(res.data[0].lon);
    //   console.log(res.data[0].display_name);
    // });
  });

  // const position = [51.505, -0.09];
  const position = [latitude, longitude];
  console.log({ position });
  return position[0] && position[1] ? (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  ) : (
    <p>Loading map</p>
  );
};

export default Map;
