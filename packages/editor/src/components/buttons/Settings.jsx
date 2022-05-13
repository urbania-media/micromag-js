/* eslint-disable react/jsx-props-no-spreading */
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
// import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '@micromag/core/components';

const propTypes = {
    dots: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    dots: false,
    className: null,
};

const SettingsButton = ({ className, dots, ...props }) => (
    <Button
        className={className}
        theme="secondary"
        size="sm"
        icon={<FontAwesomeIcon icon={dots ? faEllipsisV : faCogs} />}
        {...props}
    />
);

SettingsButton.propTypes = propTypes;
SettingsButton.defaultProps = defaultProps;

export default SettingsButton;
