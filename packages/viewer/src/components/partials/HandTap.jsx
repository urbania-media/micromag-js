import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import HandIcon from '../icons/Hand';

import styles from '../../styles/partials/hand-tap.module.scss';

const propTypes = {
    withoutShadow: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    withoutShadow: false,
    className: null,
};

const HandTap = ({ withoutShadow, className }) => (
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
HandTap.defaultProps = defaultProps;

export default HandTap;
