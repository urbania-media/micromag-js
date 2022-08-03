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
        className={classNames([
            styles.container,
            styles[direction],
            {
                [className]: className !== null,
            },
        ])}
        onClick={onClick}
    >
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
