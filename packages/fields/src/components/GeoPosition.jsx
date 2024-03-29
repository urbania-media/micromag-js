/* eslint-disable jsx-a11y/label-has-associated-control */

/* eslint-disable react/jsx-props-no-spreading */
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useGoogleMapsClient } from '@micromag/core/contexts';
import Map, { Pin } from '@micromag/element-map';
import styles from '../styles/geo-position.module.scss';
import NumberField from './Number';

const propTypes = {
    value: MicromagPropTypes.geoPosition,
    defaultCenter: MicromagPropTypes.geoPosition,
    defaultZoom: PropTypes.number,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    defaultCenter: {
        lat: 45.5,
        lng: -73.56,
    },
    defaultZoom: 10,
    className: null,
    onChange: null,
};

const getFixedCoords = ({ lat, lng }, precision = 4) => ({
    lat: parseFloat(lat.toFixed(precision)),
    lng: parseFloat(lng.toFixed(precision)),
});

const GeoPosition = ({ value, defaultCenter, defaultZoom, className, onChange }) => {
    const [address, setAddress] = useState('');
    const [mapReady, setMapReady] = useState(false);
    const [zoom, setZoom] = useState(defaultZoom);
    const client = useGoogleMapsClient();
    const intl = useIntl();
    const addressInputRef = useRef(null);
    const autoCompleteRef = useRef(null);

    const [finalValue, setFinalValue] = useState(value);
    const [dragValue, setDragValue] = useState(null);

    const onValuePropChanged = useCallback(
        (newValue) => {
            const mergedValue = {
                ...value,
                ...newValue,
            };
            setFinalValue(mergedValue);
            if (onChange !== null) {
                onChange(mergedValue);
            }
        },
        [value, setFinalValue, onChange],
    );

    const onLatitudeChange = useCallback(
        (lat) => {
            onValuePropChanged({ lat });
        },
        [onValuePropChanged],
    );
    const onLongitudeChange = useCallback(
        (lng) => {
            onValuePropChanged({ lng });
        },
        [onValuePropChanged],
    );

    const onMapCenterChanged = useCallback(
        (mapCenter) => setFinalValue(getFixedCoords(mapCenter.toJSON())),
        [onValuePropChanged, setFinalValue],
    );

    const onMapDragEnd = useCallback(
        (mapCenter) => {
            setDragValue(getFixedCoords(mapCenter.toJSON()));
        },
        [setDragValue],
    );

    useEffect(() => {
        if (dragValue !== null) {
            onValuePropChanged(dragValue);
        }
    }, [dragValue]);

    const onMapReady = useCallback(() => {
        setMapReady(true);
    }, [setMapReady]);

    const { lat = null, lng = null } = finalValue || {};

    const onPlaceChanged = useCallback(() => {
        const place = autoCompleteRef.current.getPlace();
        const { geometry = null, name = null } = place || {};
        if (geometry !== null) {
            const { location } = geometry;
            onValuePropChanged(getFixedCoords(location.toJSON()));
            setZoom(17);
        } else {
            setZoom(defaultZoom);
        }

        if (name !== null) {
            setAddress(name);
        }
    }, [onValuePropChanged, defaultZoom, setZoom]);

    const onSearchButtonClick = useCallback(() => {
        addressInputRef.current.focus();
    }, []);

    useEffect(() => {
        if (client !== null) {
            if (typeof client.maps.places !== 'undefined') {
                autoCompleteRef.current = new client.maps.places.Autocomplete(
                    addressInputRef.current,
                    {
                        origin: defaultCenter,
                    },
                );
                autoCompleteRef.current.setFields(['geometry', 'name']);
                autoCompleteRef.current.addListener('place_changed', onPlaceChanged);
            } else {
                console.log('Gmaps: Autocomplete requires "places" library'); // eslint-disable-line
            }
        }
    }, [client]);

    useEffect(
        () => () => {
            if (client !== null && autoCompleteRef.current !== null) {
                client.maps.event.clearListeners(autoCompleteRef.current, 'place_changed');
            }
        },
        [client],
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
            <div className={classNames([styles.autoComplete, 'input-group'])}>
                <button type="button" onClick={onSearchButtonClick} className="btn btn-secondary">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                <input
                    type="text"
                    ref={addressInputRef}
                    className={classNames([styles.address, 'form-control'])}
                    value={address}
                    placeholder={intl.formatMessage({
                        defaultMessage: 'Search a place on Google Maps',
                        description: 'Search a place on Google Maps placeholder',
                    })}
                    autoComplete="off"
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }}
                />
            </div>
            <div className={styles.map}>
                <Map
                    center={value || defaultCenter}
                    zoom={zoom}
                    onCenterChanged={onMapCenterChanged}
                    onDragEnd={onMapDragEnd}
                    onReady={onMapReady}
                    withoutStyle
                    zoomControl
                />
                {mapReady ? <img className={styles.pin} src={Pin} alt="Pin" /> : null}
            </div>
            <div className={styles.infos}>
                <FormattedMessage
                    defaultMessage="Move the map to position the place"
                    description="Move the map to position the place description"
                />
            </div>
            <div className={styles.coords}>
                <label className={styles.coord}>
                    <span className={styles.coordLabel}>
                        <FormattedMessage
                            defaultMessage="Latitude"
                            description="Latitude description"
                        />
                        :
                    </span>
                    <NumberField
                        float
                        floatStep={0.001}
                        value={lat}
                        min={-90}
                        max={90}
                        onChange={onLatitudeChange}
                        fullWidth
                    />
                </label>
                <label className={styles.coord}>
                    <span className={styles.coordLabel}>
                        <FormattedMessage
                            defaultMessage="Longitude"
                            description="Longitude description"
                        />
                        :
                    </span>
                    <NumberField
                        float
                        floatStep={0.001}
                        value={lng}
                        min={-180}
                        max={180}
                        onChange={onLongitudeChange}
                        fullWidth
                    />
                </label>
            </div>
        </div>
    );
};

GeoPosition.propTypes = propTypes;
GeoPosition.defaultProps = defaultProps;

export default GeoPosition;
