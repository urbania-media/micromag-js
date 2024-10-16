/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import Button from './Button';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const BackButton = ({ className, ...props }) => (
    <Button
        className={classNames([
            'px-2',
            {
                [className]: className,
            },
        ])}
        size="sm"
        icon={<FontAwesomeIcon icon={faAngleLeft} size="lg" />}
        {...props}
    />
);

BackButton.propTypes = propTypes;
BackButton.defaultProps = defaultProps;

export default BackButton;
