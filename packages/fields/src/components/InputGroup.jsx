/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isString from 'lodash/isString';

// import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../styles/input-group.module.scss';

const propTypes = {
    prepend: PropTypes.node,
    children: PropTypes.node,
    append: PropTypes.node,
    size: PropTypes.oneOf([null, 'sm', 'lg']),
    className: PropTypes.string,
};

const defaultProps = {
    prepend: null,
    children: null,
    append: null,
    size: null,
    className: null,
};

const InputGroup = ({ prepend, children, append, size, className }) => (
    <div
        className={classNames([
            'input-group',
            {
                [`input-group-${size}`]: size !== null,
            },
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
    >
        {prepend !== null ? (
            <div className="input-group-prepend">
                {isString(prepend) ? <div className="input-group-text">{prepend}</div> : prepend}
            </div>
        ) : null}
        {children}
        {append !== null ? (
            <div className="input-group-append">
                {isString(append) ? <div className="input-group-text">{append}</div> : append}
            </div>
        ) : null}
    </div>
);

InputGroup.propTypes = propTypes;
InputGroup.defaultProps = defaultProps;

export default InputGroup;
