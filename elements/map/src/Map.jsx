/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useGoogleMapsClient } from '@micromag/core/contexts';

import { Map as GoogleMap, Marker } from './google';

import styles from './styles.module.scss';

const propTypes = {
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    zoom: PropTypes.number,
    draggable: PropTypes.bool,
    markers: PropTypes.arrayOf(PropTypes.object),
    onClickMap: PropTypes.func,
    onClickMarker: PropTypes.func,
    className: PropTypes.string,
    onReady: PropTypes.func,
    onCenterChanged: PropTypes.func,
    onBoundsChanged: PropTypes.func,
    onDragEnd: PropTypes.func,
    withoutStyle: PropTypes.bool,
    fitBounds: PropTypes.bool,
    zoomControl: PropTypes.bool,
    mapTypeControl: PropTypes.bool,
    scaleControl: PropTypes.bool,
    streetViewControl: PropTypes.bool,
    rotateControl: PropTypes.bool,
    fullscreenControl: PropTypes.bool,
    focusable: PropTypes.bool,
};

const defaultProps = {
    center: null,
    zoom: null,
    draggable: true,
    markers: [],
    onClickMap: null,
    onClickMarker: null,
    className: null,
    onReady: null,
    onCenterChanged: null,
    onBoundsChanged: null,
    onDragEnd: null,
    withoutStyle: false,
    fitBounds: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    focusable: true,
};

const Map = ({
    center,
    zoom,
    draggable,
    markers,
    onClickMap,
    onClickMarker,
    className,
    onReady,
    onCenterChanged,
    onBoundsChanged,
    onDragEnd,
    withoutStyle,
    fitBounds,
    zoomControl,
    mapTypeControl,
    scaleControl,
    streetViewControl,
    rotateControl,
    fullscreenControl,
    focusable,
}) => {
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
        const correctMarkers = (markers || []).filter(it => it !== null && (it.geoPosition || null) !== null);
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
            onDragEnd,
            onTilesLoaded,
        }),
        [onClick, onCenterChanged, onBoundsChanged, onDragEnd, onTilesLoaded],
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
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
};

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
