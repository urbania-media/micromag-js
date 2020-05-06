import { useEffect, useState } from 'react';

const eventMapping = {
    onClick: 'click',
    onDoubleClick: 'dblclick',
};

export default function useGoogleMapMarker({ mapsApi, position, map, events, title }) {
    const [marker, setMarker] = useState(null);
    useEffect(() => {
        let mark = null;
        if (map) {
            mark = new mapsApi.Marker({
                position,
                map,
                title,
                // optimized: false,
            });
            Object.keys(events).forEach(eventName => {
                mark.addListener(eventMapping[eventName], events[eventName]);
            });
            setMarker(mark);
        }
        return () => {
            if (marker) {
                mapsApi.event.clearInstanceListeners(marker);
                marker.setMap(null);
            }
        };
    }, [map, position.lat, position.lng]);

    return marker;
}
