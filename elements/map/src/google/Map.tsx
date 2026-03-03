/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';

import useGoogleMap from './useGoogleMap';

import styles from './styles.module.css';

const stopDragEventsPropagation = {
    onTouchMove: e => e.stopPropagation(),
    onTouchStart: e => e.stopPropagation(),
    onTouchEnd: e => e.stopPropagation(),
    onPointerMove: e => e.stopPropagation(),
    onPointerUp: e => e.stopPropagation(),
    onPointerDown: e => e.stopPropagation(),
}

interface MapProps {
    center?: { lat?: number; lng?: number };
    zoom?: number;
    maxZoom?: number;
    bounds?: Record<string, unknown>;
    draggable?: boolean;
    withoutStyle?: boolean;
    events?: Record<string, unknown>;
    fitBounds?: boolean;
    zoomControl?: boolean;
    mapTypeControl?: boolean;
    scaleControl?: boolean;
    streetViewControl?: boolean;
    rotateControl?: boolean;
    fullscreenControl?: boolean;
    className?: string;
    children?: React.ReactNode;
    focusable?: boolean;
}

const Map = ({
    center = null,
    zoom = null,
    maxZoom = 16,
    bounds = null,
    draggable = true,
    withoutStyle = false,
    events = null,
    fitBounds = false,
    zoomControl = false,
    mapTypeControl = false,
    scaleControl = false,
    streetViewControl = false,
    rotateControl = false,
    fullscreenControl = false,
    className = null,
    children = null,
    focusable = true,
}) => {
    const { map, ref: mapRef } = useGoogleMap({
        zoom,
        maxZoom,
        bounds,
        draggable,
        fitBounds,
        center,
        events,
        withoutStyle,
        zoomControl,
        mapTypeControl,
        scaleControl,
        streetViewControl,
        rotateControl,
        fullscreenControl,
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.preventScroll]: !draggable,
                },
            ])}
            {...stopDragEventsPropagation}
        >
            <div ref={mapRef} className={styles.map} tabIndex={focusable ? '0' : '-1'} />{/* eslint-disable-line jsx-a11y/no-noninteractive-tabindex */}
            {React.Children.map(children, (child) => React.cloneElement(child, { map }))}
        </div>
    );
};

export default Map;
