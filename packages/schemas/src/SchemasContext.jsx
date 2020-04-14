/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import SchemasRepository from './SchemasRepository';
import { SCREENS_NAMESPACE, ELEMENTS_NAMESPACE, FIELDS_NAMESPACE } from './namespaces';

const SchemasContext = React.createContext(null);

export const useSchemasRepository = () => {
    const repository = useContext(SchemasContext) || null;
    return repository;
};

export const useSchemas = namespace => {
    const repository = useSchemasRepository();
    const schemas = useMemo(() => (repository !== null ? repository.getSchemas(namespace) : null), [
        repository,
        namespace,
    ]);
    return schemas;
};

export const useSchema = id => {
    const repository = useSchemasRepository();
    const schema = useMemo(() => (repository !== null ? repository.getSchema(id) : null), [
        repository,
        id,
    ]);
    return schema;
};

export const useSchemaFields = (id, conditionalData = {}) => {
    const repository = useSchemasRepository();
    const fields = useMemo(
        () => (repository !== null ? repository.getFieldsFromSchema(id, conditionalData) : null),
        [repository, id, conditionalData],
    );
    return fields;
};

export const useScreenSchemaFields = (id, conditionalData = {}) =>
    useSchemaFields(`${SCREENS_NAMESPACE}/${id}`, conditionalData);

export const useElementSchemaFields = (id, conditionalData = {}) =>
    useSchemaFields(`${ELEMENTS_NAMESPACE}/${id}`, conditionalData);

export const useFieldSchemaFields = (id, conditionalData = {}) =>
    useSchemaFields(`${FIELDS_NAMESPACE}/${id}`, conditionalData);

const propTypes = {
    children: PropTypes.node.isRequired,
    schemas: PropTypes.arrayOf(PropTypes.object),
    repository: PropTypes.instanceOf(SchemasRepository),
};

const defaultProps = {
    schemas: [],
    repository: null,
};

export const SchemasProvider = ({ children, schemas, repository }) => {
    const finalSchemasRepository = useMemo(() => repository || new SchemasRepository(schemas), [
        repository,
        schemas,
    ]);
    return (
        <SchemasContext.Provider value={finalSchemasRepository}>{children}</SchemasContext.Provider>
    );
};

SchemasProvider.propTypes = propTypes;
SchemasProvider.defaultProps = defaultProps;

export default SchemasContext;
