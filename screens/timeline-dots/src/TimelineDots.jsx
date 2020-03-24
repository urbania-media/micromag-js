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
    // props from fields
    text: MicromagPropTypes.backgroundComponent,
    background: MicromagPropTypes.backgroundComponent,
    isPreview: PropTypes.bool,
    isPlaceholder: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    // props from fields
    text: null,
    background: null,
    isPreview: true,
    isPlaceholder: false,
    className: null,
};

const TimelineDots = ({ text, background, isPreview, isPlaceholder, className }) => {
    // Gives you the story width / height if necessary
    const { width, height, screen, screens } = useScreenSize();
    // const innerStyle = {
    //     width,
    //     height,
    // };
    console.log(width, height, screen, screens);

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
                        {isPlaceholder ? (
                            <Placeholders.Text className={styles.placeholder} />
                        ) : (
                            <TextComponent {...text} />
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
