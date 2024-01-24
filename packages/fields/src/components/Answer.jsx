/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Fields from './Fields';

import styles from '../styles/slide.module.scss';

const propTypes = {
    value: PropTypes.shape({
        text: PropTypes.string,
        image: MicromagPropTypes.imageMedia,
    }),
    isForm: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    isForm: false,
    className: null,
};

const AnswerField = ({ value, isForm, className, ...props }) => {
    const { text = null } = value || {};
    return isForm ? (
        <div
            className={classNames([
                styles.panel,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Fields
                className={classNames([
                    {
                        'p-2': isForm,
                        className: className !== null,
                    },
                ])}
                {...props}
                value={value}
            />
        </div>
    ) : (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {text !== null ? (
                <span className={styles.value}>{text}</span>
            ) : (
                <span className={styles.noValue}>Entrez une question...</span>
            )}
        </div>
    );
};

AnswerField.propTypes = propTypes;
AnswerField.defaultProps = defaultProps;

export default AnswerField;
