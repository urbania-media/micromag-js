/* eslint-disable react/no-array-index-key */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import { isTextFilled } from '@micromag/core/utils';
import Button from '@micromag/element-button';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';

import styles from './title.module.scss';

const propTypes = {
    title: MicromagPropTypes.textElement,
    description: MicromagPropTypes.textElement,
    button: MicromagPropTypes.textElement,
    layout: PropTypes.string,
    focusable: PropTypes.bool,
    buttonDisabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    onClickButton: PropTypes.func,
};

const defaultProps = {
    title: null,
    description: null,
    layout: null,
    button: null,
    buttonDisabled: false,
    focusable: false,
    className: null,
    style: null,
    onClickButton: null,
};

const Title = ({
    layout,
    title,
    description,
    button,
    buttonDisabled,
    focusable,
    className,
    style,
    onClickButton,
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

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
