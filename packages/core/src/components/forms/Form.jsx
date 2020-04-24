/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';

import * as MicromagPropTypes from '../../PropTypes';
import useForm from '../../hooks/useForm';
import { useFieldComponent } from '../../contexts/ComponentsContext';
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
    postForm: PropTypes.func,
    submitButtonLabel: MicromagPropTypes.label,
    buttons: MicromagPropTypes.buttons,
    children: PropTypes.node,
    actionsAlign: PropTypes.oneOf(['left', 'right']),
    withoutActions: PropTypes.bool,
    onComplete: PropTypes.func,
    className: PropTypes.string,
    fieldsClassName: PropTypes.string,
    actionsClassName: PropTypes.string,
};

const defaultProps = {
    method: 'POST',
    fields: [],
    postForm: null,
    submitButtonLabel: messages.submit,
    buttons: null,
    children: null,
    actionsAlign: 'left',
    withoutActions: false,
    onComplete: null,
    className: null,
    fieldsClassName: null,
    actionsClassName: null,
};

const Form = ({
    action,
    method,
    fields: initialFields,
    postForm,
    submitButtonLabel,
    buttons,
    children,
    actionsAlign,
    withoutActions,
    onComplete,
    className,
    fieldsClassName,
    actionsClassName,
}) => {
    const { onSubmit, fields } = useForm({
        action,
        fields: initialFields,
        postForm,
        onComplete,
    });
    const FieldsComponent = useFieldComponent('fields');

    if (process.env.NODE_ENV === 'development') {
        if (FieldsComponent === null) {
            console.warn('Fields components is empty in Form');
        }
    }

    return (
        <form
            action={action}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            method={method}
            onSubmit={onSubmit}
        >
            {FieldsComponent !== null && fields !== null && fields.length > 0 ? (
                <FieldsComponent
                    fields={fields}
                    className={classNames([
                        styles.fields,
                        {
                            [fieldsClassName]: fieldsClassName !== null,
                        },
                    ])}
                />
            ) : null}
            {children}
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
                        <Button type="submit" theme="primary">
                            {submitButtonLabel}
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
