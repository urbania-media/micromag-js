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
    title: MicromagPropTypes.textElement,
    items: PropTypes.arrayOf(MicromagPropTypes.textElement),
    background: MicromagPropTypes.backgroundElement,
    renderFormat: MicromagPropTypes.renderFormat,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    title: null,
    items: null,
    background: null,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const TimelineDots = ({ title, items, background, visible, active, renderFormat, className }) => {
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
                {!isPlaceholder ? (
                    <>
                        {title !== null ? <div className={styles.title}>{title.body}</div> : null}
                        <div className={styles.timelineContainer}>
                            {items !== null
                                ? items.map(({ text, image, heading }, index) => {
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
                                : null}
                        </div>
                    </>
                ) : (
                    <>
                        <Placeholders.Title className={styles.placeholder} />
                        <div className={styles.timelineContainer}>
                            <div className={styles.timelineBlock}>
                                <div className={styles.mainContent}>
                                    <div className={styles.dot} />
                                    <Placeholders.Subtitle className={styles.placeholder} />
                                    <Placeholders.Image className={styles.placeholder} />
                                    <Placeholders.Text className={styles.placeholder} />
                                </div>
                            </div>
                            <div className={styles.timelineBlock}>
                                <div className={styles.mainContent}>
                                    <div className={styles.dot} />
                                    <Placeholders.Subtitle className={styles.placeholder} />
                                    <Placeholders.Text className={styles.placeholder} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Screen>
    );
};

TimelineDots.propTypes = propTypes;
TimelineDots.defaultProps = defaultProps;

export default TimelineDots;
