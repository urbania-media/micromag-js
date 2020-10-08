/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Container from '@micromag/element-container';
import Background from '@micromag/element-background';

import { PropTypes as MicromagPropTypes, PlaceholderAdFrame, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat, getLayoutParts } from '@micromag/core/utils';
import Transitions from '@micromag/core/src/components/transitions/Transitions';

import { schemas as messages } from './messages';

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
    iframe: MicromagPropTypes.iframe,
    adFormat: MicromagPropTypes.adFormat,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: null,
    iframe: null,
    adFormat: null,
    background: null,
    current: true,
    active: false,
    renderFormat: 'view',
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 1000,
        },
        out: 'scale',
    },
    className: null,
};

const AdSlotScreen = ({
    layout,
    iframe,
    adFormat,
    background,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEditor } = getRenderFormat(renderFormat);
    const { src = null, title = 'Ad', width: iframeWidth, height: iframeHeight } = iframe || {};
    const { name = null /* , width: adWidth, height: adHeight */ } = adFormat || {};

    const isEmpty = src === null;
    const isFullScreen = layout === 'full';

    let iframeElement = null;

    if (isPreview) {
        iframeElement = (
            <Transitions transitions={transitions} playing={current}>
                <div className={styles.previewBlock} />
            </Transitions>
        );
    } else if (isEditor && isEmpty) {
        iframeElement = (
            <Empty className={styles.empty}>
                {name !== null ? name : <FormattedMessage {...messages.schemaTitle} />}
            </Empty>
        );
    } else if (isPlaceholder) {
        iframeElement = (
            <PlaceholderAdFrame
                className={styles.placeholder}
                {...(isFullScreen
                    ? {
                          width: '100%',
                          height: '100%',
                      }
                    : null)}
            />
        );
    } else {
        iframeElement = (
            <Transitions transitions={transitions} playing={current}>
                <iframe
                    className={styles.iframe}
                    src={src}
                    title={title}
                    width={iframeWidth}
                    height={iframeHeight}
                />
            </Transitions>
        );
    }

    const { horizontal, vertical } = getLayoutParts(layout);

    const containerClassNames = classNames([
        styles.container,
        {
            [className]: className !== null,
            [styles.fullscreen]: isFullScreen,
            [styles.placeholder]: isPlaceholder,
            [styles[horizontal]]: horizontal !== null,
            [styles[vertical]]: vertical !== null,
        },
    ]);

    return (
        <div className={containerClassNames}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                maxRatio={maxRatio}
                playing={(isView && current) || (isEditor && active)}
            />
            <div className={styles.inner}>
                <Container width={width} height={height} maxRatio={maxRatio}>
                    <div className={styles.content}>{iframeElement}</div>
                </Container>
            </div>
        </div>
    );
};

AdSlotScreen.propTypes = propTypes;
AdSlotScreen.defaultProps = defaultProps;

export default React.memo(AdSlotScreen);
