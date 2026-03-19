/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { HeadingElement, Message, TextElement } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import { useScreenRenderContext } from '@micromag/core/contexts';
import { isTextFilled } from '@micromag/core/utils';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';

import styles from './sign-modal.module.css';

interface SignModalProps {
    width?: number;
    height?: number;
    sign?: {
        id?: string;
        label?: TextElement;
        date?: Message;
        image?: string;
        word?: HeadingElement;
        description?: TextElement;
    };
    subtitle?: HeadingElement;
    current?: boolean;
    transitionDisabled?: boolean;
    focusable?: boolean;
    onClick?: (...args: unknown[]) => void;
    className?: string;
}

function SignModal({
    width = null,
    height = null,
    sign = null,
    subtitle = null,
    current = true,
    transitionDisabled = false,
    focusable = true,
    onClick = null,
    className = null,
}: SignModalProps) {
    // eslint-disable-next-line no-unused-vars
    const { label = null, image = null, date = null, word = null, description = null } = sign || {};
    // const { body: wordBody = null } = word || {};

    const { isEdit } = useScreenRenderContext();

    const hasWord = isTextFilled(word);
    const hasSubtitle = isTextFilled(subtitle);

    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    return (
        <Container
            width={width}
            height={height}
            className={classNames([
                styles.container,
                className,
                {
                    [styles.withoutTransitions]: transitionDisabled,
                },
            ])}
        >
            <button
                type="button"
                className={styles.modalButton}
                tabIndex={focusable ? '0' : '-1'}
                onClick={(e) => {
                    if (onClick !== null) {
                        onClick(e);
                    }
                }}
            >
                <Scroll disabled={scrollingDisabled} verticalAlign="middle">
                    <div className={styles.modal}>
                        {label !== null ? (
                            <ScreenElement>
                                <h2 className={styles.name}>
                                    <FormattedMessage {...label} />
                                </h2>
                            </ScreenElement>
                        ) : null}

                        {hasWord ? (
                            <div className={styles.wordContainer}>
                                {hasSubtitle ? (
                                    <Heading className={styles.wordOfTheWeek} {...subtitle} />
                                ) : (
                                    <h3 className={styles.wordOfTheWeek}>
                                        <FormattedMessage
                                            defaultMessage="Word of the Week"
                                            description="Horoscope Subtitle"
                                        />
                                    </h3>
                                )}
                                <Text
                                    className={styles.word}
                                    {...word}
                                    // body={wordBody}
                                />
                            </div>
                        ) : null}

                        {description ? (
                            <Text className={styles.description} {...description} />
                        ) : null}

                        {image ? (
                            <img className={styles.illustration} src={image} alt={label} />
                        ) : null}
                    </div>
                </Scroll>
            </button>
        </Container>
    );
}

export default SignModal;
