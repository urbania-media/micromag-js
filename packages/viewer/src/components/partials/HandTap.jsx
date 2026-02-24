import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import HandIcon from '../icons/Hand';

import styles from '../../styles/partials/hand-tap.module.css';

const propTypes = {
    withoutShadow: PropTypes.bool,
    className: PropTypes.string,
};

const HandTap = ({ withoutShadow = false, className = null }) => (
    <div
        className={classNames([
            styles.container,
            { [styles.withoutShadow]: withoutShadow, [className]: className !== null },
        ])}
    >
        <div className={styles.inner}>
            <div className={styles.circle} />
            <HandIcon className={styles.hand} />
        </div>
    </div>
);

HandTap.propTypes = propTypes;

export default HandTap;
