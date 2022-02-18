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
                              stateId: id,
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
                              stateId: id,
                              fields,
                          },
                      ]
                    : []),
                ...(!repeatable && fieldName === null
                    ? fields.map((it) => ({
                          ...it,
                          stateId: id,
                      }))
                    : []),
            ],
            [],
        ),
        ...screenFields,
    ];
}

export default getScreenFieldsWithStates;
