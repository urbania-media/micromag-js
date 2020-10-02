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
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
};

const defaultProps = {
    layout: null,
    iframe: null,
    adFormat: null,
    background: null,
    visible: true,
    active: false,
    renderFormat: 'view',
};

const AdSlotScreen = ({ layout, iframe, adFormat, background, visible, active, renderFormat }) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEditor } = getRenderFormat(renderFormat);
    const { src = null, title = 'Ad' } = iframe || {};
    const { name = null, width: adWidth, height: adHeight } = adFormat || {};

    const isEmpty = src === null;
    const isFullScreen = layout === 'full';

    let iframeElement = null;

    if (isPreview) {
        iframeElement = <div className={styles.previewBlock} />;
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
            <iframe
                className={styles.iframe}
                src={src}
                title={title}
                width={adWidth}
                height={adHeight}
            />
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
            <div className={styles.inner}>
                <Container width={width} height={height} visible={visible}>
                    <div className={styles.content}>{iframeElement}</div>
                </Container>
            </div>
        </div>
    );
};

AdSlotScreen.propTypes = propTypes;
AdSlotScreen.defaultProps = defaultProps;

export default React.memo(AdSlotScreen);
