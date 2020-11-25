/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),    
    text: MicromagPropTypes.textElement,
    title: MicromagPropTypes.headingElement,
    withTitle: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',    
    text: null,
    title: null,
    withTitle: false,
    spacing: 20,
    background: null,
    current: true,
    active: false,
    maxRatio: 3 / 4,
    transitions: null,
    transitionStagger: 100,
    className: null,
};

const TextScreen = ({
    layout,    
    text,
    title,
    withTitle,
    spacing,
    background,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { menuSize } = useViewer();

    const landscape = width > height;

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasTitle = title !== null;
    const hasText = text !== null;

    const isEmpty = isEdit && !hasTitle && !hasText;

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const titleWithMargin = hasTitle && hasText && !isSplitted;

    // Create elements
    const items = [
        withTitle && <ScreenElement
            key="title"
            placeholder="title"
            emptyLabel={<FormattedMessage defaultMessage="Title" description="Title placeholder" />}
            emptyClassName={styles.empty}
            isEmpty={isEmpty}
        >
            { hasTitle ? <Heading className={classNames([styles.title, { [styles.withMargin] : titleWithMargin }])} {...title} /> : null }
        </ScreenElement>,

        isSplitted && withTitle && <Spacer key="spacer" />,

        <ScreenElement
            key="description"
            placeholder="text"
            emptyLabel={<FormattedMessage defaultMessage="Text" description="Text placeholder" />}
            emptyClassName={styles.empty}
            isEmpty={isEmpty}
        >
            { hasText ? <Text className={styles.text} {...text} /> : null }
        </ScreenElement>,
    ];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.placeholder]: isPlaceholder,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                maxRatio={maxRatio}
                playing={(isView && current) || (isEdit && active)}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <Layout
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={ !isPlaceholder ? {
                        padding: spacing,
                        paddingTop: (!landscape && !isPreview ? menuSize : 0) + spacing,
                    } : null }
                >
                    <TransitionsStagger
                        transitions={transitions}
                        stagger={transitionStagger}
                        disabled={!isView}
                        playing={current}
                    >
                        {items}
                    </TransitionsStagger>
                </Layout>
            </Container>
        </div>
    );
};

TextScreen.propTypes = propTypes;
TextScreen.defaultProps = defaultProps;

export default React.memo(TextScreen);
