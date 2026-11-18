/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import { FieldForm } from '@micromag/core/components';
import { useFormsComponents, useScreenDefinition } from '@micromag/core/contexts';
import { getScreenFieldsWithStates } from '@micromag/core/utils';
import { Fields } from '@micromag/fields';

import styles from '../../styles/forms/state.module.css';

interface FieldWithContextsProps {
    name?: string;
    form?: string;
    className?: string | null;
    children?: React.ReactNode;
}

function FieldWithContexts({
    name = null,
    form = null,
    className = null,
    ...props
}: FieldWithContextsProps) {
    const definition = useScreenDefinition() || null;
    const { states = null } = definition;
    const screenFields = getScreenFieldsWithStates(definition);
    const nameParts = name.split('.');
    const [stateId = null] = nameParts;
    const currentState = states !== null ? states.find(({ id }) => id === stateId) || null : null;
    let finalNameParts = nameParts;
    const { repeatable = false, fieldName = null, fields: stateFields = [] } = currentState || {};
    const finalScreenFields =
        fieldName !== null && stateId !== null
            ? screenFields.filter(
                  ({ name: itemName, stateId: fieldStateId }) =>
                      fieldName !== itemName || stateId === fieldStateId || fieldStateId === null,
              )
            : screenFields;

    // The form of the state itself (ex.: the intro, or a question of a quiz), not of one of
    // its fields: it gets the padding of the screen form
    const isStateForm = currentState !== null && nameParts.length <= (repeatable ? 2 : 1);
    if (currentState !== null) {
        finalNameParts =
            (repeatable || fieldName !== null) && isStateForm
                ? [fieldName || stateId, ...nameParts.slice(1)]
                : nameParts.slice(1);
    }
    const finalClassName = isStateForm ? classNames([styles.container, className]) : className;

    const formComponents = useFormsComponents();
    return definition !== null ? (
        finalNameParts.length > 0 ? (
            <FieldForm
                fields={finalScreenFields}
                formComponents={formComponents}
                name={finalNameParts.join('.')}
                form={form}
                className={finalClassName}
                {...props}
            />
        ) : (
            <Fields fields={stateFields} className={finalClassName} {...props} />
        )
    ) : null;
}

export default FieldWithContexts;
