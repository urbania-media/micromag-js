/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { ScreenElement, Transitions } from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import Button from '@micromag/element-button';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    title: MicromagPropTypes.headingElement,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    title: null,
    spacing: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 250,
        },
        out: 'scale',
    },
    transitionStagger: 100,
    className: null,
};

const SurveyScreen = ({
    layout,
    title,
    spacing,
    background,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasTitle = title !== null;

    const isEmptyTitle = isEdit && !hasTitle;

    const [submitState, setSubmitState] = useState({
        submitted: false,
        submitting: false,
    });

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const onSubmit = useCallback(
        () => {
            const { submitted = false, submitting = false } = submitState;
            let tmpSubmit = null;
            if (!submitted && !submitting) {
                setSubmitState({ ...submitState, submitting: true });
                // actual submit here
                tmpSubmit = setTimeout(setSubmitState, 1000, { submitted: true, submitting: false });
            }

            return () => {
                if (tmpSubmit !== null) {
                    clearTimeout(tmpSubmit);
                }                
            }
        },
        [submitState, setSubmitState],
    );

    // Title

    const items = [
        <ScreenElement
            key="title"
            placeholder="title"
            emptyLabel={
                <FormattedMessage defaultMessage="Title" description="Title placeholder" />
            }
            emptyClassName={styles.empty}
            isEmpty={isEmptyTitle}
        >
            {hasTitle ? (
                <Transitions transitions={transitions} playing={current}>
                    <Heading {...title} className={styles.title} />
                </Transitions>
            ) : null}
        </ScreenElement>,
    ];

    if (isSplitted) {
        items.push(<Spacer key="spacer" />);
    }

    // Form

    // Uploads

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
                maxRatio={maxRatio}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <Layout
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={isView || isPreview ? { padding: spacing } : null}
                >
                    {items}
                </Layout>
            </Container>
        </div>
    );
};

SurveyScreen.propTypes = propTypes;
SurveyScreen.defaultProps = defaultProps;

export default SurveyScreen;
