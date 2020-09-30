/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Container from '@micromag/element-container';
import Background from '@micromag/element-background';
import { StackNew } from '@micromag/element-stack';

import { PropTypes as MicromagPropTypes, PlaceholderAdImage, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import AdImage from './AdImage';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

export const layouts = ['center', 'top', 'bottom', 'full'];

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
    const maxRatio = 3 / 4;

    const { isView, isPlaceholder, isEditor } = getRenderFormat(renderFormat);
    const isEmpty = !image;
    const isFullScreen = layout === 'full';

    let imageElement = (
        <AdImage
            image={image}
            link={link}
            text={text}
            fullScreen={isFullScreen}
            renderFormat={renderFormat}
        />
    );

    if (isPlaceholder) {
        imageElement = <PlaceholderAdImage className={styles.placeholder} />;
    }

    if (isEditor && isEmpty) {
        imageElement = (
            <Empty className={styles.empty}>
                <FormattedMessage {...messages.schemaTitle} />
            </Empty>
        );
    }

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
                maxRatio={maxRatio}
                playing={(isView && visible) || (isEditor && active)}
            />
            <div className={styles.content}>
                <Container width={width} height={height} maxRatio={maxRatio} visible={visible}>
                    <StackNew
                        className={styles.stack}
                        direction="horizontal"
                        align="center"
                        spacing={10}
                    >
                        {imageElement}
                        {imageElement}
                        {imageElement}
                    </StackNew>
                </Container>
            </div>
        </div>
    );
};

AdScreen.propTypes = propTypes;
AdScreen.defaultProps = defaultProps;

export default React.memo(AdScreen);
