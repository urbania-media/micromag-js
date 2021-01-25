import React, { useCallback, useEffect, useState } from 'react';
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
    scrollable: PropTypes.bool,
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
};

const defaultProps = {
    center: null,
    zoom: null,
    scrollable: true,
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
};

const Map = ({
    center,
    zoom,
    scrollable,
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
}) => {
    const { maps: mapsApi } = useGoogleMapsClient() || {};

    const onClick = useCallback(
        (position) => {
            if (onClickMap !== null) {
                onClickMap(position);
            }
        },
        [onClickMap],
    );

    const [bounds, setBounds] = useState(null);

    useEffect(() => {
        if (mapsApi) {
            if (markers !== null && markers.length > 0) {
                const newBounds = new mapsApi.LatLngBounds();
                markers.forEach(({ geoPosition = null }) => {
                    const { lat = null, lng = null } = geoPosition || {};
                    newBounds.extend(new mapsApi.LatLng(lat, lng));
                });
                setBounds((currentBounds) =>
                    newBounds.equals(currentBounds) ? currentBounds : newBounds,
                );
            }
        }
    }, [markers, mapsApi, setBounds]);

    useEffect(() => {
        if (mapsApi) {
            if (onReady !== null) {
                onReady(mapsApi);
            }
        }
    }, [mapsApi, onReady]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {mapsApi ? (
                <GoogleMap
                    mapsApi={mapsApi}
                    center={center}
                    zoom={zoom}
                    withoutStyle={withoutStyle}
                    bounds={bounds}
                    scrollable={scrollable}
                    events={{
                        onClick,
                        onCenterChanged,
                        onBoundsChanged,
                        onDragEnd,
                    }}
                    fitBounds={fitBounds}
                    zoomControl={zoomControl}
                    mapTypeControl={mapTypeControl}
                    scaleControl={scaleControl}
                    streetViewControl={streetViewControl}
                    rotateControl={rotateControl}
                    fullscreenControl={fullscreenControl}
                >
                    {markers
                        ? markers.map((m, index) =>
                              m.geoPosition && m.geoPosition.lat && m.geoPosition.lng ? (
                                  <Marker
                                      mapsApi={mapsApi}
                                      key={m.id}
                                      active={m.active}
                                      title={`marker id: ${m.id}`}
                                      image={{ media: m.image }}
                                      position={{ lat: m.geoPosition.lat, lng: m.geoPosition.lng }}
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
            ) : null}
        </div>
    );
};

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
