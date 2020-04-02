/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/component-text';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
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

const SurveyCheckbox = ({ items, background, renderFormat, className }) => {
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
                            {items !== null
                                ? items.map(({ text, image, heading }, index) => {
                                      return renderFormat === 'placeholder' ? (
                                          <Placeholders.Text
                                              key={`item-body-${index + 1}`}
                                              className={styles.placeholder}
                                          />
                                      ) : (
                                          <TextComponent
                                              key={`item-body-${index + 1}`}
                                              className={styles.item}
                                              {...text}
                                          />
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

SurveyCheckbox.propTypes = propTypes;
SurveyCheckbox.defaultProps = defaultProps;

export default SurveyCheckbox;
