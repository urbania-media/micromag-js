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

const TimelineCentered = ({ items, background, active, visible, renderFormat, className }) => {
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
