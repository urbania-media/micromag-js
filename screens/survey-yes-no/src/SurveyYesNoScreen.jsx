/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/element-text';
import Image from '@micromag/element-image';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Button from '@micromag/element-button';
import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    question: MicromagPropTypes.textElement,

    result: PropTypes.shape({
        image: MicromagPropTypes.image,
        text: MicromagPropTypes.textElement,
    }),
    onClick: PropTypes.func,
    background: MicromagPropTypes.backgroundElement,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    question: null,
    result: null,
    onClick: null,
    background: null,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const SurveyYesNo = ({
    question,
    result,
    onClick,
    background,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isEditor, isView } = getRenderFormat(renderFormat);

    const [answered, setAnswered] = useState(false);

    const { image, text: resultText } = result || {};

    const onClickSubmit = () => {
        setAnswered(true);
    };

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isPlaceholder]: renderFormat === 'placeholder',
                    [styles.isPreview]: renderFormat === 'preview',
                    [className]: className !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={isView || (isEditor && active)}
                className={styles.background}
            >
                <Frame width={width} height={height} visible={visible}>
                    <div className={styles.inner}>
                        {answered ? (
                            <div className={styles.resultContainer}>
                                <Image className={styles.image} {...image} />
                                <TextComponent className={styles.result} {...resultText} />
                            </div>
                        ) : (
                            <>
                                <div className={styles.questionContainer}>
                                    {renderFormat !== 'placeholder' ? (
                                        <>
                                            {question !== null ? (
                                                <TextComponent {...question} />
                                            ) : null}
                                        </>
                                    ) : (
                                        <Placeholders.Text className={styles.placeholder} />
                                    )}
                                </div>
                                <div className={styles.buttons}>
                                    {renderFormat !== 'placeholder' ? (
                                        <>
                                            <Button className={styles.button} onClick={onClick}>
                                                Oui
                                            </Button>
                                            <Button className={styles.button} onClick={onClick}>
                                                Non
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Placeholders.Button
                                                className={styles.buttonPlaceholder}
                                            />
                                            <Placeholders.Button
                                                className={styles.buttonPlaceholder}
                                            />
                                        </>
                                    )}
                                </div>
                                {renderFormat !== 'placeholder' ? (
                                    <Button className={styles.submitButton} onClick={onClickSubmit}>
                                        soumettre
                                    </Button>
                                ) : (
                                    <Placeholders.Button
                                        className={styles.submitButtonPlaceholder}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

SurveyYesNo.propTypes = propTypes;
SurveyYesNo.defaultProps = defaultProps;

export default SurveyYesNo;
