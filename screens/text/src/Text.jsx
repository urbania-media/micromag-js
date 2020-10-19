/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderTitle, PlaceholderText, Empty, Transitions } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'center', 'bottom', 'split']),
    title: MicromagPropTypes.headingElement,
    text: MicromagPropTypes.textElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'center',
    title: null,
    text: null,
    background: null,
    current: true,
    active: false,
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 1000,
        },
        out: 'scale',
    },
    transitionStagger: 100,
    className: null,
};

const TextScreen = ({
    layout,
    title,
    text,
    background,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isEdit, isView } = useScreenRenderContext();

    const withTitle = title !== null;
    const withText = text !== null;

    const isEmpty = isEdit && !withTitle && !withText;

    let titleElement = null;
    let textElement = null;

    if (isPlaceholder) {
        titleElement = <PlaceholderTitle />;
        textElement = <PlaceholderText />;
    } else if (isEmpty) {
        titleElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Title" description="Title placeholder" />
            </Empty>
        );
        textElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Text" description="Text placeholder" />
            </Empty>
        );
    } else {
        let transitionDelay = 0;

        const createElement = (children) => {
            const element = (
                <Transitions transitions={transitions} delay={transitionDelay} playing>
                    {children}
                </Transitions>
            );
            transitionDelay += transitionStagger;
            return element;
        };

        if (withTitle) {
            titleElement = createElement(<Heading {...title} size={2} className={styles.title} />);
        }

        if (withText) {
            textElement = createElement(<Text {...text} className={styles.text} />);
        }
    }

    // Add elements to items

    const items = [];
    if (titleElement !== null) {
        items.push(titleElement);
    }

    if (textElement !== null) {
        items.push(textElement);
    }

    // convert layout to Container props

    const layoutChunks = layout.split('-');
    const isDistribution = layoutChunks[0] === 'split';
    const verticalAlign = isDistribution ? layoutChunks[1] : layoutChunks[0];
    const distribution = isDistribution ? 'between' : null;

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
            <Container
                width={width}
                height={height}
                maxRatio={maxRatio}
                verticalAlign={verticalAlign}
                distribution={distribution}
            >
                {items}
            </Container>
        </div>
    );
};

TextScreen.propTypes = propTypes;
TextScreen.defaultProps = defaultProps;

export default React.memo(TextScreen);
