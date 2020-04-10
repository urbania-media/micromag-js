import { useEffect, useState } from 'react';

export default function useGoogleMapMarker({ mapsApi, coords, map }) {
    const [polyLine, setPolyline] = useState();
    useEffect(() => {
        const line = new mapsApi.Polyline({
            path: coords,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        line.setMap(map);
        setPolyline(line);
    }, []);

    return polyLine;
}
