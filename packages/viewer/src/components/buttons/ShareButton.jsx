/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import IconButton from './IconButton';

import styles from '../../styles/buttons/share-button.module.scss';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ShareButton = ({ className, ...props }) => {
    const intl = useIntl();

    return (
        <IconButton
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
            label={intl.formatMessage({
                defaultMessage: 'Share',
                description: 'Button label',
            })}
            iconPosition="left"
            iconClassName={styles.icon}
            icon={
                <svg
                    width="24"
                    height="28"
                    viewBox="0 0 24 28"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.375 14V14.625H12.625V14H11.375ZM12.4419 3.55806C12.1979 3.31398 11.8021 3.31398 11.5581 3.55806L7.58058 7.53553C7.3365 7.77961 7.3365 8.17534 7.58058 8.41942C7.82466 8.6635 8.22039 8.6635 8.46447 8.41942L12 4.88388L15.5355 8.41942C15.7796 8.6635 16.1753 8.6635 16.4194 8.41942C16.6635 8.17534 16.6635 7.77961 16.4194 7.53553L12.4419 3.55806ZM12.625 14V4H11.375V14H12.625Z"
                        fill="currentColor"
                    />
                    <mask id="path-2-inside-1_526_17242" fill="currentColor">
                        <path d="M4 13C4 11.3431 5.34315 10 7 10H17C18.6569 10 20 11.3431 20 13V21C20 22.6569 18.6569 24 17 24H7C5.34315 24 4 22.6569 4 21V13Z" />
                    </mask>
                    <path
                        d="M4 10H20H4ZM21 21C21 23.2091 19.2091 25 17 25H7C4.79086 25 3 23.2091 3 21H5C5 22.1046 5.89543 23 7 23H17C18.1046 23 19 22.1046 19 21H21ZM7 25C4.79086 25 3 23.2091 3 21V14C3 11.7909 4.79086 10 7 10C5.89543 10 5 11.3431 5 13V21C5 22.1046 5.89543 23 7 23V25ZM17 10C19.2091 10 21 11.7909 21 14V21C21 23.2091 19.2091 25 17 25V23C18.1046 23 19 22.1046 19 21V13C19 11.3431 18.1046 10 17 10Z"
                        fill="currentColor"
                        mask="url(#path-2-inside-1_526_17242)"
                    />
                </svg>
            }
            {...props}
        />
    );
};

ShareButton.propTypes = propTypes;
ShareButton.defaultProps = defaultProps;

export default ShareButton;
