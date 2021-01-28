import { useEffect, useRef, useCallback } from 'react';
import isObject from 'lodash/isObject';
import { useGoogleMapsClient } from '@micromag/core/contexts';

const eventMapping = {
    onClick: 'click',
    onDoubleClick: 'dblclick',
};

export default function useGoogleMapMarker(
    map,
    { position = null, icon = null, iconSize = null, events, title } = {},
) {
    const client = useGoogleMapsClient();
    const markerRef = useRef(null);

    useEffect(() => {
        const { current: marker } = markerRef;
        if (marker !== null && position !== null) {
            marker.setPosition(position);
        }
    }, [position]);

    const updateIcon = useCallback((marker, newIcon) => {
        if (client === null) {
            return;
        }
        if (isObject(newIcon)) {
            const { url: iconUrl = null } = newIcon || {};
            marker.setIcon({
                url: iconUrl,
                scaledSize: new client.maps.Size(iconSize.width, iconSize.height),
            });
        } else {
            marker.setIcon(newIcon);
        }
    }, [client, iconSize]);

    useEffect(() => {
        const { current: marker } = markerRef;
        if (marker === null || client === null) {
            return;
        }
        updateIcon(marker, icon);
    }, [client, icon, updateIcon]);

    useEffect(() => {
        if (client === null || map === null || markerRef.current !== null) {
            return () => {};
        }

        const marker = new client.maps.Marker({
            position,
            map,
            title,
        });

        updateIcon(marker, icon);

        Object.keys(events).forEach((eventName) => {
            marker.addListener(eventMapping[eventName], events[eventName]);
        });
        markerRef.current = marker;

        return () => {
            client.maps.event.clearInstanceListeners(marker);
            marker.setMap(null);
        };
    }, [client, map]);

    return markerRef.current;
}
