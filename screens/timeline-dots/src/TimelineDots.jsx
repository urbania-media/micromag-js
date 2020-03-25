/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import Heading from '@micromag/component-heading';
import TextComponent from '@micromag/component-text';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    // props from fields
    items: PropTypes.arrayOf(MicromagPropTypes.textComponent),
    background: MicromagPropTypes.backgroundComponent,
    image: MicromagPropTypes.imageComponent,
    isPreview: PropTypes.bool,
    isPlaceholder: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    // props from fields
    items: null,
    background: null,
    image: null,
    isPreview: true,
    isPlaceholder: false,
    className: null,
};

const TimelineDots = ({ items, background, isPreview, isPlaceholder, className }) => {
    // Gives you the story width / height if necessary
    const { width, height, screens } = useScreenSize();
    // const innerStyle = {
    //     width,
    //     height,
    // };
    console.log(items, styles);

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
                            ? items.map(({ text: textValue }, index) => {
                                  return isPlaceholder ? (
                                      <Placeholders.Text
                                          key={`item-${index + 1}`}
                                          className={styles.placeholder}
                                      />
                                  ) : (
                                      <TextComponent
                                          key={`item-${index + 1}`}
                                          className={styles.item}
                                          {...textValue}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

// <div className={styles.inner}>
//     {isPlaceholder ? (
//         <Placeholders.Text className={styles.placeholder} />
//     ) : (
//         <TextComponent className={styles.item} {...text} />
//     )}
// </div>

TimelineDots.propTypes = propTypes;
TimelineDots.defaultProps = defaultProps;

export default TimelineDots;
