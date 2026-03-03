/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';
import isString from 'lodash/isString';

import styles from '../styles/input-group.module.css';

interface InputGroupProps {
    prepend?: React.ReactNode;
    children?: React.ReactNode;
    append?: React.ReactNode;
    size?: null | 'sm' | 'lg';
    className?: string;
}

function InputGroup(
    { prepend = null, children = null, append = null, size = null, className = null },
) {
    return (
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
            {isString(prepend) ? <div className="input-group-text">{prepend}</div> : prepend}
            {children}
            {isString(append) ? <div className="input-group-text">{append}</div> : append}
        </div>
    );
}

export default InputGroup;
