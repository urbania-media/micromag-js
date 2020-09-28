/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Screen from '@micromag/element-screen';
import { VStack } from '@micromag/element-stack';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getComponentFromRenderFormat } from '@micromag/core/utils';

import AdImage from './AdImage';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    image: MicromagPropTypes.imageElement,
    link: MicromagPropTypes.linkElement,
    text: MicromagPropTypes.text,
    align: MicromagPropTypes.stackAlign,
    background: MicromagPropTypes.backgroundElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    fullScreen: PropTypes.bool,
    spacing: MicromagPropTypes.spacing,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    image: null,
    link: null,
    text: null,
    align: null,
    background: null,
    visible: true,
    active: false,
    fullScreen: false,
    spacing: 0,
    renderFormat: 'view',
    className: null,
};

const AdScreen = ({
    image,
    link,
    text,
    align,
    background,
    visible,
    active,
    fullScreen,
    spacing,
    renderFormat,
    className,
}) => {
    const size = useScreenSize();
    const { image: { url: imageUrl = null } = {} } = image || {};
    const isEmpty = !imageUrl;

    const containerClassNames = classNames([
        styles.container,
        {
            [styles.fullscreen]: fullScreen,
            [className]: className !== null,
        },
    ]);

    const content = getComponentFromRenderFormat(renderFormat, isEmpty, {
        view: () => (
            <AdImage
                image={image}
                link={link}
                text={text}
                fullScreen={fullScreen}
                renderFormat={renderFormat}
            />
        ),
        empty: () => (
            <Empty className={styles.empty}>
                <FormattedMessage {...messages.schemaTitle} />
            </Empty>
        ),
        placeholder: () => <Placeholders.AdImage className={styles.placeholder} />,
    });

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
            <VStack {...align}>{content}</VStack>
        </Screen>
    );
};

AdScreen.propTypes = propTypes;
AdScreen.defaultProps = defaultProps;

export default React.memo(AdScreen);
