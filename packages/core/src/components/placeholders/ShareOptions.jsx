/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import PlaceholderBlock from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/placeholders.module.scss';

export const Title = (props) => (
    <PlaceholderBlock
        {...props}
        width="100%"
        height="100%"
        className={classNames([
            styles.container,
            {
                [props.className]: props.className !== null,
            }
        ])}
    >
        <FontAwesomeIcon icon={faCircle} className={styles.icon} />
        <FontAwesomeIcon icon={faCircle} className={styles.icon} />
        <FontAwesomeIcon icon={faCircle} className={styles.icon} />
    </PlaceholderBlock>
);

export default Title;
