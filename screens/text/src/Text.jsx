/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import TextComponent from '@micromag/element-text';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { PropTypes as MicromagPropTypes, PlaceholderText, Empty } from '@micromag/core';

import { schemas as messages } from './messages';

import Transitions from '@micromag/core/src/components/transitions/Transitions';

import { layouts } from './definition';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(layouts),
    text: MicromagPropTypes.textElement,
    background: MicromagPropTypes.backgroundElement,
    textAlign: MicromagPropTypes.textAlign,
    current: PropTypes.bool,
    active: PropTypes.bool,    
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'center',
    text: null,
    background: null,
    textAlign: 'center',
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
    className: null,
};

const TextScreen = ({
    layout,
    text,
    background,
    textAlign,
    current,
    active,    
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isEditor, isView } = getRenderFormat(renderFormat);
    const isEmpty = isEditor && text === null;

    let textComponent = null;

    if (isPlaceholder) {
        textComponent = <PlaceholderText className={styles.placeholder} />;
    } else if (isEmpty) {
        textComponent = (
            <Empty className={styles.empty}>
                <FormattedMessage {...messages.text} />
            </Empty>
        );
    } else {
        textComponent = (
            <Transitions transitions={transitions} playing={current}>
                <TextComponent {...text} className={styles.text} />
            </Transitions>
        );
    }

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
        <div
            className={classNames([
                styles.container,
                {
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className !== null,
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
                    {textComponent}
                </div>
            </Container>
        </div>
    );
};

TextScreen.propTypes = propTypes;
TextScreen.defaultProps = defaultProps;

export default React.memo(TextScreen);
