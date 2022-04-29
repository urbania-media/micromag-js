/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import { useScreenRenderContext } from '@micromag/core/contexts';
import { isTextFilled } from '@micromag/core/utils';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import styles from './sign-modal.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    sign: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        date: MicromagPropTypes.message,
        image: PropTypes.string,
        word: MicromagPropTypes.headingElement,
        description: MicromagPropTypes.textElement,
    }),
    subtitle: MicromagPropTypes.headingElement,
    current: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    sign: null,
    subtitle: null,
    current: true,
    className: null,
};

const SignModal = ({ width, height, sign, subtitle, current, className }) => {
    // eslint-disable-next-line no-unused-vars
    const { label = null, image = null, date = null, word = null, description = null } = sign;
    const { body: wordBody = null } = word || {};

    const { isPreview, isPlaceholder, isEdit, isStatic, isCapture } = useScreenRenderContext();

    const hasWord = isTextFilled(word);
    const hasSubtitle = isTextFilled(subtitle);

    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const items = [
        <ScreenElement>
            <h2 className={styles.signName}>
                <FormattedMessage {...label} />
            </h2>
        </ScreenElement>,

        hasWord ? (
            <div className={styles.wordContainer}>
                {hasSubtitle ? (
                    <Heading className={styles.wordTitle} {...subtitle} />
                ) : (
                    <h3 className={styles.wordTitle}>
                        <FormattedMessage
                            defaultMessage="Word of the Week"
                            description="Horoscope Subtitle"
                        />
                    </h3>
                )}
                <Text className={styles.word} body={wordBody} />
            </div>
        ) : null,
        description ? <Text className={styles.description} {...description} /> : null,
        <img className={styles.image} src={image} alt="" />,
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

export default SignModal;
