/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { isTextFilled } from '@micromag/core/utils';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom']),
    title: MicromagPropTypes.headingElement,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    resizeTransitionDuration: PropTypes.number,
    className: PropTypes.string,
    contributions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            message: PropTypes.string,
        }),
    ),
};

const defaultProps = {
    layout: 'top',
    title: null,
    spacing: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: null,
    transitionStagger: 100,
    resizeTransitionDuration: 750,
    className: null,
    contributions: [
        {
            name: 'Nom 1',
            message: 'Message 1',
        },
        {
            name: 'Nom 2',
            message: 'Message 2',
        },
        {
            name: 'Nom 3',
            message: 'Message 3',
        },
        {
            name: 'Nom 4',
            message: 'Message 4',
        },
        {
            name: 'Nom 5',
            message: 'Message 5',
        },
        {
            name: 'Nom 6',
            message: 'Message 6',
        },
        {
            name: 'Nom 7',
            message: 'Message 7',
        },
        {
            name: 'Nom 8',
            message: 'Message 8',
        },
        {
            name: 'Nom 9',
            message: 'Message 9',
        },
        {
            name: 'Nom 10',
            message: 'Message 10',
        },
    ],
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
    resizeTransitionDuration,
    className,
    contributions,
}) => {
    const { width, height } = useScreenSize();
    const landscape = width > height;

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const intl = useIntl();

    const hasTitle = isTextFilled(title);

    // @TODO en attendant de recevoir la prop "contributions" updaté au submit
    const [finalContributions, setFinalContributions] = useState(contributions);

    const contributionsRef = useRef(null);
    const formRef = useRef(null);
    const [interactiveContainerHeight, setInteractiveContainerHeight] = useState(null);

    const [userName, setUserName] = useState('');
    const [userMessage, setUserMessage] = useState('');

    // 0 = default, 1 = submitting, 2 = submitted, 3 = resizing, 4 = done
    const [submitState, setSubmitState] = useState(0);

    const onNameChange = useCallback(
        (e) => {
            setUserName(e.currentTarget.value);
        },
        [setUserName],
    );

    const onMessageChange = useCallback(
        (e) => {
            setUserMessage(e.currentTarget.value);
        },
        [setUserMessage],
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            let tmpSubmit = null;
            if (submitState === 0) {
                setInteractiveContainerHeight(formRef.current.offsetHeight);
                setSubmitState(1);

                const submit = () => {
                    setFinalContributions([
                        { name: userName, message: userMessage },
                        ...contributions,
                    ]);
                    setSubmitState(2);
                };
                // @TODO faux submit ici
                tmpSubmit = setTimeout(submit, 1000);
            }

            return () => {
                if (tmpSubmit !== null) {
                    clearTimeout(tmpSubmit);
                }
            };
        },
        [submitState, setSubmitState, userName, userMessage, contributions],
    );

    useEffect(() => {
        let timeout = null;
        if (submitState === 2) {
            timeout = setTimeout(setSubmitState, resizeTransitionDuration, 4);
            setInteractiveContainerHeight(contributionsRef.current.offsetHeight);
            setSubmitState(3);
        }

        return () => {
            if (submitState === 3 && timeout !== null) {
                clearTimeout(timeout);
            }
        };
    }, [submitState, setInteractiveContainerHeight, setSubmitState, resizeTransitionDuration]);

    // Title

    const items = [
        <ScreenElement
            key="title"
            placeholder="title"
            emptyLabel={<FormattedMessage defaultMessage="Title" description="Title placeholder" />}
            emptyClassName={styles.empty}
            isEmpty={!hasTitle}
        >
            {hasTitle ? (
                <Transitions transitions={transitions} playing={current}>
                    <Heading {...title} className={styles.title} />
                </Transitions>
            ) : null}
        </ScreenElement>,
    ];

    // Form

    items.push(
        <ScreenElement key="form" placeholder="form">
            <Transitions
                transitions={transitions}
                playing={current}
                delay={transitionStagger}
                disabled={!isView}
            >
                <div
                    className={styles.interactiveContainer}
                    style={{
                        height: submitState < 4 ? interactiveContainerHeight : null,
                        transitionDuration: `${resizeTransitionDuration}ms`,
                    }}
                >
                    <form className={styles.form} onSubmit={onSubmit} ref={formRef}>
                        <div className={styles.formContent}>
                            <input
                                type="text"
                                placeholder={intl.formatMessage({
                                    defaultMessage: 'Your name',
                                    description: 'Your name placeholder',
                                })}
                                value={userName}
                                onChange={(e) => onNameChange(e)}
                                required
                            />
                            <textarea
                                placeholder={intl.formatMessage({
                                    defaultMessage: 'Your message',
                                    description: 'Your message placeholder',
                                })}
                                rows={6}
                                value={userMessage}
                                onChange={(e) => onMessageChange(e)}
                                required
                            >
                                {userMessage}
                            </textarea>
                            <button type="submit">
                                <FormattedMessage
                                    defaultMessage="Submit"
                                    description="Submit placeholder"
                                />
                            </button>
                        </div>
                        <div className={styles.formLoading}>
                            <FontAwesomeIcon className={styles.loadingIcon} icon={faSpinner} />
                        </div>
                    </form>
                    <div className={styles.contributionsContainer}>
                        <div className={styles.contributionsContent}>
                            <div className={styles.contributions} ref={contributionsRef}>
                                {finalContributions.map((contribution, contributionI) => (
                                    <div
                                        key={`contribution${contributionI}`}
                                        className={styles.contribution}
                                    >
                                        <Text
                                            className={styles.contributionName}
                                            body={contribution.name}
                                            textStyle={{ fontStyle: 'bold' }}
                                        />
                                        <Text
                                            className={styles.contributionMessage}
                                            body={contribution.message}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
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
                    [styles.submitting]: submitState === 1,
                    [styles.submitted]: submitState > 1,
                    [styles.showContributions]: submitState === 4,
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
                <div
                    className={styles.content}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: !isPreview && !landscape ? spacing * 2 : spacing,
                              }
                            : null
                    }
                >
                    <Scroll verticalAlign={layout} disabled={isPlaceholder || isPreview}>
                        {items}
                    </Scroll>
                </div>
            </Container>
        </div>
    );
};

SurveyScreen.propTypes = propTypes;
SurveyScreen.defaultProps = defaultProps;

export default SurveyScreen;
