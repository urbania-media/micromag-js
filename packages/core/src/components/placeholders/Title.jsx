/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import classNames from 'classnames';
import React from 'react';

import PlaceholderText from '../partials/PlaceholderText';

import styles from '../../styles/placeholders/placeholders.module.scss';

export const Title = (props) => {
    const { height = 0.5, lines = 2, lineMargin = 2 } = props;

    return (
        <PlaceholderText
            {...props}
            className={classNames([props.className, styles.title])}
            height={height}
            lines={lines}
            lineMargin={lineMargin}
        />
    );
};

export default Title;
