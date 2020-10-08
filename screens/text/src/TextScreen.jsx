/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Stack from '@micromag/element-stack';
import Grid from '@micromag/element-grid';
import TextComponent from '@micromag/element-text';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { PropTypes as MicromagPropTypes, PlaceholderText, Empty } from '@micromag/core';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    text: MicromagPropTypes.textElement,
    background: MicromagPropTypes.backgroundElement,
    box: MicromagPropTypes.boxElement,
    grid: MicromagPropTypes.gridElement,
    textAlign: MicromagPropTypes.textAlign,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    background: null,
    box: null,
    grid: null,
    textAlign: 'center',
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const TextScreen = ({
    text,
    background,
    box,
    grid,
    textAlign,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isEditor, isView } = getRenderFormat(renderFormat);

    const textComponent =
        isEditor && !text ? (
            <Empty className={styles.empty}>
                <FormattedMessage {...messages.text} />
            </Empty>
        ) : (
            <TextComponent {...text} className={styles.text} />
        );

    const item = isPlaceholder ? <PlaceholderText className={styles.placeholder} /> : textComponent;

    const containerClassNames = classNames([
        styles.container,
        {
            [styles[textAlign]]: textAlign !== null,
            [className]: className !== null,
        },
    ]);

    return (
        <div className={containerClassNames}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
            <div className={styles.content}>
                <Container width={width} height={height} visible={visible}>
                    {grid !== null ? (
                        <Grid {...grid} items={[item]} className={styles.box} />
                    ) : (
                        <Stack {...box} className={styles.box}>
                            {item}
                        </Stack>
                    )}
                </Container>
            </div>
        </div>
    );
};

TextScreen.propTypes = propTypes;
TextScreen.defaultProps = defaultProps;

export default React.memo(TextScreen);
