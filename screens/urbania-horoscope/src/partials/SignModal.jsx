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
        label: MicromagPropTypes.textElement,
        date: MicromagPropTypes.message,
        image: PropTypes.string,
        word: MicromagPropTypes.headingElement,
        description: MicromagPropTypes.textElement,
    }),
    subtitle: MicromagPropTypes.headingElement,
    current: PropTypes.bool,
    transitionDisabled: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    width: null,
    height: null,
    sign: null,
    subtitle: null,
    current: true,
    transitionDisabled: false,
    onClose: null,
    className: null,
};

const SignModal = ({
    width,
    height,
    sign,
    subtitle,
    current,
    transitionDisabled,
    onClose,
    className,
}) => {
    // eslint-disable-next-line no-unused-vars
    const { label = null, image = null, date = null, word = null, description = null } = sign || {};
    const { body: wordBody = null } = word || {};

    const { isEdit } = useScreenRenderContext();

    const hasWord = isTextFilled(word);
    const hasSubtitle = isTextFilled(subtitle);

    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    return (
        <Container
            width={width}
            height={height}
            className={classNames([
                styles.container,
                {
                    [styles.withoutTransitions]: transitionDisabled,
                    [className]: className !== null,
                },
            ])}
        >
            <button
                type="button"
                className={styles.modalButton}
                onClick={(e) => e.preventDefault()}
                onPointerUp={onClose}
            >
                <Scroll disabled={scrollingDisabled} verticalAlign="middle">
                    <div className={styles.modal}>
                        {label !== null ? (
                            <ScreenElement>
                                <h2 className={styles.name}>
                                    <FormattedMessage {...label} />
                                </h2>
                            </ScreenElement>
                        ) : null}

                        {hasWord ? (
                            <div className={styles.wordContainer}>
                                {hasSubtitle ? (
                                    <Heading className={styles.wordOfTheWeek} {...subtitle} />
                                ) : (
                                    <h3 className={styles.wordOfTheWeek}>
                                        <FormattedMessage
                                            defaultMessage="Word of the Week"
                                            description="Horoscope Subtitle"
                                        />
                                    </h3>
                                )}
                                <Text className={styles.word} body={wordBody} />
                            </div>
                        ) : null}

                        {description ? (
                            <Text className={styles.description} {...description} />
                        ) : null}

                        {image ? (
                            <img className={styles.illustration} src={image} alt={label} />
                        ) : null}
                    </div>
                </Scroll>
            </button>
        </Container>
    );
};

SignModal.propTypes = propTypes;
SignModal.defaultProps = defaultProps;

export default SignModal;
