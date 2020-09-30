/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Container from '@micromag/element-container';
import Background from '@micromag/element-background';
import { VStack } from '@micromag/element-stack';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

export const layouts = ['top', 'center', 'bottom', 'full'];

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

    let iframeElement = null;

    if (isPreview) {
        iframeElement = <div className={styles.previewBlock} />;
    } else if (isEditor && isEmpty) {
        iframeElement = (
            <div className={styles.emptyContainer} style={{ width, height }}>
                <Empty className={styles.empty}>
                    {name !== null ? name : <FormattedMessage {...messages.schemaTitle} />}
                </Empty>
            </div>
        );
    } else if (isPlaceholder) {
        iframeElement = <Placeholders.AdFrame className={styles.placeholder} />;
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

    const containerClassNames = classNames([
        styles.container,
        {
            [styles[layout]]: layout !== null,
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
                    <VStack>{iframeElement}</VStack>
                </Container>
            </div>
        </div>
    );
};

AdSlotScreen.propTypes = propTypes;
AdSlotScreen.defaultProps = defaultProps;

export default React.memo(AdSlotScreen);
