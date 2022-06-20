import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import HandIcon from '../icons/Hand';

import styles from '../../styles/partials/navigation-button.module.scss';

const propTypes = {
    direction: PropTypes.oneOf(['previous', 'next']),
    onClick: null,
    className: PropTypes.string,
};

const defaultProps = {
    direction: 'next',
    onClick: null,
    className: null,
};

const NavigationButton = ({ direction, onClick className }) => (
    <div className={classNames([styles.container, { [className]: className !== null }])}>
        <div className={styles.inner}>
            <div className={styles.circle} />
            <HandIcon className={styles.hand} />
        </div>
    </div>
);

NavigationButton.propTypes = propTypes;
NavigationButton.defaultProps = defaultProps;

export default NavigationButton;
