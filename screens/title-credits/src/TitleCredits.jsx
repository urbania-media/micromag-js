/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';

import {
    PropTypes as MicromagPropTypes,
    PlaceholderTitle,
    PlaceholderSubtitle,
    Empty,
} from '@micromag/core';

import { getRenderFormat } from '@micromag/core/utils';
import { useScreenSize } from '@micromag/core/contexts';
import Transitions from '@micromag/core/src/components/transitions/Transitions';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'center', 'bottom', 'split-top', 'split-bottom']),
    title: MicromagPropTypes.headingElement,
    subtitle: MicromagPropTypes.headingElement,
    credits: MicromagPropTypes.headingElement,
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
    layout: 'top',
    title: null,
    subtitle: null,
    credits: null,
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

const TitleCredits = ({
    layout,
    title,
    subtitle,
    credits,
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
    const { isView, isPlaceholder, isEditor } = getRenderFormat(renderFormat);

    const withTitle = title !== null;
    const withSubtitle = subtitle !== null;
    const withCredits = credits !== null;

    const isEmpty = isEditor && !withTitle && !withSubtitle && !credits;

    let titleElement = null;
    let subtitleElement = null;
    let creditElement = null;

    const createSecondElement = useCallback(
        (children) => (
            <div
                style={{
                    marginTop: layout === 'split-bottom' ? 'auto' : null,
                    marginBottom: layout === 'split-top' ? 'auto' : null,
                }}
            >
                {children}
            </div>
        ),
        [layout],
    );

    if (isPlaceholder) {
        titleElement = <PlaceholderTitle />;
        subtitleElement = createSecondElement(<PlaceholderSubtitle />);
        creditElement = <PlaceholderSubtitle />;
    } else if (isEmpty) {
        titleElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Title" description="Title placeholder" />
            </Empty>
        );
        subtitleElement = createSecondElement(
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Subtitle" description="Subtitle placeholder" />
            </Empty>,
        );
        creditElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Credits" description="Credits placeholder" />
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
            titleElement = createElement(<Heading {...title} size={1} />);
        }
        if (withSubtitle) {
            subtitleElement = createSecondElement(
                createElement(<Heading {...subtitle} size={2} />),
            );
        }
        if (withCredits) {
            creditElement = createElement(<Heading {...credits} size={3} />);
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
        case 'split-top':
        case 'split-bottom':
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
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />

            <Container width={width} height={height} maxRatio={maxRatio}>
                <div
                    className={styles.content}
                    style={{
                        justifyContent: contentJustifyContentValue,
                    }}
                >
                    {titleElement}
                    {subtitleElement}
                    {creditElement}
                </div>
            </Container>
        </div>
    );
};

TitleCredits.propTypes = propTypes;
TitleCredits.defaultProps = defaultProps;

export default React.memo(TitleCredits);
