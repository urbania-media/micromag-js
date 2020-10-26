/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
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
    descriptionEmptyLabel: (
        <FormattedMessage defaultMessage="Description" description="Description placeholder" />
    ),
    background: null,
    current: true,
    active: false,
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 250,
        },
        out: 'scale',
    },
    transitionStagger: 100,
    className: null,
};

const Title = ({
    layout,
    title,
    subtitle,
    description,
    withSubtitle,
    withDescription,
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

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasTitle = title !== null;
    const hasSubtitle = subtitle !== null;
    const hasDescription = description !== null;

    const isEmpty = !hasTitle && !hasSubtitle && (!withDescription || !hasDescription);

    const layoutParts = layout.split('-');
    const isSplitted = layoutParts[0] === 'split';
    const verticalAlign = isSplitted ? layoutParts[1] || 'top' : layoutParts[0];

    // Create elements
    const items = [
        (hasTitle || isPlaceholder) && (
            <ScreenElement
                key="title"
                placeholder="title"
                emptyLabel={
                    <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                <Heading {...title} size={1} />
            </ScreenElement>
        ),

        isSplitted && (!withDescription || verticalAlign === 'bottom') && <Spacer />,

        withSubtitle && (hasSubtitle || isPlaceholder) && (
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
                <Heading {...subtitle} size={2} />
            </ScreenElement>
        ),

        isSplitted && withDescription && verticalAlign !== 'bottom' && <Spacer />,

        withDescription && (hasDescription || isPlaceholder) && (
            <ScreenElement
                key="description"
                placeholder="text"
                emptyLabel={descriptionEmptyLabel}
                emptyClassName={styles.empty}
                isEmpty={isEmpty}
            >
                <Text {...description} />
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
                <Layout fullscreen verticalAlign={verticalAlign}>
                    <TransitionsStagger
                        transitions={transitions}
                        stagger={transitionStagger}
                        disabled={!isView && !isPreview}
                        playing
                    >
                        {items}
                    </TransitionsStagger>
                </Layout>
            </Container>
        </div>
    );
};

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default React.memo(Title);
