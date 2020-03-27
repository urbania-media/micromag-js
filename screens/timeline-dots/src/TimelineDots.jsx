/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/component-text';
import Heading from '@micromag/component-heading';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Image from '@micromag/component-image';
import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    // props from fields
    title: MicromagPropTypes.textComponent,
    items: PropTypes.arrayOf(MicromagPropTypes.textComponent),
    background: MicromagPropTypes.backgroundComponent,
    isPreview: PropTypes.bool,
    isPlaceholder: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    // props from fields
    title: null,
    items: null,
    background: null,
    isPreview: true,
    isPlaceholder: false,
    className: null,
};

const TimelineDots = ({ title, items, background, isPreview, isPlaceholder, className }) => {
    // Gives you the story width / height if necessary
    const { width, height, screens } = useScreenSize();

    let finalTitle = null;
    if (title !== null) {
        const titleText = title.text;
        finalTitle = isPlaceholder ? (
            <Placeholders.Text className={styles.placeholder} />
        ) : (
            <TextComponent {...titleText} />
        );
    }

    console.log(items)

    return (
        <div
            className={classNames([
                styles.container,
                screens.map(screenName => styles[`screen-${screenName}`]),
                {
                    [styles.isPreview]: isPreview,
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.withImage]: (items.image || null)!== null ? items.image : null,
                    [styles.withHeading]: (items.heading || null)!== null ? items.heading : null,
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame withScroll width={width} height={height}>
                    <div className={styles.inner}>
                        <div className={styles.title}>{finalTitle}</div>
                        <div className={styles.timelineContainer}>
                            {items !== null
                                ? items.map(({ text: textValue, image, heading }, index) => {
                                      return isPlaceholder ? (
                                          <div className={styles.timelineBlock}>
                                              <div className={styles.dot} />
                                              <div className={styles.mainContent}>
                                                  {image !== null ? (
                                                      <Placeholders.Image
                                                          className={styles.placeholder}
                                                      />
                                                  ) : null}
                                                  {heading !== null ? (
                                                      <Placeholders.Text
                                                          className={styles.placeholder}
                                                      />
                                                  ) : null}
                                                  <Placeholders.Text
                                                      key={`item-${index + 1}`}
                                                      className={styles.placeholder}
                                                  />
                                              </div>
                                          </div>
                                      ) : (
                                          <div className={styles.timelineBlock}>
                                              <div className={styles.dot} />
                                              <div className={styles.mainContent}>
                                                  {image !== null ? (
                                                      <Image
                                                          key={`item-image-${index + 1}`}
                                                          className={styles.image}
                                                          {...image}
                                                      />
                                                  ) : null}
                                                  {heading !== null ? (
                                                      <Heading
                                                          key={`item-heading-${index + 1}`}
                                                          className={styles.image}
                                                          {...heading}
                                                      />
                                                  ) : null}
                                                  <TextComponent
                                                      key={`item-${index + 1}`}
                                                      className={styles.item}
                                                      {...textValue}
                                                  />
                                              </div>
                                          </div>
                                      );
                                  })
                                : null}
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
