/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderTitle, ScreenElement } from '@micromag/core/components';
import { useScreenRenderContext } from '@micromag/core/contexts';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import Author from '@micromag/element-urbania-author';
import SignModal from './SignModal';
import Close from './icons/Close';

import styles from './signs-grid.module.scss';

import horoscopeBackground from './images/horoscope-background.png';

const defaultBackground = {
    image: {
        type: 'image',
        url: horoscopeBackground,
        width: 2161,
        height: 3859,
    },
    color: '#000F66',
};

const propTypes = {
    signs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
            date: MicromagPropTypes.message,
            thumbnail: PropTypes.string,
            word: MicromagPropTypes.headingElement,
            description: MicromagPropTypes.textElement,
        }),
    ),
    author: MicromagPropTypes.authorElement,
    signSubtitle: MicromagPropTypes.headingElement,
    currentSign: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    closeButton: PropTypes.func,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitionDisabled: PropTypes.bool,
    mediaRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            // eslint-disable-next-line react/forbid-prop-types
            current: PropTypes.any,
        }),
    ]),
    muted: PropTypes.bool,
    onClickSign: PropTypes.func,
    onClickClose: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    signs: null,
    author: null,
    signSubtitle: null,
    currentSign: null,
    width: null,
    height: null,
    background: null,
    closeButton: null,
    current: true,
    active: true,
    transitionDisabled: false,
    muted: false,
    mediaRef: null,
    onClickSign: null,
    onClickClose: null,
    className: null,
};

const SignsGrid = ({
    signs,
    author,
    signSubtitle,
    currentSign: currentSignId,
    width,
    height,
    background,
    closeButton,
    current,
    active,
    transitionDisabled,
    muted,
    mediaRef,
    onClickSign,
    onClickClose,
    className,
}) => {
    const currentSign = signs.find(({ id = null }) => currentSignId === id) || null;
    const { isView, isPlaceholder, isEdit } = useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = !isPlaceholder && (current || active);
    const hasAuthor = author !== null && isTextFilled(author.name);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {!isPlaceholder ? (
                <Background
                    background={background || defaultBackground}
                    fit="cover"
                    playing={backgroundPlaying}
                    shouldLoad={mediaShouldLoad}
                    muted={muted}
                    mediaRef={mediaRef}
                />
            ) : null}
            <Container width={width} height={height}>
                <Layout
                    width={width}
                    height={height}
                    className={styles.layout}
                    verticalAlign="middle"
                >
                    {!isPlaceholder ? (
                        <Button onClick={closeButton} className={styles.closeButton}>
                            <Close className={styles.close} />
                        </Button>
                    ) : null}
                    <TransitionGroup>


                        {currentSign === null ? (
                            <CSSTransition
                                key="grid"
                                classNames={styles}
                                timeout={transitionDisabled ? 0 : 1000}
                            >
                                <div
                                    className={classNames([
                                        styles.gridContainer,
                                        {
                                            [styles.isPlaceholder]: isPlaceholder,
                                        },
                                    ])}
                                >
                                    {signs.map((sign) => {
                                        const {
                                            id = null,
                                            thumbnail = null,
                                            label = null,
                                            date = null,
                                        } = sign || {};
                                        return (
                                            <ScreenElement
                                                key={id}
                                                placeholder={
                                                    <PlaceholderTitle
                                                        className={styles.signPlaceholder}
                                                    />
                                                }
                                                emptyLabel={
                                                    <FormattedMessage
                                                        defaultMessage="Horoscope sign"
                                                        description="Sign placeholder"
                                                    />
                                                }
                                                emptyClassName={styles.emptyText}
                                                isEmpty={!id}
                                            >
                                                <Button
                                                    className={styles.gridElement}
                                                    type="button"
                                                    onClick={() => {
                                                        if (onClickSign !== null) {
                                                            onClickSign(id);
                                                        }
                                                    }}
                                                >
                                                    {thumbnail !== null ? (
                                                        <img
                                                            className={styles.thumbnail}
                                                            src={thumbnail}
                                                            alt={id}
                                                            loading="lazy"
                                                        />
                                                    ) : null}
                                                    <div className={styles.gridText}>
                                                        <h2 className={styles.signName}>
                                                            {label !== null ? (
                                                                <FormattedMessage {...label} />
                                                            ) : null}
                                                        </h2>
                                                        <p className={styles.date}>
                                                            {date !== null ? (
                                                                <FormattedMessage {...date} />
                                                            ) : null}
                                                        </p>
                                                    </div>
                                                </Button>
                                            </ScreenElement>
                                        );
                                    })}

                                    {/* Author + Collaborator credit */}
                                    {currentSign === null ? (
                                        <ScreenElement
                                            key="author"
                                            emptyLabel={
                                                <FormattedMessage defaultMessage="Author" description="Author placeholder" />
                                            }
                                            emptyClassName={styles.emptyText}
                                            isEmpty={!hasAuthor}
                                        >
                                            {hasAuthor && !isPlaceholder ? (
                                                <Author
                                                    author={author}
                                                    className={styles.author}
                                                    collaboratorClassName={styles.collaborator}
                                                    backgroundClassName={styles.authorBackground}
                                                    shouldLoad={mediaShouldLoad}
                                                />
                                            ) : null}
                                        </ScreenElement>
                                    ): null}
                                </div>
                            </CSSTransition>
                        ) : (
                            <CSSTransition key="modal" classNames={styles} timeout={500}>
                                <div className={styles.modalContainer}>
                                    <Button onClick={onClickClose} className={styles.closeButton}>
                                        <Close className={styles.close} />
                                    </Button>
                                    <SignModal
                                        width={width}
                                        height={height}
                                        className={styles.signModal}
                                        sign={currentSign}
                                        subtitle={signSubtitle}
                                        transitionDisabled={transitionDisabled}
                                    />
                                </div>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </Layout>
            </Container>
        </div>
    );
};

SignsGrid.propTypes = propTypes;
SignsGrid.defaultProps = defaultProps;

export default SignsGrid;
