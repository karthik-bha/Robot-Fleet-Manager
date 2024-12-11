import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ robots }) => {
    const position = [0, 0]; // Default center

    return (
        <MapContainer
            center={position}
            zoom={2}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {robots.map((robot) => (
                <Marker
                    key={robot.robot_id}
                    position={robot.location}
                >
                    <Popup>
                        <strong>Robot ID:</strong> {robot.robot_id} <br />
                        <strong>Status:</strong>{" "}
                        {robot.status ? "Online" : "Offline"} <br />
                        <strong>Battery:</strong> {robot.battery}%
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;
