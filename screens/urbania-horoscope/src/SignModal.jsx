/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    // PlaceholderText,
    // PlaceholderTitle,
    ScreenElement, // TransitionsStagger,
} from '@micromag/core/components';
import { useScreenRenderContext } from '@micromag/core/contexts';
// import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
// import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import styles from './sign-modal.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    backButton: PropTypes.func,
    sign: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        date: MicromagPropTypes.message,
        image: PropTypes.string,
        word: MicromagPropTypes.headingElement,
        description: MicromagPropTypes.textElement,
    }),
    current: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    background: null,
    backButton: null,
    sign: null,
    current: true,
    className: null,
};

const SignModal = ({ width, height, background, backButton, sign, current, className }) => {
    const { label, image, date, word } = sign;

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    console.log(sign);

    const items = [
        <Button onClick={backButton} className={styles.backButton}>
            <span className={styles.arrow}>←</span> Back to the signs
        </Button>,
        <ScreenElement>
            <h2 className={styles.signName}>
                <FormattedMessage {...label} />
            </h2>
        </ScreenElement>,
        <div className={styles.wordContainer}>
            <h3 className={styles.wordTitle}>
                {/* <Heading className={styles.wordTitle} {...word} /> */}
                Le mot de la semaine
            </h3>
            {/* <h2 className={styles.word}>ça va pas être jojo!</h2> */}
        </div>,

        <p className={styles.description}>
            On vous reproche parfois d’être une personne manipulatrice. Certes, vous avez vos torts.
            Mais vous souhaitez à tout prix évoluer. « Sincérité avant tout » est votre nouveau
            mantra. <br /> <br />
            L’année 2022 est le bon moment pour devenir moins serpent et plus humain. Commencez par
            faire une vidéo d’excuses qui cartonnera sur Tiktok. Ça prouvera votre humilité, mais
            aussi votre grande maîtrise des réseaux sociaux. On vous reproche parfois d’être une
            personne manipulatrice. Certes, vous avez vos torts. Mais vous souhaitez à tout prix
            évoluer. « Sincérité avant tout » est votre nouveau mantra.
        </p>,
        <img className={styles.image} src={image.toString()} alt="" />,
    ];

    return (
        <Container
            width={width}
            height={height}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Scroll disabled={scrollingDisabled} verticalAlign="middle">
                <div className={styles.modalContainer}>{items}</div>
            </Scroll>
        </Container>
    );
};

SignModal.propTypes = propTypes;
SignModal.defaultProps = defaultProps;

export default React.memo(SignModal);
