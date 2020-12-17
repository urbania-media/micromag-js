/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import NumberField from './Number';

import styles from '../styles/geo-position.module.scss';


const propTypes = {    
    value: MicromagPropTypes.geoPosition,    
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const GeoPosition = ({ value, className, onChange }) => {
    const onLatitudeChange = useCallback(
        (newLat) => {
            const newValue = {
                ...value,
                lat: newLat,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );

    const onLongitudeChange = useCallback(
        (newLng) => {
            const newValue = {
                ...value,
                lng: newLng,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );

    const { lat = null, lng = null } = value || {};

    return (
        <div className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}>
            <label>
                <span><FormattedMessage defaultMessage="Latitude" description="Latitude description" />:</span>
                <NumberField float value={lat} min={-90} max={90} onChange={onLatitudeChange} />
            </label>
            <label>
                <span><FormattedMessage defaultMessage="Longitude" description="Longitude description" />:</span>
                <NumberField float value={lng} min={-180} max={180} onChange={onLongitudeChange} />
            </label>
        </div>
    );
};

GeoPosition.propTypes = propTypes;
GeoPosition.defaultProps = defaultProps;

export default GeoPosition;
