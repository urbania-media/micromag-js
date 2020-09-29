/* eslint-disable react/jsx-props-no-spreading */
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

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const propTypes = {
    iframe: MicromagPropTypes.iframe,
    adFormat: MicromagPropTypes.adFormat,
    align: MicromagPropTypes.stackAlign,
    background: MicromagPropTypes.backgroundElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    // spacing: MicromagPropTypes.spacing,
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
    // spacing: 0,
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
    // spacing,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEditor } = getRenderFormat(renderFormat);

    const { src = null, title = 'Ad' } = iframe || {};
    const { name = null, width: adWidth, height: adHeight } = adFormat || {};

    const isEmpty = src === null;

    const view = useMemo(
        () => (
            <iframe
                className={styles.iframe}
                src={src}
                title={title}
                width={adWidth}
                height={adHeight}
            />
        ),
        [src, title, adWidth, adHeight],
    );

    const preview = <div className={styles.previewBlock} />;

    const empty = useMemo(
        () => (
            <div className={styles.emptyContainer} style={{ width, height }}>
                <Empty className={styles.empty}>
                    {name !== null ? name : <FormattedMessage {...messages.schemaTitle} />}
                </Empty>
            </div>
        ),
        [],
    );

    const placeholder = useMemo(() => <Placeholders.AdFrame className={styles.placeholder} />, []);

    const containerClassNames = classNames([
        styles.container,
        {
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
                    <VStack {...align}>
                        {isPlaceholder ? placeholder : null}
                        {isEditor && isEmpty ? empty : null}
                        {isView || (isEditor && !isEmpty) ? view : null}
                        {isPreview ? preview : null}
                    </VStack>
                </Container>
            </div>
        </div>
    );
};

AdSlotScreen.propTypes = propTypes;
AdSlotScreen.defaultProps = defaultProps;

export default React.memo(AdSlotScreen);
