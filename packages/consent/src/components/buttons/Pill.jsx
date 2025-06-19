/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/pill.module.scss';

const propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    active: PropTypes.bool,
    invert: PropTypes.bool,
    disabled: PropTypes.bool,
    dark: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    children: null,
    color: null,
    backgroundColor: null,
    active: false,
    invert: false,
    disabled: false,
    dark: false,
    className: null,
};

function PillButton({
    children,
    color,
    backgroundColor,
    className,
    active,
    disabled,
    invert,
    dark,
    ...props
}) {
    return (
        <Button
            className={classNames([
                styles.container,
                {
                    [styles.active]: active,
                    [styles.dark]: dark,
                    [styles.invert]: invert,
                    [styles.disabled]: disabled,
                    [className]: className !== null,
                },
            ])}
            {...props}
            style={{ color, backgroundColor }}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}

PillButton.defaultProps = defaultProps;
PillButton.propTypes = propTypes;

export default PillButton;
