import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

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
            <svg
                className={styles.arrow}
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="currentColor"
            >
                <polygon points="9.62 4.62 5 0 0.38 4.62 1.44 5.68 4.25 2.87 4.25 14.39 5.75 14.39 5.75 2.87 8.56 5.68 9.62 4.62" />
            </svg>
        </div>
    </div>
);

ArrowHint.propTypes = propTypes;
ArrowHint.defaultProps = defaultProps;

export default ArrowHint;
