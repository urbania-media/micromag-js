/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as MicromagPropTypes from '../PropTypes';
import { ComponentsProvider, FIELDS_NAMESPACE } from './ComponentsContext';
import FieldsManager from '../lib/FieldsManager';

export const FieldsContext = React.createContext(new FieldsManager());

export const useFieldsManager = () => useContext(FieldsContext);

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
    const previousManager = useFieldsManager();
    const finalManager = useMemo(() => {
        const newManager = manager !== null ? manager : new FieldsManager(fields);
        if ((previousManager || null) !== null) {
            return previousManager.merge(newManager);
        }
        return newManager;
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
