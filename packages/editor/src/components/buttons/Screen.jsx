/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/screen.module.scss';

const propTypes = {
    active: PropTypes.bool,
    label: MicromagPropTypes.label,
    icon: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
};

const defaultProps = {
    active: false,
    label: null,
    icon: null,
    children: null,
    className: null,
};

const ScreenButton = ({ active, className, label, icon, children, ...props }) => (
    <Button
        className={classNames([
            styles.container,
            {
                [styles.active]: active,
                [className]: className !== null,
            },
        ])}
        withoutStyle
        {...props}
    >
        <span className={styles.border} />
        <span className={styles.screen}>
            {children !== null ? (
                children
            ) : (
                <span className={styles.inner}>
                    {icon !== null ? (
                        <span className={styles.icon}>
                            {icon}
                        </span>
                    ) : null}
                    {label !== null ? (
                        <span className={styles.label}>
                            {label}
                        </span>
                    ) : null}
                </span>
            )}
        </span>
    </Button>
);

ScreenButton.propTypes = propTypes;
ScreenButton.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <ScreenButton {...props} refButton={ref} />);
