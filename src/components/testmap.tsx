import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbWlrYXByYXNhZCIsImEiOiJjbWY3dzVoZ2wwMGtqMmlxeWE0bDByMjgwIn0.gdzPuIG1TWsSTYBHC-fzPg';

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });
    }
  });

  return (
    <div
      style={{ height: '100%',width: '100%' }}
      ref={mapContainerRef}
      className="map-container"
    />
  );
};

export default MapboxExample;