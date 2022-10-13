/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { FieldForm } from '@micromag/core/components';
import { useScreenDefinition, useFormsComponents } from '@micromag/core/contexts';
import { Fields } from '@micromag/fields';

import getScreenFieldsWithStates from '../../utils/getScreenFieldsWithStates';

const propTypes = {
    name: PropTypes.string,
    form: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    name: null,
    form: null,
    children: null,
};

const FieldWithContexts = ({ name, form, ...props }) => {
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
};

FieldWithContexts.propTypes = propTypes;
FieldWithContexts.defaultProps = defaultProps;

export default FieldWithContexts;
