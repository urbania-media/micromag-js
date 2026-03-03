/* eslint-disable no-lone-blocks */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useEffect, useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { useForm } from '../../hooks';
import { validateFields } from '../../utils';

import { useFieldComponent } from '../../contexts';
import BackButton from '../buttons/Back';
import Button from '../buttons/Button';
import Buttons from '../buttons/Buttons';
import FieldForm from './Field';

import styles from '../../styles/forms/form.module.css';

interface FormProps {
    action: string;
    method?: string;
    fields?: FormField[];
    initialValue?: Record<string, unknown>;
    postForm?: (...args: unknown[]) => void;
    submitButtonLabel?: Label;
    submitButtonLoadingLabel?: Label;
    submitButtonTheme?: string;
    cancelButtonTheme?: string;
    buttons?: Button[];
    children?: React.ReactNode;
    actionsAlign?: 'left' | 'right';
    withoutActions?: boolean;
    withoutComplete?: boolean;
    withoutBackButton?: boolean;
    onComplete?: (...args: unknown[]) => void;
    onResponse?: (...args: unknown[]) => void;
    onMessage?: (...args: unknown[]) => void;
    onCancel?: (...args: unknown[]) => void;
    onCancelHref?: string;
    onOpenFieldForm?: (...args: unknown[]) => void;
    onCloseFieldForm?: (...args: unknown[]) => void;
    className?: string;
    fieldsClassName?: string;
    actionsClassName?: string;
    cancelClassName?: string;
}

const Form = ({
    action,
    method = 'POST',
    fields: initialFields = [],
    initialValue = null,
    postForm = null,
    submitButtonLabel = (<FormattedMessage defaultMessage="Submit" description="Submit form button" />),
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
}) => {
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
};

export default Form;
