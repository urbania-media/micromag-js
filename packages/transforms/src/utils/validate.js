import isString from 'lodash/isString';
import isInteger from 'lodash/isInteger';
import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty';

const validate = (content = {}, definition = null) => {
    const validated = content
        ? Object.keys(content).reduce((values, name) => {
              const value = content[name] || null;
              // Find the reference
              if (definition && definition.properties) {
                  const property = definition.properties.find((prop) => prop.name === name) || null;
                  if (property !== null) {
                      let isValid = true;
                      switch (property.type) {
                          case 'string':
                              isValid = isString(value);
                              break;
                          case 'integer':
                              isValid = isInteger(value);
                              break;
                          case 'float':
                              isValid = isNumber(value);
                              break;
                          default:
                              isValid = value !== null;
                              break;
                      }
                      // Skip the whole thing it cause it aint gonna work
                      if (!isValid && property.required) {
                          console.log('VALIDATION ERROR: SKIPPED BECAUSE REQUIRED', content, name); // eslint-disable-line
                          return null;
                      }
                      if (values !== null && isValid) {
                          return {
                              ...values,
                              [name]: value,
                          };
                      }
                      console.log('VALIDATION ERROR: VALID TYPE', content, name); // eslint-disable-line
                  }
              }

              return values;
          }, {})
        : {};

    return !isEmpty(validated) ? validated : null;
};

export default validate;
