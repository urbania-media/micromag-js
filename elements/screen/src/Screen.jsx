/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    size: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
    }).isRequired,
    visible: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    background: MicromagPropTypes.backgroundElement,
    spacing: MicromagPropTypes.spacing,
    renderFormat: MicromagPropTypes.renderFormat.isRequired,
    withScroll: PropTypes.bool,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    background: null,
    spacing: 0,
    withScroll: false,
    className: null,
    containerClassName: null,
    children: null,
};

const Screen = ({
    size,
    visible,
    active,
    background,
    spacing,
    renderFormat,
    withScroll,
    className,
    containerClassName,
    children,
}) => {
    const { width, height } = size;
    const { isPlaceholder, isEditor, isView, isSimple } = getRenderFormat(renderFormat);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: isSimple,
                    [styles.placeholder]: isPlaceholder,
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            >
                <Container
                    width={width}
                    height={height}
                    visible={visible}
                    className={containerClassName}
                    withScroll={withScroll}
                    spacing={spacing}
                >
                    {children}
                </Container>
            </Background>
        </div>
    );
};

Screen.propTypes = propTypes;
Screen.defaultProps = defaultProps;

export default Screen;
