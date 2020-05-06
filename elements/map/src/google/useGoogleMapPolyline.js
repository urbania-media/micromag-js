import { useEffect, useState } from 'react';

export default function useGoogleMapMarker({ mapsApi, coords, map }) {
    const [polyline, setPolyline] = useState(null);
    useEffect(() => {
        if (map) {
            const line = new mapsApi.Polyline({
                path: coords,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });
            line.setMap(map);
            setPolyline(line);
        }

        return () => {
            if (polyline) {
                polyline.setMap(null);
            }
        };
    }, [map, coords]);

    return polyline;
}
