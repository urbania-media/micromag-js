/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Badge from '@micromag/element-badge';

import styles from './styles.module.scss';

const propTypes = {
    badge: MicromagPropTypes.badge,
    fade: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    badge: null,
    fade: false,
    className: null,
};

function Header({ badge, fade, className }) {
    if (badge === null) return null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.fade]: fade === true,
                    [className]: className !== null,
                },
            ])}
        >
            {badge !== null ? <Badge className={styles.badge} {...badge} /> : null}
        </div>
    );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
