/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@micromag/core/components';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const SettingsButton = ({ className, ...props }) => (
    <Button
        className={className}
        theme="secondary"
        size="sm"
        icon={<FontAwesomeIcon icon={faCogs} />}
        {...props}
    />
);

SettingsButton.propTypes = propTypes;
SettingsButton.defaultProps = defaultProps;

export default SettingsButton;
