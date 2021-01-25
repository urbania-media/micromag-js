/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Number from './Number';

const propTypes = {
    icon: PropTypes.node,
    isHorizontal: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    icon: null,
    isHorizontal: false,
    className: null,
};

const NumberWithIcon = ({ icon, isHorizontal, className, ...props }) => (
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
        <FontAwesomeIcon icon={icon} className="mr-2" />
        <Number {...props} />
    </div>
);

NumberWithIcon.propTypes = propTypes;
NumberWithIcon.defaultProps = defaultProps;
NumberWithIcon.isHorizontal = true;

export default NumberWithIcon;
