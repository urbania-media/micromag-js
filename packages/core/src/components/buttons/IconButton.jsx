/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '../../lib';

import Button from './Button';

import styles from '../../styles/buttons/icon-button.module.scss';

const propTypes = {
    className: PropTypes.string,
    onClick: null,
    label: PropTypes.node,
    icon: PropTypes.node,
    theme: MicromagPropTypes.viewerTheme,
};

const defaultProps = {
    className: null,
    onClick: null,
    label: null,
    icon: null,
    theme: null,
};

const IconButton = ({ className, onClick, label, icon, theme, ...props }) => (
    <Button
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
            },
        ])}
        labelClassName={styles.label}
        iconClassName={styles.icon}
        label={label}
        icon={icon}
        onClick={onClick}
        withoutBootstrapStyles
        {...props}
    />
);

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
