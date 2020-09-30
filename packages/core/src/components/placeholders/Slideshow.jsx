/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/partials/placeholders.module.scss';

export const Slideshow = (props) => (
    <PlaceholderBlock
        {...props}
        width="100%"
        className={classNames([props.className, styles.slideshow])}
    >
        <FontAwesomeIcon icon={faAngleDoubleRight} className={styles.icon} />
    </PlaceholderBlock>
);

export default Slideshow;
