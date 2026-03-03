import { useEffect, useRef } from 'react';
import { useGoogleMapsClient } from '@micromag/core/contexts';

export default function useGoogleMapMarker(map, { coords }) {
    const client = useGoogleMapsClient();
    const polylineRef = useRef(null);
    useEffect(() => {
        if (map === null || client === null) {
            return () => {};
        }
        const polyline = new client.maps.Polyline({
            map,
            path: coords,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        polylineRef.current = polyline;

        return () => {
            polyline.setMap(null);
        };
    }, [client, map, coords]);

    return polylineRef.current;
}
