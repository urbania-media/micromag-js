/* eslint-disable no-lone-blocks */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useForm } from '../../hooks';
import { validateFields } from '../../utils';

import { useFieldComponent, useFieldContext } from '../../contexts';
import BackButton from '../buttons/Back';
import Button from '../buttons/Button';
import Buttons from '../buttons/Buttons';
import FieldForm from './Field';

import styles from '../../styles/forms/form.module.css';

const emptyArray: never[] = [];

interface FormProps {
    action: string;
    method?: string;
    fields?: FormField[];
    initialValue?: Record<string, unknown> | null;
    postForm?: ((...args: unknown[]) => void) | null;
    submitButtonLabel?: Label;
    submitButtonLoadingLabel?: Label | null;
    submitButtonTheme?: string | null;
    cancelButtonTheme?: string | null;
    buttons?: Button[] | null;
    children?: React.ReactNode | null;
    actionsAlign?: 'left' | 'right';
    withoutActions?: boolean;
    withoutComplete?: boolean;
    withoutBackButton?: boolean;
    onComplete?: ((...args: unknown[]) => void) | null;
    onResponse?: ((...args: unknown[]) => void) | null;
    onMessage?: ((...args: unknown[]) => void) | null;
    onCancel?: ((...args: unknown[]) => void) | null;
    onCancelHref?: string | null;
    onOpenFieldForm?: ((...args: unknown[]) => void) | null;
    onCloseFieldForm?: ((...args: unknown[]) => void) | null;
    className?: string | null;
    fieldsClassName?: string | null;
    actionsClassName?: string | null;
    cancelClassName?: string | null;
}

function Form({
    action,
    method = 'POST',
    fields: initialFields = emptyArray,
    initialValue = null,
    postForm = null,

    submitButtonLabel = (
        <FormattedMessage defaultMessage="Submit" description="Submit form button" />
    ),

    submitButtonLoadingLabel = null,
    submitButtonTheme = null,
    cancelButtonTheme = null,
    buttons = null,
    children = null,
    actionsAlign = 'left',
    withoutActions = false,
    withoutComplete = false,
    withoutBackButton = false,
    onComplete = null,
    onResponse = null,
    onMessage = null,
    onCancel = null,
    onCancelHref = null,
    onOpenFieldForm = null,
    onCloseFieldForm = null,
    className = null,
    fieldsClassName = null,
    actionsClassName = null,
    cancelClassName = null,
}: FormProps) {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        let id = null;
        if (complete) {
            id = setTimeout(() => {
                setComplete(false);
            }, 3000);
        }
        return () => {
            clearTimeout(id);
        };
    }, [complete]);

    const onCompleteForm = useCallback(
        (data) => {
            if (onComplete !== null) {
                onComplete(data);
            }
            if (!withoutComplete) {
                setComplete(true);
            }
        },
        [onComplete, setComplete],
    );

    const { onSubmit, fields, status, value, setValue, errors, response, generalError } = useForm({
        value: initialValue,
        action,
        fields: initialFields,
        postForm,
        onComplete: onCompleteForm,
    });
    const FieldsComponent = useFieldComponent('fields');

    if (process.env.NODE_ENV === 'development') {
        if (FieldsComponent === null) {
            console.warn('Fields components is empty in Form');
        }
    }

    useEffect(() => {
        if (onResponse !== null) {
            onResponse(response);
            if (onMessage !== null && response && response.message) {
                onMessage(response.message);
            }
        }
    }, [response, onResponse, onMessage]);

    const canSave = validateFields(fields, value);

    const fieldContext = useFieldContext();

    const [fieldPaths, setFieldPaths] = useState([]);

    const gotoFieldForm = useCallback(
        (field, formName = null) => {
            const fieldKey = `${field}${formName !== null ? `:${formName}` : ''}`;
            setFieldPaths([...fieldPaths, fieldKey]);
            if (onOpenFieldForm !== null) {
                onOpenFieldForm();
            }
        },
        [fieldPaths, setFieldPaths],
    );

    const closeFieldForm = useCallback(() => {
        const newFields = [...fieldPaths];
        newFields.pop();
        setFieldPaths([...newFields]);
        if (onCloseFieldForm !== null) {
            onCloseFieldForm();
        }
    }, [fieldPaths, setFieldPaths]);

    // The last path
    const fieldParams = fieldPaths.length > 0 ? fieldPaths[fieldPaths.length - 1] : null;
    const fieldName = fieldParams !== null ? fieldParams.replace(/\//g, '.') : null;

    // Get transition value
    // const { name: transitionName, timeout: transitionTimeout } = useFormTransition(
    //     fieldPaths,
    //     styles,
    // );

    return (
        <form
            action={action}
            className={classNames([
                styles.container,
                {
                    // 'was-validated': status !== null,
                    [className]: className !== null,
                },
            ])}
            method={method}
            onSubmit={onSubmit}
        >
            {!withoutBackButton && fields !== null && fields.length > 0 && fieldParams !== null ? (
                <div className="mb-2">
                    <BackButton theme="secondary" outline onClick={closeFieldForm} />
                </div>
            ) : null}
            {fields !== null && fields.length > 0 && fieldParams !== null ? (
                <div className={classNames(['w-100', styles.panel])} key="field">
                    <FieldForm
                        name={fieldName}
                        fields={fields}
                        value={value}
                        onChange={setValue}
                        gotoFieldForm={gotoFieldForm}
                        closeFieldForm={closeFieldForm}
                        fieldContext={fieldContext}
                    />
                </div>
            ) : null}
            {FieldsComponent && fields !== null && fields.length > 0 && fieldParams === null ? (
                <FieldsComponent
                    fields={fields}
                    value={value}
                    errors={errors}
                    onChange={setValue}
                    gotoFieldForm={gotoFieldForm}
                    closeFieldForm={closeFieldForm}
                    className={classNames([
                        styles.fields,
                        {
                            [fieldsClassName]: fieldsClassName !== null,
                        },
                    ])}
                />
            ) : null}
            {generalError ? <p className="text-danger my-1">{generalError}</p> : null}
            {children}
            {!withoutActions && fieldParams === null ? (
                <div
                    className={classNames([
                        styles.actions,
                        {
                            [styles[actionsAlign]]: actionsAlign,
                            [actionsClassName]: actionsClassName !== null,
                        },
                    ])}
                >
                    {onCancel !== null || onCancelHref !== null ? (
                        <Button
                            type="button"
                            onClick={onCancel}
                            href={onCancelHref}
                            theme={cancelButtonTheme || 'secondary'}
                            outline
                            disabled={status === 'loading'}
                            className={classNames([
                                'me-2',
                                {
                                    [cancelClassName]: cancelClassName !== null,
                                },
                            ])}
                        >
                            <FormattedMessage defaultMessage="Cancel" description="Button label" />
                        </Button>
                    ) : null}
                    {buttons !== null ? (
                        <Buttons buttons={buttons} className={styles.buttons} />
                    ) : (
                        <Button
                            type="submit"
                            theme={submitButtonTheme || 'primary'}
                            disabled={status === 'loading' || !canSave}
                        >
                            {status === 'loading'
                                ? submitButtonLoadingLabel || submitButtonLabel
                                : submitButtonLabel}
                        </Button>
                    )}
                    {complete ? (
                        <p className="text-success mx-2 my-1">
                            <FormattedMessage
                                defaultMessage="Success"
                                description="Success form message"
                            />
                        </p>
                    ) : null}
                </div>
            ) : null}
        </form>
    );
}

export default Form;
