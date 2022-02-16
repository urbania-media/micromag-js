/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Number from './Number';

const fontAwesomeIconType = PropTypes.shape({
    icon: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
    ),
    iconName: PropTypes.string,
    prefix: PropTypes.string,
});

const propTypes = {
    icon: PropTypes.oneOfType([PropTypes.node, fontAwesomeIconType]),
    iconRotation: PropTypes.number,
    isHorizontal: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    icon: null,
    iconRotation: 0,
    isHorizontal: false,
    className: null,
};

const NumberWithIcon = ({ icon, iconRotation, isHorizontal, className, ...props }) => (
    <div
        className={classNames([
            'd-flex',
            'align-items-center',
            {
                'justify-content-end': isHorizontal,
                [className]: className !== null,
            },
        ])}
    >
        <span className="me-2" style={ iconRotation !== 0 ? { transform: `rotate(${iconRotation}deg)` } : null }>
            <FontAwesomeIcon icon={icon} />
        </span>
        <Number {...props} />
    </div>
);

NumberWithIcon.propTypes = propTypes;
NumberWithIcon.defaultProps = defaultProps;
NumberWithIcon.isHorizontal = true;

export default NumberWithIcon;
