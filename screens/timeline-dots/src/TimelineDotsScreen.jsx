/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/component-text';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Image from '@micromag/component-image';
import Heading from '@micromag/component-heading';
import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    title: MicromagPropTypes.textComponent,
    items: PropTypes.arrayOf(MicromagPropTypes.textComponent),
    background: MicromagPropTypes.backgroundComponent,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    title: null,
    items: null,
    background: null,
    renderFormat: 'view',
    className: null,
};

const TimelineDots = ({ title, items, background, renderFormat, className }) => {
    const { width, height } = useScreenSize();

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isPlaceholder]: renderFormat === 'placeholder',
                    [styles.isPreview]: renderFormat === 'preview',
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame withScroll width={width} height={height}>
                    <div className={styles.inner}>
                        {title !== null && renderFormat !== 'placeholder' ? (
                            <div className={styles.title}>{title.body}</div>
                        ) : (
                            <Placeholders.Title className={styles.placeholder} />
                        )}
                        <div className={styles.timelineContainer}>
                            {items !== null && renderFormat !== 'placeholder' ? (
                                items.map(({ text, image, heading }, index) => {
                                    return (
                                        <div className={styles.timelineBlock}>
                                            <div className={styles.mainContent}>
                                                <div className={styles.dot} />
                                                {heading !== null ? (
                                                    <Heading
                                                        key={`item-heading-${index + 1}`}
                                                        className={styles.heading}
                                                        {...heading}
                                                    />
                                                ) : null}
                                                {image !== null ? (
                                                    <div className={styles.imageContainer}>
                                                        <Image
                                                            key={`item-image-${index + 1}`}
                                                            className={styles.image}
                                                            {...image}
                                                        />
                                                    </div>
                                                ) : null}
                                                <TextComponent
                                                    key={`item-body-${index + 1}`}
                                                    className={styles.item}
                                                    {...text}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className={styles.timelineContainer}>
                                    <div className={styles.timelineBlock}>
                                        <div className={styles.mainContent}>
                                            <div className={styles.dot} />
                                            <Placeholders.Title className={styles.placeholder} />
                                            <Placeholders.Image className={styles.placeholder} />
                                            <Placeholders.Text className={styles.placeholder} />
                                        </div>
                                    </div>
                                    <div className={styles.timelineBlock}>
                                        <div className={styles.mainContent}>
                                            <div className={styles.dot} />
                                            <Placeholders.Title className={styles.placeholder} />
                                            <Placeholders.Text className={styles.placeholder} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

TimelineDots.propTypes = propTypes;
TimelineDots.defaultProps = defaultProps;

export default TimelineDots;
