function getScreenFieldsWithStates(definition) {
    const { fields: screenFields = [], states = null } = definition || {};
    if (states === null) {
        return screenFields;
    }
    return [
        ...states.reduce(
            (statesFields, { id, fields = [], repeatable = false, fieldName = null, label }) => [
                ...statesFields,
                ...(repeatable
                    ? [
                          {
                              type: 'items',
                              name: fieldName || id,
                              label,
                              itemsField: {
                                  label,
                                  type: 'fields',
                                  fields,
                              },
                          },
                      ]
                    : []),
                ...(!repeatable && fieldName !== null
                    ? [
                          {
                              type: 'fields',
                              name: fieldName,
                              fields,
                          },
                      ]
                    : []),
                ...(!repeatable && fieldName === null ? fields : []),
            ],
            [],
        ),
        ...screenFields,
    ];
}

export default getScreenFieldsWithStates;
