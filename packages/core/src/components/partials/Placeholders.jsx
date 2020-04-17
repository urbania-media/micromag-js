/* eslint-disable react/jsx-props-no-spreading, react/destructuring-assignment, react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faAd,
    faMusic,
    faAngleDoubleRight,
    faMapMarkerAlt,
    faMapMarkedAlt,
    faRedo,
    faEye,
} from '@fortawesome/free-solid-svg-icons';

import Placeholder from './Placeholder';
import PlaceholderBlock from './PlaceholderBlock';

import styles from '../../styles/partials/placeholders.module.scss';

export const Text = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.text])}
        height={0.2}
        lines={4}
    />
);

export const ShortText = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.shortText])}
        height={0.2}
        lines={2}
    />
);

export const Line = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.shortText])}
        height={0.2}
        lines={1}
    />
);

export const Title = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.title])}
        height={1}
        lines={1}
        lineMargin={1}
    />
);

export const Subtitle = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.subtitle])}
        height={0.5}
        lines={1}
    />
);

export const Quote = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.subtitle])}
        height={0.5}
        lines={1}
    />
);

export const Image = props => (
    <PlaceholderBlock
        {...props}
        className={classNames([props.className, styles.image])}
        width="100%"
        height="100%"
    />
);

export const SmallImage = props => (
    <PlaceholderBlock
        {...props}
        className={classNames([props.className, styles.image])}
        width="50%"
        height="20%"
    />
);

export const MediumImage = props => (
    <PlaceholderBlock
        {...props}
        className={classNames([props.className, styles.image])}
        width="80%"
        height="40%"
    />
);

export const Button = props => (
    <Placeholder
        {...props}
        className={classNames([props.className, styles.button])}
        height={0.3}
        lines={1}
    />
);

export const Video = props => (
    <PlaceholderBlock
        {...props}
        className={classNames([props.className, styles.video])}
        width="80%"
        height="40%"
    >
        <FontAwesomeIcon icon={faPlay} className={styles.icon} />
    </PlaceholderBlock>
);

export const VideoFull = props => (
    <PlaceholderBlock
        {...props}
        className={classNames([props.className, styles.video])}
        width="100%"
        height="100%"
    >
        <FontAwesomeIcon icon={faPlay} className={styles.icon} />
    </PlaceholderBlock>
);

export const VideoLoop = props => (
    <PlaceholderBlock
        {...props}
        className={classNames([props.className, styles.videoLoop])}
        width="80%"
        height="40%"
    >
        <FontAwesomeIcon icon={faPlay} className={styles.icon} />
        <FontAwesomeIcon icon={faRedo} className={styles.icon} />
    </PlaceholderBlock>
);

export const Map = props => (
    <PlaceholderBlock
        {...props}
        width="100%"
        height="100%"
        className={classNames([props.className, styles.map])}
    >
        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
        <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
    </PlaceholderBlock>
);

export const MapPath = props => (
    <PlaceholderBlock
        {...props}
        width="100%"
        height="100%"
        className={classNames([props.className, styles.mapPath])}
    >
        <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" className={styles.icon} />
    </PlaceholderBlock>
);

export const Timeline = props => (
    <Placeholder {...props} className={classNames([props.className, styles.timeline])} />
);

export const Ad = props => (
    <PlaceholderBlock {...props} width="80%" className={classNames([props.className, styles.ad])}>
        <FontAwesomeIcon icon={faAd} className={styles.icon} />
    </PlaceholderBlock>
);

export const Audio = props => (
    <PlaceholderBlock
        {...props}
        width="80%"
        height="30%"
        className={classNames([props.className, styles.audio])}
    >
        <FontAwesomeIcon icon={faMusic} className={styles.icon} />
    </PlaceholderBlock>
);

export const Slideshow = props => (
    <PlaceholderBlock
        {...props}
        width="100%"
        className={classNames([props.className, styles.slideshow])}
    >
        <FontAwesomeIcon icon={faAngleDoubleRight} className={styles.icon} />
    </PlaceholderBlock>
);

export const Panorama = props => (
    <PlaceholderBlock
        {...props}
        width="100%"
        className={classNames([props.className, styles.slideshow])}
    >
        <FontAwesomeIcon icon={faEye} className={styles.icon} />
    </PlaceholderBlock>
);

export default {
    Text,
    ShortText,
    Line,
    Description: Text,
    Title,
    Subtitle,
    Quote,
    Image,
    SmallImage,
    MediumImage,
    Button,
    Video,
    VideoFull,
    VideoLoop,
    Map,
    MapPath,
    Timeline,
    Ad,
    Audio,
    Slideshow,
    Panorama,
};
