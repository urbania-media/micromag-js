/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useGoogleMapsClient } from '@micromag/core/contexts';

import { Map as GoogleMap, Marker } from './google';

import styles from './styles.module.css';

interface MapProps {
    center?: { lat?: number; lng?: number } | null;
    zoom?: number | null;
    draggable?: boolean;
    markers?: Record<string, unknown>[];
    onClickMap?: ((...args: unknown[]) => void) | null;
    onClickMarker?: ((...args: unknown[]) => void) | null;
    className?: string | null;
    onReady?: ((...args: unknown[]) => void) | null;
    onCenterChanged?: ((...args: unknown[]) => void) | null;
    onBoundsChanged?: ((...args: unknown[]) => void) | null;
    onDrag?: ((...args: unknown[]) => void) | null;
    onDragEnd?: ((...args: unknown[]) => void) | null;
    withoutStyle?: boolean;
    fitBounds?: boolean;
    zoomControl?: boolean;
    mapTypeControl?: boolean;
    scaleControl?: boolean;
    streetViewControl?: boolean;
    rotateControl?: boolean;
    fullscreenControl?: boolean;
    focusable?: boolean;
}

function Map({
    center = null,
    zoom = null,
    draggable = true,
    markers: initialMarkers = null,
    onClickMap = null,
    onClickMarker = null,
    className = null,
    onReady = null,
    onCenterChanged = null,
    onBoundsChanged = null,
    onDrag = null,
    onDragEnd = null,
    withoutStyle = false,
    fitBounds = false,
    zoomControl = false,
    mapTypeControl = false,
    scaleControl = false,
    streetViewControl = false,
    rotateControl = false,
    fullscreenControl = false,
    focusable = true,
}: MapProps) {
    const markers = initialMarkers || [];
    const client = useGoogleMapsClient();

    const onClick = useCallback(
        (position) => {
            if (onClickMap !== null) {
                onClickMap(position);
            }
        },
        [onClickMap],
    );

    const bounds = useMemo(() => {
        const correctMarkers = (markers || []).filter(
            (it) => it !== null && (it.geoPosition || null) !== null,
        );
        if (client === null || correctMarkers === null || correctMarkers.length === 0) {
            return null;
        }
        const markersBounds = correctMarkers.reduce((newBounds, { geoPosition = null }) => {
            const { lat = null, lng = null } = geoPosition || {};
            if (lat !== null && lng !== null) {
                newBounds.extend(new client.maps.LatLng(lat, lng));
            }
            return newBounds;
        }, new client.maps.LatLngBounds());
        return markersBounds;
    }, [client, markers]);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (client !== null && loaded) {
            if (onReady !== null) {
                onReady(client);
            }
        }
    }, [client, loaded, onReady]);

    const onTilesLoaded = useCallback(() => setLoaded(true), [setLoaded]);

    const events = useMemo(
        () => ({
            onClick,
            onCenterChanged,
            onBoundsChanged,
            onDrag,
            onDragEnd,
            onTilesLoaded,
        }),
        [onClick, onCenterChanged, onBoundsChanged, onDrag, onDragEnd, onTilesLoaded],
    );

    return (
        <div
            className={classNames([
                styles.container,
                className,
            ])}
        >
            <GoogleMap
                center={center}
                zoom={zoom}
                withoutStyle={withoutStyle}
                bounds={bounds}
                draggable={draggable}
                events={events}
                fitBounds={fitBounds}
                zoomControl={zoomControl}
                mapTypeControl={mapTypeControl}
                scaleControl={scaleControl}
                streetViewControl={streetViewControl}
                rotateControl={rotateControl}
                fullscreenControl={fullscreenControl}
                focusable={focusable}
            >
                {markers !== null
                    ? markers.map(
                          (
                              { active = true, geoPosition = null, image = null, title = null },
                              index,
                          ) =>
                              geoPosition !== null &&
                              (geoPosition.lat || null) !== null &&
                              (geoPosition.lng || null) !== null ? (
                                  <Marker
                                      key={`marker-${index}`}
                                      active={active}
                                      title={
                                          title !== null && typeof title.body ? title.body : null
                                      }
                                      image={image}
                                      position={geoPosition}
                                      events={{
                                          onClick:
                                              onClickMarker !== null
                                                  ? (e) => onClickMarker(e, index)
                                                  : () => console.log(index), // eslint-disable-line no-console
                                      }}
                                  />
                              ) : (
                                  <div />
                              ),
                      )
                    : null}
            </GoogleMap>
        </div>
    );
}

export default Map;
