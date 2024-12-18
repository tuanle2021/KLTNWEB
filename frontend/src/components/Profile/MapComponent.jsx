import React, { useEffect, useState } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl';
import axios from 'axios';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFpdGhpaGlldSIsImEiOiJjbTJ4eTU2YjMwYThxMmpvOGhoZW1oaHh2In0.F3GI89PsdNEEjlk9Q2o8TQ';

const WaypointList = ({ waypoints }) => {
    return (
        <div style={{ padding: '10px', maxHeight: '100%', overflowY: 'auto' }}>
            <h3>Waypoints</h3>
            <ul>
                {waypoints.map((waypoint, index) => (
                    <li key={index}>{waypoint}</li>
                ))}
            </ul>
        </div>
    );
};

const MapComponent = ({ startCoordinates, endCoordinates }) => {
    const [viewport, setViewport] = useState({
        latitude: startCoordinates[1],
        longitude: startCoordinates[0],
        zoom: 10,
    });
    const [route, setRoute] = useState(null);
    const [waypoints, setWaypoints] = useState([]);

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                const response = await axios.get(
                    `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoordinates.join(',')};${endCoordinates.join(',')}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
                );
                setRoute(response.data.routes[0].geometry);

                const waypointPromises = response.data.routes[0].geometry.coordinates.map(async (wp) => {
                    const placeResponse = await axios.get(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${wp[0]},${wp[1]}.json?access_token=${MAPBOX_TOKEN}`
                    );
                    return placeResponse.data.features[0]?.place_name || `${wp[1]}, ${wp[0]}`;
                });

                const waypointNames = await Promise.all(waypointPromises);
                setWaypoints(waypointNames);
            } catch (error) {
                console.error("Error fetching route:", error);
            }
        };

        fetchRoute();
    }, [startCoordinates, endCoordinates]);

    return (
        <div style={{ display: 'flex', height: '250px' }}>
            <div style={{ flex: 1 }}>
                <MapGL
                    {...viewport}
                    width="100%"
                    height="100%"
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    onViewportChange={(nextViewport) => setViewport(nextViewport)}
                    mapboxAccessToken={MAPBOX_TOKEN}
                    dragPan={true}
                    dragRotate={true}
                    attributionControl={false}
                >
                    {route && (
                        <Source id="route" type="geojson" data={route}>
                            <Layer
                                id="route"
                                type="line"
                                source="route"
                                layout={{
                                    'line-join': 'round',
                                    'line-cap': 'round',
                                }}
                                paint={{
                                    'line-color': '#888',
                                    'line-width': 8,
                                }}
                            />
                        </Source>
                    )}
                </MapGL>
            </div>
            <div style={{ width: '300px', backgroundColor: '#f8f8f8' }}>
                <WaypointList waypoints={waypoints} />
            </div>
        </div>
    );
};

export default MapComponent;