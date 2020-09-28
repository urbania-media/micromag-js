/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Stack from '@micromag/element-stack';
import Grid from '@micromag/element-grid';
import Screen from '@micromag/element-screen';
import TextComponent from '@micromag/element-text';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';

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
    const { isPlaceholder, isSimple, isEditor } = getRenderFormat(renderFormat);

    const textComponent =
        isEditor && !text ? (
            <Empty className={styles.empty}>
                <FormattedMessage {...messages.text} />
            </Empty>
        ) : (
            <TextComponent {...text} className={styles.text} />
        );

    const item = isPlaceholder ? (
        <Placeholders.Text className={styles.placeholder} />
    ) : (
        textComponent
    );

    const containerClassNames = classNames([
        styles.container,
        {
            [styles[textAlign]]: textAlign !== null,
            [className]: className !== null,
        },
    ]);

    return (
        <Screen
            size={{ width, height }}
            renderFormat={renderFormat}
            background={background}
            visible={visible}
            active={active}
            className={containerClassNames}
        >
            {grid !== null ? (
                <Grid {...grid} items={[item]} className={styles.box} />
            ) : (
                <Stack {...box} isSmall={isSimple} className={styles.box}>
                    {item}
                </Stack>
            )}
        </Screen>
    );
};

TextScreen.propTypes = propTypes;
TextScreen.defaultProps = defaultProps;

export default React.memo(TextScreen);
