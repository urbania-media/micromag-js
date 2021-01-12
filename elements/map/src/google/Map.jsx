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
    bounds: PropTypes.object,// eslint-disable-line
    scrollable: PropTypes.bool,
    // Global maps events
    events: PropTypes.object, // eslint-disable-line
    disableDefaultUI: PropTypes.bool,
    mapTypeControl: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    center: null,
    zoom: null,
    bounds: null,
    scrollable: true,
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
    bounds,
    scrollable,
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
        if (map && center !== null) {
            const { lat = null, lng = null } = center || {};
            const finalCenter = { lat: lat || 0, lng: lng || 0 };
            map.panTo(finalCenter);
        }
    }, [center]);

    useEffect(() => {
        if (map && zoom !== null) {
            map.setZoom(zoom);
        }
    }, [zoom]);

    useEffect(() => {
        if (map && bounds !== null) {
            map.fitBounds(bounds);
            map.panToBounds(bounds);
        }
    }, [bounds]);

    useEffect(() => {
        if (map) {
            map.setOptions({
                draggable: scrollable,
                scrollWheel: scrollable,
                disableDoubleClickZoom: !scrollable,
                gestureHandling: scrollable ? 'cooperative' : 'none',
            })
        }
    }, [scrollable]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.preventScroll]: !scrollable,
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
