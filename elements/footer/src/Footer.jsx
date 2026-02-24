/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import CallToAction from '@micromag/element-call-to-action';

import styles from './styles.module.css';

const propTypes = {
    callToAction: MicromagPropTypes.callToAction,
    className: PropTypes.string,
};

function Footer({ callToAction = null, className = null }) {
    if (callToAction === null) return null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <CallToAction {...callToAction} />
        </div>
    );
}

Footer.propTypes = propTypes;

export default Footer;
