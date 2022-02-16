/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { FieldForm } from '@micromag/core/components';
import { useScreenDefinition, useFormsComponents } from '@micromag/core/contexts';
import { Fields } from '@micromag/fields';

const propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    name: null,
    children: null,
};

const FieldWithContexts = ({ name, ...props }) => {
    // Get definitions
    const { fields = [], states = null } = useScreenDefinition();
    const [stateId = null] = name.split('.');
    const currentState = states !== null ? states.find(({ id }) => id === stateId) || null : null;
    const {
        repeatable = false,
        fieldName: stateFieldName = null,
        fields: stateFields = null,
    } = currentState || {};
    const formComponents = useFormsComponents();
    if (currentState !== null && !repeatable && stateFieldName === null) {
        return (
            <div className="p-2">
                <Fields fields={stateFields} {...props} />
            </div>
        );
    }
    const finalFields =
        repeatable || stateFieldName !== null
            ? [{
                  name: stateFieldName || stateId,
                  itemsField: {
                      type: 'fields',
                      fields: stateFields,
                      className: 'p-2'
                  },
              }]
            : fields;
    return (
        <FieldForm fields={finalFields} formComponents={formComponents} name={name} {...props} />
    );
};

FieldWithContexts.propTypes = propTypes;
FieldWithContexts.defaultProps = defaultProps;

export default FieldWithContexts;
