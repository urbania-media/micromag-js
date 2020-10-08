/* eslint-disable react/jsx-props-no-spreading, jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Container from '@micromag/element-container';
import Background from '@micromag/element-background';

import { PropTypes as MicromagPropTypes, PlaceholderAdImage, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat, getLayoutParts } from '@micromag/core/utils';

import AdImage from './AdImage';

import styles from './styles.module.scss';

export const layouts = [
    'center',
    'top',
    'bottom',
    'full',
    'center-left',
    'center-right',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
];

const propTypes = {
    layout: PropTypes.oneOf(layouts),
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
        imageElement = (
            <PlaceholderAdImage
                className={classNames([styles.placeholder])}
                {...(isFullScreen
                    ? {
                          width: '100%',
                          height: '100%',
                      }
                    : null)}
            />
        );
    }

    if (isEditor && isEmpty) {
        imageElement = (
            <Empty className={styles.empty}>
                <FormattedMessage description="Ad title" defaultMessage="Advertising" />
            </Empty>
        );
    }

    const { horizontal, vertical } = getLayoutParts(layout);

    const containerClassNames = classNames([
        styles.container,
        {
            [styles.fullscreen]: isFullScreen,
            [styles.placeholder]: isPlaceholder,
            [styles[horizontal]]: horizontal !== null,
            [styles[vertical]]: vertical !== null,
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
            <div className={styles.inner}>
                <Container width={width} height={height} maxRatio={maxRatio} visible={visible}>
                    <div className={styles.content}>{imageElement}</div>
                </Container>
            </div>
        </div>
    );
};

AdScreen.propTypes = propTypes;
AdScreen.defaultProps = defaultProps;

export default React.memo(AdScreen);
