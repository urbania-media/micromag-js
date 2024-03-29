import isObject from 'lodash/isObject';

const getFontFamily = (value) => {
    if (value == null) {
        return null;
    }
    const { name, fallback = null } = isObject(value)
        ? value
        : {
              name: value,
          };
    return [name, fallback]
        .filter((it) => it !== null)
        .map((it) => `"${it}"`)
        .join(', ');
};

export default getFontFamily;
