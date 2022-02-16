/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '../../lib';
import { ScreenSizeProvider, ScreenProvider } from '../../contexts';
import Screen from './Screen';

import styles from '../../styles/screens/preview.module.scss';

const propTypes = {
    screen: MicromagPropTypes.component.isRequired,
    screenState: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    screenState: null,
    width: null,
    height: null,
    className: null,
};

const ScreenPreview = ({ screen, screenState, width, height, className }) => {
    const screenSize = useMemo(
        () => ({
            screen: 'mobile',
            screens: ['mobile'],
            width,
            height,
        }),
        [width, height],
    );
    return (
        <ScreenSizeProvider size={screenSize}>
            <ScreenProvider data={screen} renderContext="preview" screenState={screenState}>
                <Screen
                    screen={screen}
                    renderContext="preview"
                    className={classNames([
                        styles.container,
                        {
                            [className]: className !== null,
                        },
                    ])}
                />
            </ScreenProvider>
        </ScreenSizeProvider>
    );
};

ScreenPreview.propTypes = propTypes;
ScreenPreview.defaultProps = defaultProps;

export default React.memo(ScreenPreview);
