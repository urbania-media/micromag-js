/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
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
    activeSignId: PropTypes.string,
    setActiveSignId: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    closeButton: PropTypes.func,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitionDisabled: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    signs: null,
    signSubtitle: null,
    activeSignId: null,
    setActiveSignId: null,
    width: null,
    height: null,
    background: null,
    closeButton: null,
    current: true,
    active: true,
    transitionDisabled: false,
    className: null,
};

const SignsGrid = ({
    signs,
    signSubtitle,
    activeSignId,
    setActiveSignId,
    width,
    height,
    background,
    closeButton,
    current,
    active,
    transitionDisabled,
    className,
}) => {
    // const [activeSignId, setActiveSignId] = useState(null);
    const activeSign = signs.find(({ id = null }) => activeSignId === id) || null;
    const closeModal = useCallback(() => setActiveSignId(null), [activeSignId, setActiveSignId]);
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
                        {!activeSignId ? (
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
                                            image = null,
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
                                                    onClick={() => setActiveSignId(id)}
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
                            <CSSTransition key="modal" classNames={styles} timeout={500}>
                                <div className={styles.modalContainer}>
                                    <Button onClick={closeModal} className={styles.backButton}>
                                        <span className={styles.arrow}>←</span>
                                        <FormattedMessage
                                            defaultMessage="Back to the Signs"
                                            description="Horoscope Back Button"
                                        />
                                    </Button>
                                    <SignModal
                                        width={width}
                                        height={height}
                                        className={styles.signModal}
                                        sign={activeSign}
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
