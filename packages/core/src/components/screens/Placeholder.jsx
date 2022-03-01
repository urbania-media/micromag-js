/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { ScreenProvider, ScreenSizeProvider } from '../../contexts';
import { PropTypes as MicromagPropTypes } from '../../lib';
import styles from '../../styles/screens/screen-placeholder.module.scss';
import Screen from './Screen';

const propTypes = {
    screen: MicromagPropTypes.component.isRequired,
    layout: PropTypes.string,
    screenState: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: undefined,
    screenState: null,
    width: null,
    height: null,
    className: null,
};

const ScreenPlaceholder = ({ screen, layout, width, height, screenState, className }) => {
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
            <ScreenProvider data={screen} renderContext="placeholder" screenState={screenState}>
                <Screen
                    screen={screen}
                    layout={layout}
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

ScreenPlaceholder.propTypes = propTypes;
ScreenPlaceholder.defaultProps = defaultProps;

export default React.memo(ScreenPlaceholder);
