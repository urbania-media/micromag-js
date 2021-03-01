import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useGoogleMap from './useGoogleMap';

import styles from './styles.module.scss';

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
};

const defaultProps = {
    center: null,
    zoom: null,
    maxZoom: 18,
    bounds: null,
    events: null,
    fitBounds: false,
    draggable: true,
    withoutStyle: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    className: null,
    children: null,
};

const Map = ({
    center,
    zoom,
    maxZoom,
    bounds,
    draggable,
    withoutStyle,
    events,
    fitBounds,
    zoomControl,
    mapTypeControl,
    scaleControl,
    streetViewControl,
    rotateControl,
    fullscreenControl,
    className,
    children,
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
        >
            <div ref={mapRef} className={styles.map} />
            {React.Children.map(children, (child) => React.cloneElement(child, { map }))}
        </div>
    );
};

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
