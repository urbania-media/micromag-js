/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import isString from 'lodash/isString';
import React from 'react';

import styles from '../styles/input-group.module.css';

interface InputGroupProps {
    prepend?: React.ReactNode | null;
    children?: React.ReactNode | null;
    append?: React.ReactNode | null;
    size?: null | 'sm' | 'lg';
    className?: string | null;
}

function InputGroup({
    prepend = null,
    children = null,
    append = null,
    size = null,
    className = null,
}: InputGroupProps) {
    return (
        <div
            className={classNames([
                'input-group',
                {
                    [`input-group-${size}`]: size !== null,
                },
                styles.container,
                className,
            ])}
        >
            {isString(prepend) ? <div className="input-group-text">{prepend}</div> : prepend}
            {children}
            {isString(append) ? <div className="input-group-text">{append}</div> : append}
        </div>
    );
}

export default InputGroup;
