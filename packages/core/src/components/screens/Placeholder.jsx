/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as MicromagPropTypes from '../../PropTypes';
import { ScreenSizeProvider } from '../../contexts/ScreenSizeContext';
import { ScreenProvider } from '../../contexts/ScreenContext';
import Screen from './Screen';

import styles from '../../styles/screens/screen-placeholder.module.scss';

const propTypes = {
    screen: MicromagPropTypes.component.isRequired,
    layout: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: undefined,
    width: null,
    height: null,
    className: null,
};

const ScreenPlaceholder = ({ screen, layout, width, height, className }) => {
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
            <ScreenProvider data={screen} renderContext="placeholder">
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
