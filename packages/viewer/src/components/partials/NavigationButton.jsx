import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

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

const NavigationButton = ({ direction, onClick, className }) => (
    <button
        type="button"
        className={classNames([styles.container, { [className]: className !== null }])}
        onClick={onClick}
    >
        <FontAwesomeIcon
            className={styles.arrow}
            icon={direction === 'previous' ? faArrowLeft : faArrowRight}
        />
        <span className="sr-only">
            {direction === 'previous' ? (
                <FormattedMessage
                    defaultMessage="Go to previous screen"
                    description="Button label"
                />
            ) : (
                <FormattedMessage defaultMessage="Go to next screen" description="Button label" />
            )}
        </span>
    </button>
);

NavigationButton.propTypes = propTypes;
NavigationButton.defaultProps = defaultProps;

export default NavigationButton;
