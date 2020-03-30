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

const TimelineCentered = ({ items, background, isPreview, isPlaceholder, className }) => {
    // Gives you the story width / height if necessary
    const { width, height } = useScreenSize();

    console.log(items)

    return (
        <div
            className={classNames([
                styles.container,
                // screens.map(screenName => styles[`screen-${screenName}`]),
                {
                    [styles.isPreview]: isPreview,
                    [styles.isPlaceholder]: isPlaceholder,
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame withScroll width={width} height={height}>
                    <div className={styles.inner}>
                        <div className={styles.timelineContainer}>
                            {items !== null
                                ? items.map(({ text, image, heading }, index) => {
                                      return isPlaceholder ? (
                                          <div className={styles.timelineBlock}>
                                              <div className={styles.mainContent}>
                                                  {heading !== null ? (
                                                      <Placeholders.Heading
                                                          key={`item-heading-${index + 1}`}
                                                          className={styles.placeholder}
                                                      />
                                                  ) : null}
                                                  {image !== null ? (
                                                      <Placeholders.Image
                                                          key={`item-image-${index + 1}`}
                                                          className={styles.placeholder}
                                                      />
                                                  ) : null}
                                                  <Placeholders.Text
                                                      key={`item-body-${index + 1}`}
                                                      className={styles.placeholder}
                                                  />
                                              </div>
                                          </div>
                                      ) : (
                                          <div className={styles.timelineBlock}>
                                              <div className={styles.mainContent}>
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
                                : null}
                        </div>
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

TimelineCentered.propTypes = propTypes;
TimelineCentered.defaultProps = defaultProps;

export default TimelineCentered;
