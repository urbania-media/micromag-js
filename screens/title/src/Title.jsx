/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import { isTextFilled } from '@micromag/core/utils';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split', 'split-top', 'split-bottom']),
    title: MicromagPropTypes.headingElement,
    subtitle: MicromagPropTypes.headingElement,
    description: MicromagPropTypes.textElement,
    withSubtitle: PropTypes.bool,
    withDescription: PropTypes.bool,
    spacing: PropTypes.number,
    descriptionEmptyLabel: MicromagPropTypes.label,
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
    title: null,
    subtitle: null,
    description: null,
    withSubtitle: false,
    withDescription: false,
    spacing: 20,
    descriptionEmptyLabel: (
        <FormattedMessage defaultMessage="Description" description="Description placeholder" />
    ),
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: null,
    transitionStagger: 100,
    className: null,
};

const TitleScreen = ({
    layout,
    title,
    subtitle,
    description,
    withSubtitle,
    withDescription,
    spacing,
    descriptionEmptyLabel,
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

    const hasTitle = isTextFilled(title);
    const hasSubtitle = isTextFilled(subtitle);
    const hasDescription = isTextFilled(description);

    const isEmpty = !hasTitle && !hasSubtitle && (!withDescription || !hasDescription);

    const layoutParts = layout.split('-');
    const isSplitted = layoutParts[0] === 'split';
    const verticalAlign = isSplitted ? layoutParts[1] || null : layoutParts[0];

    const titleWithMargin =
        hasTitle && (hasSubtitle || hasDescription) && (!isSplitted || verticalAlign === 'top');
    const subtitleWithMargin =
        hasSubtitle && hasDescription && (!isSplitted || verticalAlign === 'bottom');

    // Create elements
    const items = [
        <ScreenElement
            key="title"
            placeholder="title"
            emptyLabel={<FormattedMessage defaultMessage="Title" description="Title placeholder" />}
            emptyClassName={styles.empty}
            isEmpty={isEmpty}
        >
            {hasTitle ? (
                <Heading
                    className={classNames([styles.title, { [styles.withMargin]: titleWithMargin }])}
                    {...title}
                    size={1}
                />
            ) : null}
        </ScreenElement>,
        isSplitted && (!withDescription || verticalAlign === 'bottom') && <Spacer key="spacer1" />,

        withSubtitle && (
            <ScreenElement
                key="subtitle"
                placeholder="subtitle"
                emptyLabel={
                    <FormattedMessage
                        defaultMessage="Subtitle"
                        description="Subtitle placeholder"
                    />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                {hasSubtitle ? (
                    <Heading
                        className={classNames([
                            styles.subtitle,
                            { [styles.withMargin]: subtitleWithMargin },
                        ])}
                        {...subtitle}
                        size={2}
                    />
                ) : null}
            </ScreenElement>
        ),

        isSplitted && withDescription && verticalAlign === 'top' && <Spacer key="spacer2" />,

        withDescription && (
            <ScreenElement
                key="description"
                placeholder="text"
                emptyLabel={descriptionEmptyLabel}
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                {hasDescription ? <Text {...description} /> : null}
            </ScreenElement>
        ),
    ];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
                maxRatio={maxRatio}
            />

            <Container width={width} height={height} maxRatio={maxRatio}>
                <Layout
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: (!landscape && !isPreview ? menuSize : 0) + spacing,
                              }
                            : null
                    }
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

TitleScreen.propTypes = propTypes;
TitleScreen.defaultProps = defaultProps;

export default React.memo(TitleScreen);
