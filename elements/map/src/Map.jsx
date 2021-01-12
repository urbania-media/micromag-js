import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useGoogleMapsClient } from '@micromag/core/contexts';
import { Map as GoogleMap, Marker, TransitLayer, Polyline } from './google';

import styles from './styles.module.scss';

const propTypes = {
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    zoom: PropTypes.number,
    scrollable: PropTypes.bool,
    markers: PropTypes.arrayOf(PropTypes.object),
    layers: PropTypes.arrayOf(PropTypes.string),
    withLine: PropTypes.bool,
    onClickMap: PropTypes.func,
    onClickMarker: PropTypes.func,
    className: PropTypes.string,
    onReady: PropTypes.func,
    onDragEnd: PropTypes.func,
};

const defaultProps = {
    center: null,
    zoom: null,
    scrollable: true,
    markers: [],
    layers: [],
    onClickMap: null,
    onClickMarker: null,
    withLine: false,
    className: null,
    onReady: null,
    onDragEnd: null,
};

const Map = ({
    center,
    zoom,
    scrollable,
    markers,
    layers,
    withLine,
    onClickMap,
    onClickMarker,
    className,
    onReady,
    onDragEnd,
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

    if (!mapsApi) {
        // console.log('No mapsApi', mapsApi);
    }

    const [bounds, setBounds] = useState(null);
    useEffect(() => {
        if (mapsApi) {
            if (markers !== null && markers.length > 0) {
                const newBounds = new mapsApi.LatLngBounds();
                markers.forEach(({geoPosition = null}) => {
                    const { lat = null, lng = null } = geoPosition || {};
                    newBounds.extend(new mapsApi.LatLng(lat, lng));
                });
                setBounds(currentBounds => newBounds.equals(currentBounds) ? currentBounds : newBounds);
            }
            if (onReady !== null) {
                onReady(mapsApi);
            }
        }
    }, [markers, mapsApi, onReady]);

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
                    bounds={bounds}
                    scrollable={scrollable}
                    events={{
                        onClick,
                        onDragEnd,
                    }}
                >
                    <Polyline
                        mapsApi={mapsApi}
                        coords={withLine ? markers.map((m) => ({ lat: m.lat, lng: m.lng })) : []}
                    />
                    <TransitLayer mapsApi={mapsApi} enabled={layers.includes('transit')} />
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
