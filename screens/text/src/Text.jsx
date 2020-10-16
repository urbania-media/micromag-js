/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import {
    PropTypes as MicromagPropTypes,
    PlaceholderTitle,
    PlaceholderText,
    Empty,
} from '@micromag/core';

import Transitions from '@micromag/core/src/components/transitions/Transitions';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'center', 'bottom', 'split']),
    title: MicromagPropTypes.headingElement,
    text: MicromagPropTypes.textElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
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
    renderFormat: 'view',
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
    renderFormat,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isEditor, isView } = getRenderFormat(renderFormat);

    const withTitle = title !== null;
    const withText = text !== null;

    const isEmpty = isEditor && !withTitle && !withText;

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

    let contentJustifyContentValue;

    switch (layout) {
        default:
        case 'center':
            contentJustifyContentValue = 'center';
            break;
        case 'top':
            contentJustifyContentValue = 'flex-start';
            break;
        case 'bottom':
            contentJustifyContentValue = 'flex-end';
            break;
        case 'split':
            contentJustifyContentValue = 'space-between';
            break;
    }

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
                playing={(isView && current) || (isEditor && active)}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div
                    className={styles.content}
                    style={{
                        justifyContent: contentJustifyContentValue,
                    }}
                >
                    {titleElement}
                    {textElement}
                </div>
            </Container>
        </div>
    );
};

TextScreen.propTypes = propTypes;
TextScreen.defaultProps = defaultProps;

export default React.memo(TextScreen);
