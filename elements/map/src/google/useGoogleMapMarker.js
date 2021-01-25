import { useEffect, useRef } from 'react';

const eventMapping = {
    onClick: 'click',
    onDoubleClick: 'dblclick',
};

export default function useGoogleMapMarker({ mapsApi, position, map, events, title }) {
    const marker = useRef(null);
    useEffect(() => {
        if (map) {
            marker.current = new mapsApi.Marker({
                position,
                map,
                title,
                // optimized: false,
            });
            Object.keys(events).forEach((eventName) => {
                marker.current.addListener(eventMapping[eventName], events[eventName]);
            });
        }
        return () => {
            if (marker.current !== null) {
                mapsApi.event.clearInstanceListeners(marker.current);
                marker.current.setMap(null);
            }
        };
    }, [map]);

    useEffect(() => {
        if (position !== null && marker.current !== null) {
            marker.current.setPosition(position);
        }
    }, [position]);

    return marker.current;
}
