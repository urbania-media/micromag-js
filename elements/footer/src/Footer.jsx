/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import CallToAction from '@micromag/element-call-to-action';

import styles from './styles.module.scss';

const propTypes = {
    callToAction: MicromagPropTypes.callToAction,
    className: PropTypes.string,
};

const defaultProps = {
    callToAction: null,
    className: null,
};

function Footer({ callToAction, className }) {
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
Footer.defaultProps = defaultProps;

export default Footer;
