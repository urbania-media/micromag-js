/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Text from '@micromag/element-text';

import {
    PropTypes as MicromagPropTypes,
    PlaceholderQuote,
    PlaceholderSubtitle,
    Empty
} from '@micromag/core';

import { getRenderFormat } from '@micromag/core/utils';
import { useScreenSize } from '@micromag/core/contexts';
import Transitions from '@micromag/core/src/components/transitions/Transitions';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['center', 'center', 'bottom', 'split']),    
    quote: MicromagPropTypes.textElement,
    author: MicromagPropTypes.textElement,
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
    quote: null,
    author: null,
    background: null,
    current: true,
    active: true,
    renderFormat: 'view',
    maxRatio: 3 / 4,
    transitions: null,
    transitionStagger: 100,
    className: null,
};

const Quote = ({
    layout,    
    quote,
    author,
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

    const withQuote = quote !== null;
    const withAuthor = author !== null;

    const isEmpty = isEditor && !withQuote && !withAuthor;

    let quoteElement = null;
    let authorElement = null;

    if (isPlaceholder) {
        quoteElement = <PlaceholderQuote  />;
        authorElement = <PlaceholderSubtitle />;
    } else if (isEmpty) {
        quoteElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Quote" description="Quote placeholder" />
            </Empty>
        );
        authorElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Author" description="Author placeholder" />
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

        if (withQuote) {
            quoteElement = createElement(<Text {...quote} className={styles.quote} />);
        }
        if (withAuthor) {
            authorElement = createElement(
                <Text {...author} sclassName={styles.author} />,
            );
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
                    [className]: className,
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
                    { quoteElement }
                    { authorElement }
                </div>
            </Container>
        </div>
    );
};

Quote.propTypes = propTypes;
Quote.defaultProps = defaultProps;

export default React.memo(Quote);
