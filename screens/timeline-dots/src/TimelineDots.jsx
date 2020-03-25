/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Heading from '@micromag/component-heading';
import TextComponent from '@micromag/component-text';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    // props from fields
    heading: MicromagPropTypes.headingComponent,
    text: MicromagPropTypes.textComponent,
    items: PropTypes.arrayOf(MicromagPropTypes.textComponent),
    background: MicromagPropTypes.backgroundComponent,
    image: MicromagPropTypes.imageComponent,
    isPreview: PropTypes.bool,
    isPlaceholder: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    // props from fields
    heading: null,
    text: null,
    items: null,
    background: null,
    image: null,
    isPreview: true,
    isPlaceholder: false,
    className: null,
};

const TimelineDots = ({
    heading,
    text,
    items,
    background,
    image,
    isPreview,
    isPlaceholder,
    className,
}) => {
    // Gives you the story width / height if necessary
    const { width, height, screen, screens } = useScreenSize();
    // const innerStyle = {
    //     width,
    //     height,
    // };
    console.log(width, height, screen, screens);

    return (
        <div
            className={classNames([
                styles.container,
                screens.map(screenName => styles[`screen-${screenName}`]),
                {
                    [styles.isPreview]: isPreview,
                    [styles.isPlaceholder]: isPlaceholder,
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height}>
                    <div className={styles.inner}>
                        {items !== null
                            ? items.map(({ text }) => {
                                console.log(text)
                                  isPlaceholder ? (
                                      <Placeholders.Text className={styles.placeholder} />
                                  ) : (
                                      <TextComponent className={styles.textItem} {...text} />
                                  );
                              })
                            : null}
                    </div>
                    <div className={styles.testText}>
                        {isPlaceholder ? (
                            <Placeholders.Text className={styles.placeholder} />
                        ) : (
                            <TextComponent className={styles.textItem} {...text} />
                        )}
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

TimelineDots.propTypes = propTypes;
TimelineDots.defaultProps = defaultProps;

export default TimelineDots;
