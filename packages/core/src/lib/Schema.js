import createSchemaId from '../utils/createSchemaId';
import isMessage from '../utils/isMessage';

class Schema {
    constructor(id) {
        this.id = id;
        this.title = null;
        this.properties = null;
        this.extends = [];
        this.data = null;
    }

    title(title) {
        this.title = title;
        return this;
    }

    extend(id) {
        this.extends.push(id);
        return this;
    }

    property(name, property) {
        this.properties = {
            ...this.properties,
            [name]: property,
        };
        return this;
    }

    merge(data) {
        this.data = {
            ...this.data,
            ...data,
        };
        return this;
    }

    getSchema() {
        let schema = {
            $id: createSchemaId(this.id),
            ...this.data,
        };

        schema = ['title', 'description'].reduce((newSchema, key) => {
            const text = this[key] || null;
            if (text === null) {
                return newSchema;
            }
            const textIsMessage = isMessage(text);
            return {
                ...newSchema,
                [key]: textIsMessage ? text.defaultMessage : text,
                ...(textIsMessage
                    ? {
                          intl: {
                              ...newSchema.intl,
                              [key]: text,
                          },
                      }
                    : null),
            };
        }, schema);

        const currentSchema = {};
        if (this.properties !== null) {
            currentSchema.properties = this.properties.map((it) => it);
        }

        if (this.extends.length > 0) {
            schema.allOf = [
                ...this.extends.map((id) => ({
                    $ref: createSchemaId(id),
                })),
                currentSchema,
            ];
        } else {
            schema = {
                ...schema,
                ...currentSchema,
            };
        }

        return schema;
    }
}

export default Schema;
