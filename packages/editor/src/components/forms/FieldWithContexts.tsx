/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import { FieldForm } from '@micromag/core/components';
import { useFormsComponents, useScreenDefinition } from '@micromag/core/contexts';
import { getScreenFieldsWithStates } from '@micromag/core/utils';
import { Fields } from '@micromag/fields';

interface FieldWithContextsProps {
    name?: string;
    form?: string;
    children?: React.ReactNode;
}

function FieldWithContexts({ name = null, form = null, ...props }) {
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

    if (currentState !== null) {
        finalNameParts =
            (repeatable || fieldName !== null) && nameParts.length <= (repeatable ? 2 : 1)
                ? [fieldName || stateId, ...nameParts.slice(1)]
                : nameParts.slice(1);
    }

    const formComponents = useFormsComponents();
    return definition !== null ? (
        <div
            className={classNames({
                'p-2': form === null,
            })}
        >
            {finalNameParts.length > 0 ? (
                <FieldForm
                    fields={finalScreenFields}
                    formComponents={formComponents}
                    name={finalNameParts.join('.')}
                    form={form}
                    {...props}
                />
            ) : (
                <Fields fields={stateFields} {...props} />
            )}
        </div>
    ) : null;
}

export default FieldWithContexts;
