import { useEffect, useState, useRef, useCallback } from 'react';
import { useGoogleMapsClient } from '@micromag/core/contexts';
import { useResizeObserver } from '@micromag/core/hooks';

import styles from './styles';

const eventsMapping = {
    onClick: ['click', (map) => map.getCenter()],
    onCenterChanged: ['center_changed', (map) => map.getCenter()],
    onBoundsChanged: ['bounds_changed', (map) => map.getBounds()],
    onDragEnd: ['dragend', (map) => map.getCenter()],
    onTilesLoaded: ['tilesloaded', () => {}],
};

export default function useGoogleMap({
    zoom,
    maxZoom = null,
    center = null,
    withoutStyle = false,
    fitBounds = false,
    bounds = null,
    events,
    scrollable = false,
    zoomControl,
    mapTypeControl,
    scaleControl,
    streetViewControl,
    rotateControl,
    fullscreenControl,
}) {
    const client = useGoogleMapsClient();
    const [ready, setReady] = useState(false);
    const containerRef = useRef(null);
    const mapRef = useRef(null);

    const {
        ref: resizeRef,
        entry: { contentRect: elContentRect },
    } = useResizeObserver();
    const { width = null, height = null } = elContentRect || {};

    useEffect(() => {
        const { current: map } = mapRef;
        if (map !== null && center !== null) {
            const { lat = null, lng = null } = center || {};
            map.panTo({ lat: lat || 0, lng: lng || 0 });
        }
    }, [center]);

    useEffect(() => {
        const { current: map } = mapRef;
        if (map !== null && zoom !== null) {
            map.setZoom(Math.min(maxZoom, zoom));
        }
    }, [zoom, maxZoom]);

    const updateBounds = useCallback(
        (map, newBounds) => {
            if (newBounds === null || newBounds.equals(map.getBounds())) {
                return;
            }
            map.fitBounds(newBounds);
            if (map.getZoom() > maxZoom) {
                map.setZoom(maxZoom);
            }
            map.panToBounds(newBounds);
        },
        [maxZoom],
    );

    useEffect(() => {
        const { current: map } = mapRef;
        if (map !== null && fitBounds) {
            updateBounds(map, bounds);
        }
    }, [updateBounds, bounds, fitBounds, width, height]);

    useEffect(() => {
        const { current: map } = mapRef;
        if (map !== null) {
            map.setOptions({
                draggable: scrollable,
                scrollWheel: scrollable,
                disableDoubleClickZoom: !scrollable,
                gestureHandling: scrollable ? 'cooperative' : 'none',
            });
        }
    }, [scrollable]);

    useEffect(() => {
        if (client === null || containerRef.current === null || mapRef.current !== null) {
            return () => {};
        }

        const map = new client.maps.Map(containerRef.current, {
            zoom,
            center,
            styles: !withoutStyle ? styles : null,
            zoomControl,
            mapTypeControl,
            scaleControl,
            streetViewControl,
            rotateControl,
            fullscreenControl,
        });

        if (fitBounds) {
            updateBounds(map, bounds);
        }

        mapRef.current = map;

        // @TODO unbind events
        if (events !== null) {
            Object.keys(events).forEach((eventName) => {
                if (events[eventName] !== null) {
                    map.addListener(eventsMapping[eventName][0], () =>
                        events[eventName](eventsMapping[eventName][1](map)),
                    );
                }
            });
        }
        setReady(true);

        return () => {};
    }, [
        client,
        setReady,
    ]);

    const finalRef = useCallback((ref) => {
        resizeRef.current = ref;
        containerRef.current = ref;
    }, []);

    return {
        ref: finalRef,
        map: mapRef.current,
        ready,
        loading: !ready,
    };
}
