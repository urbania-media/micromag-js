import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useGoogleMap from './useGoogleMap';

import styles from './styles.module.scss';

const propTypes = {
    mapsApi: PropTypes.object.isRequired, // eslint-disable-line
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    zoom: PropTypes.number,
    // Global maps events
    events: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    disableDefaultUI: PropTypes.bool,
    mapTypeControl: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    center: { lat: 45.5, lng: -73.56 },
    zoom: 10,
    events: null,
    disableDefaultUI: true,
    mapTypeControl: false,
    className: null,
    children: null,
};

const Map = ({
    mapsApi,
    center,
    zoom,
    events,
    disableDefaultUI,
    mapTypeControl,
    className,
    children,
}) => {
    const { maps, map, mapRef, loading } = useGoogleMap({
        mapsApi,
        zoom,
        center,
        events,
        disableDefaultUI,
        mapTypeControl,
    });

    useEffect(() => {
        if (map) {
            map.panTo(center);
        }
    }, [center.lat, center.lng]);

    useEffect(() => {
        if (map) {
            map.setZoom(zoom);
        }
    }, [zoom]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div ref={mapRef} className={styles.map} />
            {!loading &&
                React.Children.map(children, child => React.cloneElement(child, { map, maps }))}
        </div>
    );
};

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
