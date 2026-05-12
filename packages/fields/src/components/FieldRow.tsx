/* eslint-disable no-nested-ternary */
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';

import type { ButtonTheme, Errors, Label as LabelType } from '@micromag/core';
import { Button, Label } from '@micromag/core/components';

import FieldErrors from './FieldErrors';
import FieldHelp from './FieldHelp';
import ToggleField from './Toggle';

import styles from '../styles/field-row.module.css';

interface FieldRowProps {
    label?: LabelType | null;
    errors?: Errors | null;
    help?: LabelType | null;
    value?: unknown | null;
    defaultValue?: unknown | null;
    children?: React.ReactNode | null;
    isSection?: boolean;
    isHorizontal?: boolean;
    isListItem?: boolean;
    isCollapsible?: boolean;
    withoutLabel?: boolean;
    withoutCaret?: boolean;
    withSettings?: boolean;
    withToggle?: boolean;
    withForm?: boolean | string;
    withValue?: boolean;
    buttonTheme?: ButtonTheme | null;
    buttonOutline?: boolean;
    gotoSettings?: ((...args: unknown[]) => void) | null;
    gotoForm?: ((...args: unknown[]) => void) | null;
    onChange?: ((...args: unknown[]) => void) | null;
    className?: string | null;
    labelClassName?: string | null;
    buttonClassName?: string | null;
}

function FieldRow({
    label = null,
    errors = null,
    help = null,
    value = null,
    defaultValue = null,
    children = null,
    isSection = false,
    isHorizontal = false,
    isListItem = false,
    isCollapsible = false,
    withoutLabel = false,
    withoutCaret = false,
    withSettings = false,
    withToggle = false,
    withForm = false,
    withValue = false,
    buttonTheme = null,
    buttonOutline = false,
    gotoForm = null,
    gotoSettings = null,
    onChange = null,
    className = null,
    labelClassName = null,
    buttonClassName = null,
}: FieldRowProps) {
    const withLabel = !withoutLabel && label !== null;
    const isClickable = withForm;
    const [isCollapsed, setIsCollapsed] = useState(isCollapsible);
    const toggleCollapsed = () => {
        if (isCollapsible) {
            setIsCollapsed(!isCollapsed);
        }
    };

    const onClickRow = () => {
        if (typeof withForm === 'string') {
            gotoForm(withForm);
        } else if (withForm) {
            gotoForm();
        }
    };

    const containerClassName = classNames([
        'form-group',
        {
            'list-group-item': isListItem,
            'mb-0': isListItem,
            'py-2': isListItem,
            'px-2': isListItem,
            'text-light': isListItem,
        },
        className,
    ]);

    const helpElement = help !== null ? <FieldHelp>{help}</FieldHelp> : null;

    const errorsElement =
        errors !== null && errors.length > 0 ? <FieldErrors errors={errors} /> : null;

    const hasIndicationsUnder = helpElement !== null || errorsElement !== null;

    const toggled = !withToggle || value !== null;

    const labelElement =
        label !== null ? (
            <label
                className={classNames([
                    labelClassName,
                    {
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
                    },
                ])}
            >
                <Label>{label}</Label>
                {isCollapsible ? (
                    <Button withoutStyle className="ms-1" onClick={toggleCollapsed}>
                        <span className="ms-1">
                            <FontAwesomeIcon icon={faAngleRight} />
                        </span>
                    </Button>
                ) : null}
            </label>
        ) : null;

    const arrowElement =
        isClickable && !withValue && !withoutCaret ? (
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
                            [styles.collapsed]: isCollapsible && isCollapsed,
                            [styles.colMinWidth]: isListItem,
                            [styles.colButtonWidth]: isClickable && buttonTheme !== null,
                        },
                    ])}
                >
                    <span className={classNames(['d-flex', 'justify-content-end'])}>
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

    const onToggleChange = (newValue) => {
        if (onChange !== null) {
            onChange(newValue ? defaultValue || {} : null);
        }
    };

    const toggleElement = withToggle ? (
        <div className={classNames(['col-auto'])}>
            <ToggleField value={toggled} onChange={onToggleChange} className="ms-1" />
        </div>
    ) : null;

    const settingsElement =
        toggled && withSettings ? (
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
        ) : null;

    return (
        <div className={containerClassName}>
            {withLabel && (settingsElement !== null || toggleElement !== null) ? (
                <div className={classNames(['row', 'align-items-center', 'gx-1'])}>
                    {labelElement}
                    {settingsElement}
                    {toggleElement}
                </div>
            ) : withLabel ? (
                labelElement
            ) : null}
            {isClickable ? (
                <Button
                    className={classNames([
                        styles.arrow,
                        'd-block',
                        'w-100',
                        'px-2',
                        buttonClassName,
                        {
                            'bg-dark': buttonTheme === null,
                        },
                    ])}
                    theme={buttonTheme}
                    outline={buttonOutline}
                    onClick={onClickRow}
                >
                    <span className="row align-items-center">
                        <span
                            className={classNames([
                                'col',
                                'text-truncate',
                                styles.colValue,
                                { [styles.collapsed]: isCollapsible && isCollapsed },
                            ])}
                        >
                            {children}
                        </span>
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
}

export default FieldRow;
