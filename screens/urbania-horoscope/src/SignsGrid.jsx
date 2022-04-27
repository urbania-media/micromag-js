/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import SignModal from './SignModal';
import styles from './signs-grid.module.scss';

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
    width: PropTypes.number,
    height: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    closeButton: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    signs: null,
    width: null,
    height: null,
    background: { color: '#000F66', aplha: 1 },
    closeButton: null,
    className: null,
};

const SignsGrid = ({ signs, width, height, background, closeButton, className }) => {
    const [activeSign, setActiveSign] = useState({});

    const closeModal = () => setActiveSign({});

    // MOVE THIS TO DEFAULT PROPS !!!!
    const defaultBackground = { color: '#000F66', aplha: 1 };
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
                background={background || defaultBackground}
                width={width}
                height={height}
                // playing={backgroundPlaying}
                // shouldLoad={backgroundShouldLoad}
            />
            <Container width={width} height={height}>
                <Layout
                    width={width}
                    height={height}
                    className={styles.layout}
                    verticalAlign="middle"
                >
                    <Button onClick={closeButton} className={styles.closeButton}>
                        X
                    </Button>
                    <div className={styles.gridContainer}>
                        {signs.map(({ id = null, image = null, label = null, date = null }) => (
                            <Button
                                className={styles.gridElement}
                                type="button"
                                onClick={() => setActiveSign({ id, image, label, date })}
                            >
                                {image ? (
                                    <img className={styles.image} src={image.toString()} alt={id} />
                                ) : null}
                                <div className={styles.gridText}>
                                    <h2 className={styles.signName}>
                                        <FormattedMessage {...label} />
                                    </h2>
                                    <p className={styles.date}>
                                        <FormattedMessage {...date} />
                                    </p>
                                </div>
                            </Button>
                        ))}
                        {activeSign.id ? (
                            <SignModal
                                width={width}
                                height={height}
                                className={styles.signModal}
                                backButton={closeModal}
                                sign={activeSign}
                            />
                        ) : null}
                    </div>
                </Layout>
            </Container>
        </div>
    );
};

SignsGrid.propTypes = propTypes;
SignsGrid.defaultProps = defaultProps;

export default React.memo(SignsGrid);
