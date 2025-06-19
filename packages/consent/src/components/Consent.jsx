import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import CloseButton from './buttons/Close';
import CookiesForm from './forms/Cookies';

import styles from '../styles/consent.module.scss';

const propTypes = {
    consent: PropTypes.arrayOf(PropTypes.string),
    urls: PropTypes.shape({
        privacy: PropTypes.string,
        terms: PropTypes.string,
    }),
    labels: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        privacy: PropTypes.string,
        terms: PropTypes.string,
    }),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
    withClose: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    consent: [
        'functionality_storage',
        'analytics_storage',
        'ad_storage',
        'ad_personalization',
        'ad_user_data',
    ],
    urls: null,
    labels: null,
    onChange: null,
    onSubmit: null,
    onClose: null,
    withClose: false,
    className: null,
    children: null,
};

function Consent({
    consent,
    urls,
    labels,
    onChange,
    onSubmit,
    onClose,
    withClose,
    className,
    children,
}) {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            {onClose !== null && withClose ? (
                <CloseButton
                    type="button"
                    className={styles.close}
                    onClick={onClose}
                    aria-label="Close consent form"
                />
            ) : null}
            {children}
            <CookiesForm
                className={styles.form}
                consent={consent}
                urls={urls}
                labels={labels}
                onChange={onChange}
                onSubmit={onSubmit}
                onClose={onClose}
            />
        </div>
    );
}

Consent.propTypes = propTypes;
Consent.defaultProps = defaultProps;

export default Consent;
