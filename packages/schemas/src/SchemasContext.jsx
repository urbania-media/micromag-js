/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import SchemasRepository from './SchemasRepository';

const SchemasContext = React.createContext(null);

export const useSchemas = (namespace) => {
    const schemas = useContext(SchemasContext) || null;
    return schemas !== null && namespace !== null ? schemas.getSchemas(namespace) : schemas;
};

export const useSchema = (id) => {
    const schemas = useSchemas();
    return schemas !== null ? schemas.getSchema(id) : null;
};

export const useSchemaFields = (id) => {
    const schemas = useSchemas();
    return schemas !== null ? schemas.getFieldsFromSchema(id) : null;
};

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
    const finalSchemasRepository = useMemo(
        () => repository || new SchemasRepository(schemas),
        [repository, schemas],
    );
    return (
        <SchemasContext.Provider value={finalSchemasRepository}>{children}</SchemasContext.Provider>
    );
};

SchemasProvider.propTypes = propTypes;
SchemasProvider.defaultProps = defaultProps;

export default SchemasContext;
