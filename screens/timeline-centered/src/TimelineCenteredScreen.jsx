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
    items: PropTypes.arrayOf(MicromagPropTypes.textComponent),
    background: MicromagPropTypes.backgroundComponent,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    items: null,
    background: null,
    renderFormat: 'view',
    className: null,
};

const TimelineCentered = ({ items, background, renderFormat, className }) => {
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
                        <div className={styles.timelineContainer}>
                            {renderFormat !== 'placeholder' ? (
                                <>
                                    {items !== null
                                        ? items.map(({ text, image, heading }, index) => {
                                              return (
                                                  <div
                                                      className={styles.timelineBlock}
                                                      key={`block-${index + 1}`}
                                                  >
                                                      <div className={styles.mainContent}>
                                                          {heading !== null ? (
                                                              <Heading
                                                                  key={`item-heading-${index + 1}`}
                                                                  className={styles.heading}
                                                                  {...heading}
                                                              />
                                                          ) : null}
                                                          {image !== null ? (
                                                              <div
                                                                  className={styles.imageContainer}
                                                              >
                                                                  <Image
                                                                      key={`item-image-${index +
                                                                          1}`}
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
                                </>
                            ) : (
                                <>
                                    <div className={styles.timelineBlock}>
                                        <div className={styles.mainContent}>
                                            <Placeholders.Title className={styles.placeholder} />
                                            <Placeholders.Image className={styles.placeholder} />
                                            <Placeholders.Text className={styles.placeholder} />
                                        </div>
                                    </div>
                                    <div className={styles.timelineBlock}>
                                        <div className={styles.mainContent}>
                                            <Placeholders.Text className={styles.placeholder} />
                                        </div>
                                    </div>
                                    <div className={styles.timelineBlock}>
                                        <div className={styles.mainContent}>
                                            <Placeholders.Title className={styles.placeholder} />
                                            <Placeholders.Text className={styles.placeholder} />
                                        </div>
                                    </div>
                                </>
                            )}
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
