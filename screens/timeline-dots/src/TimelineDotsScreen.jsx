/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/element-text';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
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
    const { width, height } = useScreenSize();
    const { isPlaceholder, isPreview, isSimple, isEditor, isView } = getRenderFormat(renderFormat);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.isPreview]: isPreview,
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
                className={styles.background}
            >
                <Frame width={width} height={height} visible={visible} withScroll={!isSimple}>
                    <div className={styles.inner}>
                        {!isPlaceholder ? (
                            <>
                                {title !== null ? (
                                    <div className={styles.title}>{title.body}</div>
                                ) : null}
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
                </Frame>
            </Background>
        </div>
    );
};

TimelineDots.propTypes = propTypes;
TimelineDots.defaultProps = defaultProps;

export default TimelineDots;
