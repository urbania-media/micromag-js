/* eslint-disable react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent } from '@fortawesome/free-solid-svg-icons';

import PlaceholderBlock from '../partials/PlaceholderBlock';
import PlaceholderText from '../partials/PlaceholderText';

import styles from '../../styles/placeholders/survey-answer.module.scss';

export const Answer = ({ width = '75%', height = '0.3em', className }) => (
    <div className={classNames([
        styles.container,
        {
            [className]: className !== null,
        }
    ])}>
        <PlaceholderBlock outline width={width} height={height} className={styles.block}>
            <PlaceholderText line={1} height="0.2em" />
        </PlaceholderBlock>
        <div className={styles.percent}>
            <FontAwesomeIcon className={styles.percentIcon} icon={faPercent} />
        </div>
    </div>
);

export default Answer;
