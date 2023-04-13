/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Badge from '@micromag/element-badge';

import styles from './styles.module.scss';

const propTypes = {
    badge: MicromagPropTypes.badge,
    className: PropTypes.string,
};

const defaultProps = {
    badge: null,
    className: null,
};

function Header({ badge, className }) {
    if (badge === null) return null;

    return (
        <div
            className={classNames([
                styles.container,
                {
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
