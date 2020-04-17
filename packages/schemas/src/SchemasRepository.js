import isObject from 'lodash/isObject';

import matchPropertiesConditions from './utils/matchPropertiesConditions';

class SchemasRepository {
    constructor(schemas = [], opts = {}) {
        this.options = {
            baseId: 'https://schemas.micromag.ca/0.1/',
            ...opts,
        };
        this.schemas = schemas || [];
    }

    addSchemas(schemas) {
        schemas.forEach(schema => this.addSchema(schema));
        return this;
    }

    addSchema(schema) {
        const { $id: schemaId } = schema;
        if (this.schemas.findIndex(it => it.$id === schemaId) === -1) {
            this.schemas = [...this.schemas, schema];
        }
        return this;
    }

    getSchemaId(id, namespace = null) {
        const { baseId } = this.options;
        const [finalId, finalNamespace = null] = Array.isArray(id) ? id : [id, namespace];
        const baseIdMatch = new RegExp(`^${baseId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
        return !baseIdMatch.test(id)
            ? `${baseId.replace(/\/$/, '')}/${
                  finalNamespace !== null ? `${finalNamespace}/` : ''
              }${finalId}.json`
            : id;
    }

    getSchema(id, namespace = null) {
        if (isObject(id) && !Array.isArray(id)) {
            return id;
        }
        const schemaId = this.getSchemaId(id, namespace);
        return this.schemas.find(it => it.$id === schemaId) || null;
    }

    getSchemas(namespace = null) {
        if (namespace === null) {
            return this.schemas;
        }
        const { baseId } = this.options;
        const url = `${baseId.replace(/\/$/, '')}/${namespace}`;
        const pattern = new RegExp(`^${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
        return this.schemas.filter(({ $id: id }) => pattern.test(id));
    }

    getPropertiesFromSchema(schemaId, conditionalData) {
        const schema = this.getSchema(schemaId);
        if (schema === null) {
            return null;
        }
        const { properties = null, $ref = null, allOf = null, if: ifConditions = null } = schema;
        return [
            // Properties from $ref
            $ref !== null ? this.getPropertiesFromRef($ref, conditionalData) : null,
            // Properties from allOf
            allOf !== null ? this.getPropertiesFromAllOf(allOf, conditionalData) : null,
            // Normal properties
            properties !== null
                ? Object.keys(properties).reduce(
                      (map, key) => ({
                          ...map,
                          [key]: this.getProperty(
                              properties[key],
                              conditionalData !== null ? conditionalData[key] || null : null,
                          ),
                      }),
                      {},
                  )
                : null,
            // Conditional properties
            ifConditions !== null
                ? this.getPropertiesFromSchemaCondition(schema, conditionalData)
                : null,
        ].reduce(
            (allProperties, propertiesSet) => ({
                ...(propertiesSet !== null
                    ? Object.keys(propertiesSet).reduce(
                          (allSubProperties, propertyKey) => ({
                              ...allSubProperties,
                              [propertyKey]: {
                                  ...(allSubProperties[propertyKey] || null),
                                  ...propertiesSet[propertyKey],
                              },
                          }),
                          allProperties,
                      )
                    : allProperties),
            }),
            {},
        );
    }

    getFieldsFromSchema(schemaId, conditionalData) {
        const schema = this.getSchema(schemaId);
        if (schema === null) {
            return null;
        }
        const properties = this.getPropertiesFromSchema(schema, conditionalData);
        return [...this.getFieldsFromProperties(properties)];
    }

    getDefaultValuesFromSchema(schemaId, conditionalData) {
        const schema = this.getSchema(schemaId);
        if (schema === null) {
            return null;
        }
        const properties = this.getPropertiesFromSchema(schema, conditionalData);
        return { ...this.getDefaultValuesFromProperties(properties) };
    }

    getDefaultValuesFromProperties(properties) {
        return Object.keys(properties).reduce((values, propertyName) => {
            const {
                type = 'object',
                default: defaultValue = null,
                properties: subProperties = null,
            } = properties[propertyName];
            if (type === 'object' && subProperties !== null) {
                const objectDefaultValue = this.getDefaultValuesFromProperties(subProperties);
                return objectDefaultValue !== null
                    ? {
                          ...values,
                          [propertyName]: objectDefaultValue,
                      }
                    : values;
            }
            return defaultValue !== null
                ? {
                      ...values,
                      [propertyName]: defaultValue,
                  }
                : values;
        }, null);
    }

    getFieldsFromProperties(properties) {
        return Object.keys(properties).reduce((fields, name) => {
            const property = properties[name];
            const field = this.getFieldFromProperty(property, name);
            return [...fields, field];
        }, []);
    }

    getProperty(property, conditionalData) {
        const {
            type = null,
            properties: subProperties = null,
            $ref: subRef = null,
            allOf: subAllOf = null,
            ...other
        } = property;
        const subSchema = subRef !== null ? this.getSchema(subRef) : null;
        const {
            $id,
            type: subType,
            allOf,
            properties,
            ...subOther
        } = subSchema || {};
        const hasProperties =
            type === 'object' || subProperties !== null || subRef !== null || subAllOf !== null;
        return hasProperties
            ? {
                  type: this.getTypeFromProperty(property),
                  properties: this.getPropertiesFromSchema(property, conditionalData),
                  ...subOther,
                  ...other,
              }
            : property;
    }

    getTypeFromProperty({ type = null, properties = null, $ref = null, allOf = null }) {
        return (
            type ||
            (properties !== null ? 'object' : null) ||
            ($ref !== null ? (this.getSchema($ref) || {}).type || null : null) ||
            (allOf !== null
                ? allOf.reduce((currentType, it) => {
                      const nextType = this.getTypeFromProperty(it);
                      return nextType || currentType;
                  }, null)
                : null) ||
            null
        );
    }

    getFieldFromProperty(property, name) {
        const {
            type,
            component = null,
            componentProps = null,
            title: label = null,
            enum: enums,
            setting = false,
            advanced = false,
            properties,
        } = property;
        const field = {
            name,
            component: component || (type === 'object' ? 'fields' : type),
            label,
            setting,
            advanced,
            enums,
            ...componentProps,
        };
        return type === 'object'
            ? {
                  ...field,
                  fields: this.getFieldsFromProperties(properties),
              }
            : field;
    }

    getPropertiesFromSchemaCondition(schema, conditionalData = null) {
        const {
            if: ifConditions = null,
            then: thenSchema = null,
            else: elseSchema = null,
        } = schema;
        return matchPropertiesConditions(ifConditions, conditionalData)
            ? this.getPropertiesFromSchema(thenSchema)
            : this.getPropertiesFromSchema(elseSchema);
    }

    getPropertiesFromRef(ref, conditionalData = null) {
        const schema = this.getSchema(ref);
        return schema !== null ? this.getPropertiesFromSchema(schema, conditionalData) : null;
    }

    getPropertiesFromAllOf(allOf, conditionalData = null) {
        return allOf.reduce(
            (allProperties, item) => ({
                ...allProperties,
                ...this.getPropertiesFromSchema(item, conditionalData),
            }),
            {},
        );
    }
}

export default SchemasRepository;
