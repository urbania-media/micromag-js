/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextComponent from '@micromag/component-text';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Button from '@micromag/component-button';
import { Placeholders, PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    question: MicromagPropTypes.textComponent,
    background: MicromagPropTypes.backgroundComponent,
    onClick: PropTypes.func,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    question: null,
    background: null,
    onClick: null,
    renderFormat: 'view',
    className: null,
};

const SurveyYesNo = ({ question, background, onClick, renderFormat, className }) => {
    const { width, height } = useScreenSize();

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
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height}>
                    <div className={styles.inner}>
                        <div className={styles.questionContainer}>
                            {question !== null && renderFormat !== 'placeholder' ? (
                                <TextComponent {...question} />
                            ) : (
                                <Placeholders.Text className={styles.placeholder} />
                            )}
                        </div>
                        <div className={styles.buttons}>
                            {renderFormat !== 'placeholder' ? (
                                <>
                                    <Button className={styles.yes} onClick={onClick}>Yes</Button>
                                    <Button className={styles.no} onClick={onClick}>No</Button>
                                </>
                            ) : (
                                <>
                                    <Placeholders.Button />
                                    <Placeholders.Button />
                                </>
                            )}
                        </div>
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

SurveyYesNo.propTypes = propTypes;
SurveyYesNo.defaultProps = defaultProps;

export default SurveyYesNo;
