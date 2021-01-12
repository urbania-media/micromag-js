import { useEffect, useState, useRef } from 'react';

import styles from './styles';

const eventsMapping = {
    onClick: ['click', map => map.getCenter()],
    onCenterChanged: ['center_changed', map => map.getCenter()],
    onBoundsChanged: ['bounds_changed', map => map.getBounds()],
    onDragEnd: ['dragend', map => map.getCenter()],
};

export default function useGoogleMap({
    mapsApi,
    zoom,
    center,
    events,
    disableDefaultUI,
    mapTypeControl,
}) {
    const [mapState, setMapState] = useState({ loading: true });
    const mapRef = useRef();
    useEffect(() => {
        const map = new mapsApi.Map(mapRef.current, {
            zoom,
            center,
            styles,
            disableDefaultUI,
            mapTypeControl,
        });
        Object.keys(events).forEach(eventName =>
            map.addListener(eventsMapping[eventName][0], () =>
                events[eventName](eventsMapping[eventName][1](map)),
            ),
        );
        setMapState({ maps: mapsApi, map, loading: false });
        return () => {
            mapRef.current = null;
        };
    }, []);
    return { mapRef, ...mapState };
}
