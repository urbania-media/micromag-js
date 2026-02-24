/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
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

const propTypes = {
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    zoom: PropTypes.number,
    maxZoom: PropTypes.number,
    bounds: PropTypes.object, // eslint-disable-line
    draggable: PropTypes.bool,
    withoutStyle: PropTypes.bool,
    // Global maps events
    events: PropTypes.object, // eslint-disable-line
    fitBounds: PropTypes.bool,
    zoomControl: PropTypes.bool,
    mapTypeControl: PropTypes.bool,
    scaleControl: PropTypes.bool,
    streetViewControl: PropTypes.bool,
    rotateControl: PropTypes.bool,
    fullscreenControl: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    focusable: PropTypes.bool,
};

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

Map.propTypes = propTypes;

export default Map;
