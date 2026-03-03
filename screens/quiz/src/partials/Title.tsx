/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { TextElement } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import { isTextFilled } from '@micromag/core/utils';
import Button from '@micromag/element-button';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';

import styles from './title.module.css';

interface TitleProps {
    title?: TextElement;
    description?: TextElement;
    button?: TextElement;
    layout?: string;
    focusable?: boolean;
    buttonDisabled?: boolean;
    className?: string;
    style?: Record<string, string | number>;
    onClickButton?: (...args: unknown[]) => void;
}

const Title = ({
    layout = null,
    title = null,
    description = null,
    button = null,
    buttonDisabled = false,
    focusable = false,
    className = null,
    style = null,
    onClickButton = null,
}) => {
    // const { isPreview, isEdit } = useScreenRenderContext();
    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const hasTitle = isTextFilled(title);
    const hasDescription = isTextFilled(description);
    const hasButton = isTextFilled(button);

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
                    {hasTitle ? <Heading {...title} className={styles.title} /> : null}
                </ScreenElement>,
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
                    {hasDescription ? (
                        <Text {...description} className={styles.description} />
                    ) : null}
                </ScreenElement>,
                isSplitted ? <Spacer key="spacer" /> : null,
                <ScreenElement key="button" placeholder="button">
                    <Button
                        disabled={buttonDisabled}
                        focusable={focusable}
                        buttonStyle={button !== null ? button.buttonStyle : null}
                        className={styles.button}
                        onClick={onClickButton}
                    >
                        {hasButton ? (
                            <Text {...button} className={styles.label} />
                        ) : (
                            <FormattedMessage
                                defaultMessage="Start"
                                description="Screen button label"
                            />
                        )}
                    </Button>
                </ScreenElement>,
            ]}
        </Layout>
    );
};

export default Title;
