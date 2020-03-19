/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import Placeholder from './Placeholder';

import styles from '../../styles/partials/placeholders.scss';

const Text = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.text])}
        height={0.2}
        lines={4}
    />
);

const Title = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.title])}
        height={1}
        lines={1}
        lineMargin={1}
    />
);

const Subtitle = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.subtitle])}
        height={0.5}
        lines={1}
    />
);

const Image = props => (
    <Placeholder {...props} className={classNames([props.className, styles.image])} />
);
const Video = props => <Placeholder {...props} />;
const Map = props => <Placeholder {...props} />;
const Timeline = props => <Placeholder {...props} />;

export default {
    Text,
    Description: Text,
    Title,
    Subtitle,
    Image,
    Video,
    Map,
    Timeline,
};
