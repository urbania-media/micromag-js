/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import TextComponent from '@micromag/element-text';
import Image from '@micromag/element-image';
import Heading from '@micromag/element-heading';

import {
    PlaceholderTitle,
    PlaceholderText,
    PlaceholderImage,
    PropTypes as MicromagPropTypes,
} from '@micromag/core';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

export const layouts = ['normal'];

const propTypes = {
    items: PropTypes.arrayOf(MicromagPropTypes.textElement),
    background: MicromagPropTypes.backgroundElement,
    renderFormat: MicromagPropTypes.renderFormat,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    items: null,
    background: null,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const TimelineCentered = ({ items, background, visible, active, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isView, isEditor } = getRenderFormat(renderFormat);

    const containerClassNames = classNames([
        styles.container,
        {
            [className]: className !== null,
        },
    ]);

    return (
        <div className={containerClassNames}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
            <div className={styles.content}>
                <Container width={width} height={height} visible={visible}>
                    <div className={styles.inner}>
                        <div className={styles.timelineContainer}>
                            {!isPlaceholder ? (
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
                                                                      key={`item-image-${
                                                                          index + 1
                                                                      }`}
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
                                            <PlaceholderTitle className={styles.placeholder} />
                                            <PlaceholderImage className={styles.placeholder} />
                                            <PlaceholderText className={styles.placeholder} />
                                        </div>
                                    </div>
                                    <div className={styles.timelineBlock}>
                                        <div className={styles.mainContent}>
                                            <PlaceholderText className={styles.placeholder} />
                                        </div>
                                    </div>
                                    <div className={styles.timelineBlock}>
                                        <div className={styles.mainContent}>
                                            <PlaceholderTitle className={styles.placeholder} />
                                            <PlaceholderText className={styles.placeholder} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

TimelineCentered.propTypes = propTypes;
TimelineCentered.defaultProps = defaultProps;

export default TimelineCentered;
