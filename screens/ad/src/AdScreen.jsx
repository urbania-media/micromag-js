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
    image: MicromagPropTypes.imageElement,
    link: MicromagPropTypes.linkElement,
    text: MicromagPropTypes.text,
    align: MicromagPropTypes.stackAlign,
    background: MicromagPropTypes.backgroundElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    fullScreen: PropTypes.bool,
    // spacing: MicromagPropTypes.spacing,
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
    // spacing: 0,
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
    // spacing,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEditor } = getRenderFormat(renderFormat);
    const isEmpty = !image;

    const view = useMemo(
        () => (
            <AdImage
                image={image}
                link={link}
                text={text}
                fullScreen={fullScreen}
                renderFormat={renderFormat}
            />
        ),
        [image, link, text, fullScreen, renderFormat],
    );

    const empty = useMemo(
        () => (
            <Empty className={styles.empty}>
                <FormattedMessage {...messages.schemaTitle} />
            </Empty>
        ),
        [],
    );

    const placeholder = useMemo(() => <Placeholders.AdImage className={styles.placeholder} />, []);

    const containerClassNames = classNames([
        styles.container,
        {
            [styles.fullscreen]: fullScreen,
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
                        {isPreview ? view : null}
                    </VStack>
                </Container>
            </div>
        </div>
    );
};

AdScreen.propTypes = propTypes;
AdScreen.defaultProps = defaultProps;

export default React.memo(AdScreen);
