import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useResizeObserver } from '@micromag/core/hooks';

import useGoogleMap from './useGoogleMap';

import styles from './styles.module.scss';

const propTypes = {
    mapsApi: PropTypes.object.isRequired, // eslint-disable-line
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    zoom: PropTypes.number,
    maxZoom: PropTypes.number,
    bounds: PropTypes.object, // eslint-disable-line
    scrollable: PropTypes.bool,
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
    scrollable: true,
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
    mapsApi,
    center,
    zoom,
    maxZoom,
    bounds,
    scrollable,
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
    const { maps, map, mapRef, loading } = useGoogleMap({
        mapsApi,
        zoom,
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

    useEffect(() => {
        if (map && center !== null) {
            const { lat = null, lng = null } = center || {};
            const finalCenter = { lat: lat || 0, lng: lng || 0 };
            map.panTo(finalCenter);
        }
    }, [center]);

    useEffect(() => {
        if (map && zoom !== null) {
            map.setZoom(Math.min(maxZoom, zoom));
        }
    }, [zoom, maxZoom]);

    const {
        ref: elRef,
        entry: { contentRect: elContentRect },
    } = useResizeObserver();
    const { width = null, height = null } = elContentRect || {};

    useEffect(() => {
        if (map && fitBounds && bounds !== null) {
            map.fitBounds(bounds);
            if (map.getZoom() > maxZoom) {
                map.setZoom(maxZoom);
            }
            map.panToBounds(bounds);
        }
    }, [maxZoom, bounds, fitBounds, width, height]);

    useEffect(() => {
        if (map) {
            map.setOptions({
                draggable: scrollable,
                scrollWheel: scrollable,
                disableDoubleClickZoom: !scrollable,
                gestureHandling: scrollable ? 'cooperative' : 'none',
            });
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
            ref={elRef}
        >
            <div ref={mapRef} className={styles.map} />
            {!loading &&
                React.Children.map(children, (child) => React.cloneElement(child, { map, maps }))}
        </div>
    );
};

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
