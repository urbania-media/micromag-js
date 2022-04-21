import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from '../../styles/partials/hand-tap.module.scss';
import HandIcon from '../icons/Hand';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const HandTap = ({ className }) => (
    <div className={classNames([styles.container, { [className]: className !== null }])}>
        <div className={styles.inner}>
            <div className={styles.circle} />
            <HandIcon className={styles.hand} />
        </div>
    </div>
);

HandTap.propTypes = propTypes;
HandTap.defaultProps = defaultProps;

export default HandTap;
