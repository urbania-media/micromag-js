/* eslint-disable react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenPreview } from '@micromag/core/components';

import styles from '../../styles/partials/micromag-preview.module.scss';

const propTypes = {
    screen: MicromagPropTypes.screen,
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    screen: null,
    title: null,
    url: null,
    description: null,
    className: null,
};

const MicromagPreview = ({ screen, title, url, description, className }) => (
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
            <h3 className={styles.title}>{title}</h3>
            {url ? <div className={styles.url}>{url}</div> : null}
            <p>{description}</p>
        </div>
    </div>
);

MicromagPreview.propTypes = propTypes;
MicromagPreview.defaultProps = defaultProps;

export default MicromagPreview;
