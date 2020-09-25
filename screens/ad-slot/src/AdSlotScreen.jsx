/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Screen from '@micromag/element-screen';
import { VStack } from '@micromag/element-stack';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getComponentFromRenderFormat } from '@micromag/core/utils';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    iframe: MicromagPropTypes.iframe,
    adFormat: MicromagPropTypes.adFormat,
    align: MicromagPropTypes.stackAlign,
    background: MicromagPropTypes.backgroundElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    spacing: MicromagPropTypes.spacing,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    iframe: null,
    adFormat: null,
    align: null,
    background: null,
    visible: true,
    active: false,
    spacing: 0,
    renderFormat: 'view',
    className: null,
};

const AdSlotScreen = ({
    iframe,
    adFormat,
    align,
    background,
    visible,
    active,
    spacing,
    renderFormat,
    className,
}) => {
    const size = useScreenSize();

    const { src = null, title = 'Ad' } = iframe || {};
    const { name = null, width, height } = adFormat || {};

    const isEmpty = src === null;

    const inner = getComponentFromRenderFormat(renderFormat, isEmpty, {
        view: () => (
            <iframe
                className={styles.iframe}
                src={src}
                title={title}
                width={width}
                height={height}
            />
        ),
        preview: () => <div className={styles.previewBlock} />,
        empty: () => (
            <div className={styles.emptyContainer} style={{ width, height }}>
                <Empty className={styles.empty}>
                    {name !== null ? name : <FormattedMessage {...messages.schemaTitle} />}
                </Empty>
            </div>
        ),
        placeholder: () => <Placeholders.AdFrame className={styles.placeholder} />,
    });

    const containerClassNames = classNames([
        styles.container,
        {
            [className]: className !== null,
        },
    ]);

    return (
        <Screen
            size={size}
            renderFormat={renderFormat}
            background={background}
            visible={visible}
            active={active}
            spacing={spacing}
            className={containerClassNames}
        >
            <VStack {...align}>{inner}</VStack>
        </Screen>
    );
};

AdSlotScreen.propTypes = propTypes;
AdSlotScreen.defaultProps = defaultProps;

export default React.memo(AdSlotScreen);
