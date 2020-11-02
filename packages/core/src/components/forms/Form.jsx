/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import * as MicromagPropTypes from '../../PropTypes';
import { useForm } from '../../hooks';
import { useFieldComponent } from '../../contexts';
import Button from '../buttons/Button';
import Buttons from '../buttons/Buttons';

import styles from '../../styles/forms/form.module.scss';

const messages = defineMessages({
    submit: {
        id: 'forms.submit',
        defaultMessage: 'Submit',
    },
});

const propTypes = {
    action: PropTypes.string.isRequired,
    method: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    initialValue: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    postForm: PropTypes.func,
    submitButtonLabel: MicromagPropTypes.label,
    submitButtonLoadingLabel: MicromagPropTypes.label,
    buttons: MicromagPropTypes.buttons,
    children: PropTypes.node,
    actionsAlign: PropTypes.oneOf(['left', 'right']),
    withoutActions: PropTypes.bool,
    onComplete: PropTypes.func,
    onResponse: PropTypes.func,
    onMessage: PropTypes.func,
    className: PropTypes.string,
    fieldsClassName: PropTypes.string,
    actionsClassName: PropTypes.string,
};

const defaultProps = {
    method: 'POST',
    fields: [],
    initialValue: null,
    postForm: null,
    submitButtonLabel: messages.submit,
    submitButtonLoadingLabel: null,
    buttons: null,
    children: null,
    actionsAlign: 'left',
    withoutActions: false,
    onComplete: null,
    onResponse: null,
    onMessage: null,
    className: null,
    fieldsClassName: null,
    actionsClassName: null,
};

const Form = ({
    action,
    method,
    fields: initialFields,
    initialValue,
    postForm,
    submitButtonLabel,
    submitButtonLoadingLabel,
    buttons,
    children,
    actionsAlign,
    withoutActions,
    onComplete,
    onResponse,
    onMessage,
    className,
    fieldsClassName,
    actionsClassName,
}) => {
    const { onSubmit, fields, status, value, setValue, errors, response, generalError } = useForm({
        value: initialValue,
        action,
        fields: initialFields,
        postForm,
        onComplete: onComplete !== null ? onComplete : () => {},
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
            {FieldsComponent !== null && fields !== null && fields.length > 0 ? (
                <FieldsComponent
                    fields={fields}
                    value={value}
                    errors={errors}
                    onChange={setValue}
                    className={classNames([
                        styles.fields,
                        {
                            [fieldsClassName]: fieldsClassName !== null,
                        },
                    ])}
                />
            ) : null}
            {children}
            {generalError ? <p>{generalError}</p> : null}
            {!withoutActions ? (
                <div
                    className={classNames([
                        styles.actions,
                        {
                            [styles[actionsAlign]]: actionsAlign,
                            [actionsClassName]: actionsClassName !== null,
                        },
                    ])}
                >
                    {buttons !== null ? (
                        <Buttons buttons={buttons} className={styles.buttons} />
                    ) : (
                        <Button type="submit" theme="primary" disabled={status === 'loading'}>
                            {status === 'loading'
                                ? submitButtonLoadingLabel || submitButtonLabel
                                : submitButtonLabel}
                        </Button>
                    )}
                </div>
            ) : null}
        </form>
    );
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
