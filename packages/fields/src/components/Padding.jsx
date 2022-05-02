/* eslint-disable react/jsx-props-no-spreading */
import isObject from 'lodash/isObject';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
// import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from '@micromag/core/components';
import styles from '../styles/padding.module.scss';
import FieldWithForm from './FieldWithForm';
import Spacing from './Spacing';

const propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            top: PropTypes.string,
            left: PropTypes.string,
            bottom: PropTypes.string,
            right: PropTypes.string,
        }),
    ]),
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    isHorizontal: false,
    className: null,
    onChange: null,
    closeForm: null,
};

const PaddingField = ({ value, onChange, closeForm, ...props }) => {
    const intl = useIntl();

    const {
        top = null,
        left = null,
        right = null,
        bottom = null,
    } = isObject(value) ? value : { top: value, left: value, bottom: value, right: value };

    const defaultValue = isObject(value) ? null : value;

    const previewElement =
        value !== null ? (
            <span>
                {isObject(value)
                    ? `${top || 0}px ${left || 0}px ${bottom || 0}px ${right || 0}px`
                    : `${value}px`}
            </span>
        ) : null;

    const onClickReset = useCallback(() => {
        if (onChange !== null) {
            onChange(null);
        }
    }, [onChange, closeForm]);

    const onSpacingChange = useCallback(
        (newValue, direction = null) => {
            if (direction !== null) {
                onChange({ ...(isObject(value) ? value : null), [direction]: newValue });
            } else {
                onChange(newValue);
            }
        },
        [value, onChange],
    );

    return (
        <FieldWithForm
            value={value}
            onChange={onChange}
            label={null}
            thumbnail={previewElement}
            noValueLabel={
                <FormattedMessage defaultMessage="Select a size..." description="No value label" />
            }
            {...props}
        >
            <div className="p-2">
                <div className="d-flex w-100 align-content-center justify-content-center my-2">
                    <Spacing
                        className={styles.spacing}
                        value={defaultValue || top}
                        onChange={(val) => onSpacingChange(val, 'top')}
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Top',
                            description: 'Direction',
                        })}
                    />
                </div>
                <div className="d-flex w-100 align-content-center justify-content-between my-2">
                    <Spacing
                        className={styles.spacing}
                        value={defaultValue || left}
                        onChange={(val) => onSpacingChange(val, 'left')}
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Left',
                            description: 'Direction',
                        })}
                    />
                    <Spacing
                        className={styles.spacing}
                        value={defaultValue || right}
                        onChange={(val) => onSpacingChange(val, 'right')}
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Right',
                            description: 'Direction',
                        })}
                    />
                </div>
                <div className="d-flex w-100 align-content-center justify-content-center my-2">
                    <Spacing
                        className={styles.spacing}
                        value={defaultValue || bottom}
                        onChange={(val) => onSpacingChange(val, 'bottom')}
                        placeholder={intl.formatMessage({
                            defaultMessage: 'Bottom',
                            description: 'Direction',
                        })}
                    />
                </div>
                <div className="d-flex mt-4">
                    <Button theme="light" size="sm" onClick={closeForm}>
                        <FormattedMessage defaultMessage="Close" description="Button label" />
                    </Button>
                    {value !== null ? (
                        <Button
                            outline
                            theme="secondary"
                            size="sm"
                            className="ms-auto"
                            onClick={onClickReset}
                        >
                            <FormattedMessage defaultMessage="Clear" description="Button label" />
                        </Button>
                    ) : null}
                </div>
            </div>
        </FieldWithForm>
    );
};

PaddingField.propTypes = propTypes;
PaddingField.defaultProps = defaultProps;
PaddingField.withForm = true;

export default PaddingField;
