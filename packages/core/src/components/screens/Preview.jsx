/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as AppPropTypes from '../../PropTypes';
import { ScreenSizeProvider } from '../../contexts/ScreenSizeContext';
import Screen from './Screen';

import styles from '../../styles/screens/preview.module.scss';

const propTypes = {
    screen: AppPropTypes.component.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    className: null,
};

const ScreenPreview = ({ screen, width, height, className }) => {
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
            <Screen
                screen={screen}
                renderFormat="preview"
                className={classNames([
                    styles.container,
                    {
                        [className]: className !== null,
                    },
                ])}
            />
        </ScreenSizeProvider>
    );
};

ScreenPreview.propTypes = propTypes;
ScreenPreview.defaultProps = defaultProps;

export default React.memo(ScreenPreview);
