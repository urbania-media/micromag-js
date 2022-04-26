import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import SignModal from './SignModal';
import signsList from './signs';
import styles from './signs-grid.module.scss';

const propTypes = {
    defaultSigns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
        }),
    ),
    signs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
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
    defaultSigns: signsList,
    signs: null,
    width: null,
    height: null,
    background: { color: '#000F66', aplha: 1 },
    closeButton: null,
    className: null,
};

const SignsGrid = ({
    defaultSigns,
    signs: signsValue,
    width,
    height,
    background,
    closeButton,
    className,
}) => {
    const signs = defaultSigns.map((sign, index) => ({
        ...sign,
        ...(signsValue !== null && signsValue[index] ? signsValue[index] || null : null),
    }));
    // console.log(background);

    const [activeSign, setActiveSign] = useState('');

    const closeModal = () => setActiveSign('');

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
                        {signs.map((sign) => (
                            <button
                                className={styles.gridElement}
                                type="button"
                                onClick={() => setActiveSign(sign.id)}
                            >
                                {sign.image ? (
                                    <img
                                        className={styles.image}
                                        src={sign.image.toString()}
                                        alt={sign.id}
                                    />
                                ) : null}
                                <div className={styles.gridText}>
                                    <h2 className={styles.signName}>{sign.id}</h2>
                                    <p className={styles.date}>1 jan au 31 dec</p>
                                </div>
                            </button>
                        ))}
                        {activeSign.length > 0 ? (
                            <SignModal className={styles.signModal} backButton={closeModal} />
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
