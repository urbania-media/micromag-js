/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Screen from '@micromag/element-screen';
import TextComponent from '@micromag/element-text';
import Image from '@micromag/element-image';
import Heading from '@micromag/element-heading';

import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

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
    const size = useScreenSize();
    const { isPlaceholder } = getRenderFormat(renderFormat);

    const containerClassNames = classNames([
        styles.container,
        {
            [className]: className !== null,
        },
    ]);

    return (
        <Screen
            size={size}
            renderFormat={renderFormat}
            background={background}
            visible={visible}
            active={active}
            className={containerClassNames}
        >
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
        </Screen>
    );
};

TimelineCentered.propTypes = propTypes;
TimelineCentered.defaultProps = defaultProps;

export default TimelineCentered;
