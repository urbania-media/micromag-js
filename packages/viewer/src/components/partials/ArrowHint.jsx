import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { ArrowIcon } from '@micromag/core/components';

import styles from '../../styles/partials/arrow-hint.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ArrowHint = ({ className }) => (
    <div className={classNames([styles.container, { [className]: className !== null }])}>
        <div className={styles.inner}>
            <ArrowIcon className={styles.arrow} />
        </div>
    </div>
);

ArrowHint.propTypes = propTypes;
ArrowHint.defaultProps = defaultProps;

export default ArrowHint;
