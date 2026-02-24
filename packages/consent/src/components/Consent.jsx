import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import CloseButton from './buttons/Close';
import CookiesForm from './forms/Cookies';

import styles from '../styles/consent.module.css';

const propTypes = {
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

function Consent({ urls = null, labels = null, onChange = null, onSubmit = null, onClose = null, withClose = false, className = null, children = null }) {
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

export default Consent;
