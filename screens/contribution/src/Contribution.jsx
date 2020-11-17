/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { ScreenElement, Transitions } from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';
import Heading from '@micromag/element-heading';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';

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
    contributions: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        message: PropTypes.string,
    })),
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
        in: 'fade',
        out: 'fade',
    },
    transitionStagger: 100,
    className: null,
    contributions: [
        {
            name: 'Nom 1',
            message: 'Message 1'
        },
        {
            name: 'Nom 2',
            message: 'Message 2'
        },
        {
            name: 'Nom 3',
            message: 'Message 3'
        },
    ]
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
    contributions,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const intl = useIntl();

    const hasTitle = title !== null;

    const isEmptyTitle = isEdit && !hasTitle;

    const [userName, setUserName] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [submitState, setSubmitState] = useState({
        submitted: false,
        submitting: false,
    });

    const onNameChange = useCallback( e => {
        setUserName(e.currentTarget.value);
    }, [setUserName]);

    const onMessageChange = useCallback( e => {
        setUserMessage(e.currentTarget.value);
    }, [setUserMessage]);

    const isSplitted = layout === 'split';
    const verticalAlign = isSplitted ? null : layout;

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        
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
        };
    }, [submitState, setSubmitState]);

    // Title

    const items = [
        <ScreenElement
            key="title"
            placeholder="title"
            emptyLabel={<FormattedMessage defaultMessage="Title" description="Title placeholder" />}
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

    items.push(
        <ScreenElement key="form" placeholder="form">
            <Transitions transitions={transitions} playing={current} delay={transitionStagger}>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Your name',
                            description: 'Your name placeholder',
                        })}
                        value={userName}
                        onChange={ e => onNameChange(e) }
                    />
                    <textarea
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Your message',
                            description: 'Your message placeholder'
                            
                        })}
                        value={userMessage}
                        onChange={ e => onMessageChange(e) }
                    >{userMessage}</textarea>
                    <button type="submit">
                        <FormattedMessage defaultMessage="Submit" description="Submit placeholder" />
                    </button>
                </form>
                <div className={styles.contributions}>
                    { contributions.map( (contribution, contributionI) => 
                        <div key={`contribution${contributionI}`} className={styles.contribution}>
                            <Text className={styles.contributionName} body={contribution.name} />
                            <Text className={styles.contributionMessage} body={contribution.message} />
                        </div>
                    ) }
                </div>
            </Transitions>
        </ScreenElement>,
    );

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
            <Container width={width} height={height} maxRatio={maxRatio} withScroll>
                <Layout
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={isView || isPreview ? { padding: spacing } : null}
                >
                    <Scroll verticalAlign="center" disabled={isPlaceholder}>
                        {items}
                    </Scroll>
                </Layout>
            </Container>
        </div>
    );
};

SurveyScreen.propTypes = propTypes;
SurveyScreen.defaultProps = defaultProps;

export default SurveyScreen;
