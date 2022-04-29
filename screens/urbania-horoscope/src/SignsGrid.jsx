/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderTitle, ScreenElement } from '@micromag/core/components';
import { useScreenRenderContext } from '@micromag/core/contexts';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import SignModal from './SignModal';
import Close from './icons/Close';
import { background as horoscopeBackground } from './images';
import styles from './signs-grid.module.scss';

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
            image: PropTypes.string,
            word: MicromagPropTypes.headingElement,
            description: MicromagPropTypes.textElement,
        }),
    ),
    signSubtitle: MicromagPropTypes.headingElement,
    width: PropTypes.number,
    height: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    closeButton: PropTypes.func,
    current: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    signs: null,
    signSubtitle: null,
    width: null,
    height: null,
    background: null,
    closeButton: null,
    current: true,
    active: true,
    className: null,
};

const SignsGrid = ({
    signs,
    signSubtitle,
    width,
    height,
    background,
    closeButton,
    current,
    active,
    className,
}) => {
    const [activeSign, setActiveSign] = useState(null);

    useEffect(() => {
        const { id: currentId = null } = activeSign || {};
        const currentSign =
            signs.find(({ id = null }) => currentId !== null && currentId === id) || null;

        if (currentSign !== null) {
            setActiveSign(currentSign);
        }
    }, [activeSign, setActiveSign, signs]);

    const closeModal = () => setActiveSign(null);

    const { isView, isPlaceholder } = useScreenRenderContext();

    const backgroundShouldLoad = !isPlaceholder && (current || active || !isView);

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
                    // playing={backgroundPlaying}
                    shouldLoad={backgroundShouldLoad}
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
                            <Close className={styles.closeX} />
                        </Button>
                    ) : null}
                    <TransitionGroup>
                        {activeSign ? (
                            <CSSTransition
                                key="backButton"
                                classNames={{
                                    enter: styles.buttonEnter,
                                    enterActive: styles.buttonEnterActive,
                                    exit: styles.buttonExit,
                                    exitActive: styles.buttonExitActive,
                                }}
                                timeout={1000}
                            >
                                <Button onClick={closeModal} className={styles.backButton}>
                                    <span className={styles.arrow}>←</span>
                                    <FormattedMessage
                                        defaultMessage="Back to the Signs"
                                        description="Horoscope Back Button"
                                    />
                                </Button>
                            </CSSTransition>
                        ) : null}
                        {!activeSign ? (
                            <CSSTransition key="grid" classNames={styles} timeout={1000}>
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
                                            image = null,
                                            label = null,
                                            date = null,
                                            // eslint-disable-next-line no-unused-vars
                                            word = null,
                                            // eslint-disable-next-line no-unused-vars
                                            description = null,
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
                                                    onClick={() => setActiveSign(sign)}
                                                >
                                                    {image !== null ? (
                                                        <img
                                                            className={styles.image}
                                                            src={image}
                                                            alt={id}
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
                                </div>
                            </CSSTransition>
                        ) : (
                            <CSSTransition
                                key="modal"
                                classNames={{
                                    enter: styles.modalEnter,
                                    enterActive: styles.modalEnterActive,
                                    exit: styles.modalExit,
                                    exitActive: styles.modalExitActive,
                                }}
                                timeout={500}
                            >
                                <SignModal
                                    width={width}
                                    height={height}
                                    className={styles.signModal}
                                    backButton={closeModal}
                                    sign={activeSign}
                                    subtitle={signSubtitle}
                                />
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
