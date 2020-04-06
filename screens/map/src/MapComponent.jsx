/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    background: MicromagPropTypes.backgroundComponent,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    background: null,
    renderFormat: 'view',
    className: null,
};

const MapComponent = ({ background, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height}>
                    <div className={styles.inner}>{isSimple ? 'simple' : 'A map'}</div>
                </Frame>
            </Background>
        </div>
    );
};

MapComponent.propTypes = propTypes;
MapComponent.defaultProps = defaultProps;

export default MapComponent;
