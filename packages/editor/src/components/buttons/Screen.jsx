/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';

import styles from '../../styles/buttons/screen.module.scss';

const propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string,
    href: PropTypes.string,
    label: MicromagPropTypes.label,
    icon: PropTypes.node,
    title: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
    refButton: PropTypes.shape({
        current: PropTypes.any, // eslint-disable-line
    }),
    className: PropTypes.string,
};

const defaultProps = {
    active: false,
    id: null,
    href: null,
    label: null,
    icon: null,
    title: null,
    onClick: null,
    children: null,
    refButton: null,
    className: null,
};

const ScreenButton = ({
    active,
    id,
    href,
    className,
    label,
    icon,
    children,
    title,
    onClick,
    refButton,
}) => (
    <div className={classNames([
        styles.container,
        'rounded',
        {
            [styles.active]: active,
            [className]: className !== null,
        },
    ])}>
        <div className={styles.screen}>
            {children !== null ? (
                children
            ) : (
                <div className={styles.inner}>
                    {icon !== null ? <div className={styles.icon}>{icon}</div> : null}
                    {label !== null ? <div className={styles.label}>{label}</div> : null}
                </div>
            )}
        </div>
        <Button
            className={styles.button}
            withoutStyle
            id={id}
            href={href}
            title={title}
            onClick={onClick}
            refButton={refButton}
        >
            <span className={classNames([styles.border, 'rounded'])} />
        </Button>
    </div>
);

ScreenButton.propTypes = propTypes;
ScreenButton.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <ScreenButton {...props} refButton={ref} />);
