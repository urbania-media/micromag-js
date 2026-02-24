import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { ArrowIcon } from '@micromag/core/components';

import styles from '../../styles/partials/arrow-hint.module.css';

const propTypes = {
    withoutShadow: PropTypes.bool,
    className: PropTypes.string,
};

const ArrowHint = ({ withoutShadow = false, className = null }) => (
    <div
        className={classNames([
            styles.container,
            { [styles.withoutShadow]: withoutShadow, [className]: className !== null },
        ])}
    >
        <div className={styles.inner}>
            <ArrowIcon className={styles.arrow} />
        </div>
    </div>
);

ArrowHint.propTypes = propTypes;

export default ArrowHint;
