/* eslint-disable react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPreview } from '@micromag/core/components';

import styles from '../../styles/partials/micromag-preview.module.scss';

const propTypes = {
    screen: MicromagPropTypes.item,
    title: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    screen: null,
    title: null,
    description: null,
    className: null,
};

const ShareModal = ({ screen, title, description, className }) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className,
            },
        ])}
    >
        <div className={styles.cover}>
            <ScreenPreview screen={screen} width={100} height={150} withSize />
        </div>
        <div className={styles.info}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    </div>
);

ShareModal.propTypes = propTypes;
ShareModal.defaultProps = defaultProps;

export default ShareModal;
