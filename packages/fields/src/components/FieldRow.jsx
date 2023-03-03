/* eslint-disable no-nested-ternary */

/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Label } from '@micromag/core/components';

import FieldErrors from './FieldErrors';
import FieldHelp from './FieldHelp';

import styles from '../styles/field-row.module.scss';

const propTypes = {
    label: MicromagPropTypes.label,
    errors: MicromagPropTypes.errors,
    help: MicromagPropTypes.label,
    children: PropTypes.node,
    isSection: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    isListItem: PropTypes.bool,
    withoutLabel: PropTypes.bool,
    withSettings: PropTypes.bool,
    withForm: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    withValue: PropTypes.bool,
    buttonTheme: MicromagPropTypes.buttonTheme,
    buttonOutline: PropTypes.bool,
    gotoSettings: PropTypes.func,
    gotoForm: PropTypes.func,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
};

const defaultProps = {
    label: null,
    errors: null,
    help: null,
    children: null,
    isSection: false,
    isHorizontal: false,
    isListItem: false,
    withoutLabel: false,
    withSettings: false,
    withForm: false,
    withValue: false,
    buttonTheme: null,
    buttonOutline: false,
    gotoSettings: null,
    gotoForm: null,
    className: null,
    labelClassName: null,
    buttonClassName: null,
};

const FieldRow = ({
    label,
    errors,
    help,
    children,
    isSection,
    isHorizontal,
    isListItem,
    withoutLabel,
    withSettings,
    withForm,
    withValue,
    buttonTheme,
    buttonOutline,
    gotoForm,
    gotoSettings,
    className,
    labelClassName,
    buttonClassName,
}) => {
    const withLabel = !withoutLabel && label !== null;
    const isClickable = withForm;

    const onClickRow = useCallback(() => {
        if (typeof withForm === 'string') {
            gotoForm(withForm);
        } else if (withForm) {
            gotoForm();
        }
    }, [withForm, gotoForm]);

    const containerClassName = classNames([
        'form-group',
        {
            'list-group-item': isListItem,
            'mb-0': isListItem,
            'py-2': isListItem,
            'px-2': isListItem,
            'text-light': isListItem,
            [className]: className !== null,
        },
    ]);

    const helpElement = help !== null ? <FieldHelp>{help}</FieldHelp> : null;

    const errorsElement =
        errors !== null && errors.length > 0 ? <FieldErrors errors={errors} /> : null;

    const hasIndicationsUnder = helpElement !== null || errorsElement !== null;

    const labelElement =
        label !== null ? (
            <label
                className={classNames({
                    [styles.colLabel]: isHorizontal,
                    'col-form-label': isHorizontal || withSettings,
                    'form-label': !isHorizontal && !withSettings,
                    'col-auto': isHorizontal,
                    col: !isHorizontal && withSettings,
                    'py-0': isHorizontal,
                    'pt-2': isHorizontal && hasIndicationsUnder,
                    'me-1': isHorizontal,
                    'align-self-center': isHorizontal && !hasIndicationsUnder,
                    'fw-normal': !isSection,
                    'fw-bold': isSection,
                    [labelClassName]: labelClassName !== null,
                })}
            >
                <Label>{label}</Label>
            </label>
        ) : null;

    const arrowElement = isClickable ? (
        <span className="col-auto align-self-center d-flex align-items-center mw-25">
            <FontAwesomeIcon icon={faAngleRight} />
        </span>
    ) : null;

    if (isHorizontal) {
        const rowInner = (
            <span className={classNames(['row', 'flex-nowrap', 'gx-1'])}>
                {labelElement}
                <span
                    className={classNames([
                        'col',
                        styles.colValue,
                        'align-self-center',
                        {
                            [styles.colMinWidth]: isListItem,
                            [styles.colButtonWidth]: isClickable && buttonTheme !== null,
                        },
                    ])}
                >
                    <span className={classNames(['d-flex', 'justify-content-end', 'me-1'])}>
                        {children}
                    </span>
                    {helpElement !== null || errorsElement !== null ? (
                        <span
                            className={classNames([
                                'd-flex',
                                'mt-1',
                                // 'w-100',
                                'justify-content-end',
                            ])}
                        >
                            {helpElement}
                            {errorsElement}
                        </span>
                    ) : null}
                </span>
                {arrowElement}
            </span>
        );

        return isClickable ? (
            <button
                type="button"
                className={classNames([
                    containerClassName,
                    {
                        [styles.resetButton]: !isListItem,
                        'd-block': !isListItem,
                        'w-100': isListItem,
                        'p-2': !isListItem,
                    },
                ])}
                onClick={onClickRow}
            >
                {rowInner}
            </button>
        ) : (
            <div className={containerClassName}>{rowInner}</div>
        );
    }
    return (
        <div className={containerClassName}>
            {withLabel ? (
                withSettings ? (
                    <div className={classNames(['row', 'align-items-center', 'gx-1'])}>
                        {labelElement}
                        <div className={classNames(['col-auto'])}>
                            <Button
                                className={styles.settingsButton}
                                withoutStyle
                                onClick={gotoSettings}
                                disabled={!withValue}
                            >
                                <FontAwesomeIcon icon={faSlidersH} />
                            </Button>
                        </div>
                    </div>
                ) : (
                    labelElement
                )
            ) : null}
            {isClickable ? (
                <Button
                    className={classNames([
                        styles.arrow,
                        'd-block',
                        'w-100',
                        'px-2',
                        {
                            'bg-dark': buttonTheme === null,
                            // 'text-dark': buttonTheme === null,
                            [buttonClassName]: buttonClassName !== null,
                        },
                    ])}
                    theme={buttonTheme}
                    outline={buttonOutline}
                    onClick={onClickRow}
                >
                    <span className="row align-items-center">
                        <span className={classNames(['col', styles.colValue])}>{children}</span>
                        {arrowElement}
                    </span>
                </Button>
            ) : (
                children
            )}
            {helpElement}
            {errorsElement}
        </div>
    );
};

FieldRow.propTypes = propTypes;
FieldRow.defaultProps = defaultProps;

export default FieldRow;
