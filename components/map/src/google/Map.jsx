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
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    center: { lat: 45.5, lng: -73.56 },
    zoom: 10,
    events: null,
    className: null,
    children: null,
};

const Map = ({ mapsApi, center, zoom, events, className, children }) => {
    const { maps, map, mapRef, loading } = useGoogleMap({ mapsApi, zoom, center, events });

    useEffect(() => {
        if (map) {
            map.panTo(center);
        }
    }, [center.lat, center.lng]);

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
                React.Children.map(children, child => {
                    return React.cloneElement(child, { map, maps });
                })}
        </div>
    );
};

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
