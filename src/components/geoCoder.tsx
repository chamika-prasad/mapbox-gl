import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MapboxExample = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbWlrYXByYXNhZCIsImEiOiJjbWY3dzVoZ2wwMGtqMmlxeWE0bDByMjgwIn0.gdzPuIG1TWsSTYBHC-fzPg';

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/standard',
        center: [79.8612, 6.9271],
        zoom: 13
      });
    }

    if (mapRef.current) {
      // mapRef.current.addControl(
      //   new MapboxGeocoder({
      //     accessToken: mapboxgl.accessToken,
      //     useBrowserFocus: true,
      //     mapboxgl: mapboxgl
      //   })
      // );

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        useGeocoder: true,
        mapboxgl: mapboxgl,
      });

      // Add control to map
      mapRef.current.addControl(geocoder);

       // Listen for selection
      geocoder.on("result", (e: { result: any }) => {
        console.log("Selected location:", e.result);
        // Example: coordinates
        console.log("Coordinates:", e.result.geometry.coordinates);
        // Example: place name
        console.log("Place name:", e.result.place_name);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
};

export default MapboxExample;