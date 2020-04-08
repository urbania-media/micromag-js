import { useEffect, useState, useRef } from 'react';

const eventsMapping = {
    onClick: ['click', map => map.getCenter()],
    onCenterChanged: ['center_changed', map => map.getCenter()],
    onBoundsChangerd: ['bounds_changed', map => map.getBounds()],
};

export default function useGoogleMap({ mapsApi, zoom, center, events }) {
    const [mapState, setMapState] = useState({ loading: true });
    const mapRef = useRef();
    useEffect(() => {
        const map = new mapsApi.Map(mapRef.current, { zoom, center });
        Object.keys(events).forEach(eventName =>
            map.addListener(eventsMapping[eventName][0], () =>
                events[eventName](eventsMapping[eventName][1](map)),
            ),
        );
        setMapState({ maps: mapsApi, map, loading: false });
    }, []);
    return { mapRef, ...mapState };
}
