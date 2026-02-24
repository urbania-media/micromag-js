/* eslint-disable react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import MicromagIcon from '../icons/Micromag';

import styles from '../../styles/partials/micromag-branding.module.css';

const propTypes = {
    className: PropTypes.string,
};

const MicromagBranding = ({ className = null }) => (
    <div className={classNames([styles.container, { [className]: className }])}>
        <a
            href="https://micromag.media"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
        >
            <span className={styles.text}>
                <FormattedMessage
                    defaultMessage="This Micromag was"
                    description="Micromag branding"
                />
                <br />
                <FormattedMessage defaultMessage="created with" description="Micromag branding" />
            </span>
            <MicromagIcon className={styles.icon} />
        </a>
    </div>
);

MicromagBranding.propTypes = propTypes;

export default MicromagBranding;
