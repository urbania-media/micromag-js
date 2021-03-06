import React, { useCallback, useEffect } from 'react';
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
    onZoomChanged: PropTypes.func,
};

const defaultProps = {
    center: { lat: 45.5, lng: -73.56 },
    zoom: 10,
    scrollable: true,
    markers: [],
    layers: [],
    onClickMap: null,
    onClickMarker: null,
    withLine: false,
    className: null,
    onReady: null,
    onDragEnd: null,
    onZoomChanged: null,
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
    onZoomChanged,
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

    useEffect(() => {
        if (mapsApi && onReady !== null) {
            onReady(mapsApi);
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
                    zoom={zoom}
                    center={center}
                    scrollable={scrollable}
                    events={{
                        onClick,
                        onDragEnd,
                        onZoomChanged,
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
