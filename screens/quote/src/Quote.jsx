/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import QuoteBlock from './QuoteBlock';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['center', 'top', 'bottom', 'around']),
    background: MicromagPropTypes.backgroundElement,
    quote: MicromagPropTypes.textElement,
    source: MicromagPropTypes.textElement,
    author: MicromagPropTypes.textElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'center',
    background: null,
    quote: null,
    author: null,
    source: null,
    current: true,
    active: true,
    renderFormat: 'view',
    maxRatio: 3 / 4,
    transitions: null,
    className: null,
};

const Quote = ({
    layout,
    background,
    quote,
    source,
    author,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);

    const item = (
        <QuoteBlock
            quote={quote}
            source={source}
            author={author}
            isPlaceholder={isPlaceholder}
            showEmpty={isEditor}
            centered={true}
        />
    );

    let contentJustifyContentValue;

    switch (layout) {
        default:
        case 'center':
            contentJustifyContentValue = 'center'; break;
        case 'top':
            contentJustifyContentValue = 'flex-start'; break;
        case 'bottom':
            contentJustifyContentValue = 'flex-end'; break;
        case 'around':
            contentJustifyContentValue = 'space-around'; break;
        case 'between':
            contentJustifyContentValue = 'space-between'; break;
    }

    return (
        <div className={classNames([
            styles.container,
            {
                [className]: className,
                [styles.placeholder]: isPlaceholder,
            },
        ])}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />
            
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content} style={{
                    justifyContent: contentJustifyContentValue,
                }}>
                    {item}
                </div>
            </Container>
        </div>
    );
};

Quote.propTypes = propTypes;
Quote.defaultProps = defaultProps;

export default React.memo(Quote);
