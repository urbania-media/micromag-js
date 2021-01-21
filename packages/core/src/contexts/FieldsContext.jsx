/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as MicromagPropTypes from '../PropTypes';
import { ComponentsProvider, FIELDS_NAMESPACE } from './ComponentsContext';
import { FieldsManager } from '../lib';

export const FieldsContext = React.createContext(null);

export const useFieldsManager = () => useContext(FieldsContext);

export const useFieldDefinition = (id) => {
    const manager = useFieldsManager();
    return manager.getDefinition(id);
};

const propTypes = {
    fields: MicromagPropTypes.fieldDefinitions,
    manager: PropTypes.instanceOf(FieldsManager),
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    fields: null,
    manager: null,
};

export const FieldsProvider = ({ fields, manager, children }) => {
    const previousManager = useFieldsManager() || null;
    const finalManager = useMemo(() => {
        if (previousManager !== null) {
            return previousManager;
        }
        return manager !== null ? manager : new FieldsManager(fields);
    }, [manager, fields, previousManager]);
    const initialComponents = useMemo(() => finalManager.getComponents(), [finalManager]);
    const [components, setComponents] = useState(initialComponents);
    useEffect(() => {
        const onChange = () => setComponents(finalManager.getComponents());
        finalManager.on('change', onChange);
        return () => {
            finalManager.off('change', onChange);
        };
    }, [finalManager, setComponents]);
    useEffect(() => {
        if (previousManager !== null) {
            previousManager.addDefinitions(manager !== null ? manager.getDefinitions() : fields);
            setComponents(previousManager.getComponents());
        }
    }, [previousManager, manager, fields]);

    return (
        <FieldsContext.Provider value={finalManager}>
            <ComponentsProvider namespace={FIELDS_NAMESPACE} components={components}>
                {children}
            </ComponentsProvider>
        </FieldsContext.Provider>
    );
};

FieldsProvider.propTypes = propTypes;
FieldsProvider.defaultProps = defaultProps;

export default FieldsContext;
