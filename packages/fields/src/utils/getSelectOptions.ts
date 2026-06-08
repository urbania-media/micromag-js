import isObject from 'lodash-es/isObject';

const getSelectOptions = (options) =>
    options.map((it) =>
        isObject(it)
            ? it
            : {
                  value: it,
                  label: it,
              },
    );

export default getSelectOptions;
