/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as MicromagPropTypes from '../../PropTypes';
import { ScreenSizeProvider } from '../../contexts/ScreenSizeContext';
import { ScreenRenderProvider } from '../../contexts/ScreenRenderContext';
import Screen from './Screen';

import styles from '../../styles/screens/screen-placeholder.module.scss';

const propTypes = {
    screen: MicromagPropTypes.component.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    className: null,
};

const ScreenPlaceholder = ({ screen, width, height, className }) => {
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
            <ScreenRenderProvider context="placeholder">
                <Screen
                    screen={screen}
                    className={classNames([
                        styles.container,
                        {
                            [className]: className !== null,
                        },
                    ])}
                />
            </ScreenRenderProvider>
        </ScreenSizeProvider>
    );
};

ScreenPlaceholder.propTypes = propTypes;
ScreenPlaceholder.defaultProps = defaultProps;

export default React.memo(ScreenPlaceholder);
