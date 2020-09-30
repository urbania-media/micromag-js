/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Container from '@micromag/element-container';
import Background from '@micromag/element-background';
import { VStack } from '@micromag/element-stack';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import AdImage from './AdImage';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['center', 'top', 'bottom', 'full']),
    image: MicromagPropTypes.imageElement,
    link: MicromagPropTypes.linkElement,
    text: MicromagPropTypes.text,
    background: MicromagPropTypes.backgroundElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    layout: null,
    image: null,
    link: null,
    text: null,
    background: null,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const AdScreen = ({
    layout,
    image,
    link,
    text,
    background,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isEditor } = getRenderFormat(renderFormat);
    const isEmpty = !image;
    const isFullScreen = layout === 'full';

    const content = useMemo(() => {
        if (isPlaceholder) {
            return <Placeholders.AdImage className={styles.placeholder} />;
        }

        if (isEditor && isEmpty) {
            return (
                <Empty className={styles.empty}>
                    <FormattedMessage {...messages.schemaTitle} />
                </Empty>
            );
        }

        return (
            <AdImage
                image={image}
                link={link}
                text={text}
                fullScreen={isFullScreen}
                renderFormat={renderFormat}
            />
        );
    }, [isPlaceholder, isEditor, isEmpty, isFullScreen, image, link, text, renderFormat]);

    const containerClassNames = classNames([
        styles.container,
        {
            [styles.fullscreen]: isFullScreen,
            [styles[layout]]: layout !== null,
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
                    <VStack align="start">{content}</VStack>
                </Container>
            </div>
        </div>
    );
};

AdScreen.propTypes = propTypes;
AdScreen.defaultProps = defaultProps;

export default React.memo(AdScreen);
