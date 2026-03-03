/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { TextElement, TextStyle, Transitions as TransitionsConfig } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { isTextFilled } from '@micromag/core/utils';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';

import styles from './results.module.css';

interface ResultsProps {
    title?: TextElement;
    description?: TextElement;
    resultsHeadingStyle?: TextStyle;
    resultsTextStyle?: TextStyle;
    layout?: string;
    transitions?: TransitionsConfig;
    transitionPlaying?: boolean;
    transitionStagger?: number;
    transitionDisabled?: boolean;
    className?: string;
    style?: Record<string, string | number>;
}

function Results({
    layout = null,
    title = null,
    description = null,
    resultsHeadingStyle = null,
    resultsTextStyle = null,
    transitions = null,
    transitionPlaying = false,
    transitionStagger = 100,
    transitionDisabled = false,
    className = null,
    style = null,
}) {
    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const hasTitle = isTextFilled(title);
    const { textStyle: titleTextStyle = null } = title || {};
    const hasDescription = isTextFilled(description);
    const { textStyle: descriptionTextStyle = null } = description || {};

    return (
        <Layout
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            fullscreen
            verticalAlign={verticalAlign}
            style={style}
        >
            {[
                <ScreenElement
                    key="title"
                    placeholder="title"
                    emptyLabel={
                        <FormattedMessage defaultMessage="Title" description="Placeholder label" />
                    }
                    emptyClassName={styles.emptyTitle}
                    isEmpty={!hasTitle}
                >
                    {hasTitle ? (
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            disabled={transitionDisabled}
                        >
                            <Heading
                                {...title}
                                className={styles.title}
                                textStyle={{ ...resultsHeadingStyle, ...titleTextStyle }}
                            />
                        </Transitions>
                    ) : null}
                </ScreenElement>,
                isSplitted ? <Spacer key="spacer" /> : null,
                <ScreenElement
                    key="description"
                    placeholder="text"
                    emptyLabel={
                        <FormattedMessage
                            defaultMessage="Description"
                            description="Placeholder label"
                        />
                    }
                    emptyClassName={styles.emptyDescription}
                    isEmpty={!hasDescription}
                >
                    {hasTitle ? (
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            disabled={transitionDisabled}
                            delay={transitionStagger}
                        >
                            <Text
                                {...description}
                                className={styles.description}
                                textStyle={{ ...resultsTextStyle, ...descriptionTextStyle }}
                            />
                        </Transitions>
                    ) : null}
                </ScreenElement>,
            ]}
        </Layout>
    );
}

export default Results;
