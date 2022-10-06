function getScreenFieldsWithStates(definition) {
    const { fields: screenFields = null, states = null } = definition || {};
    if (states === null) {
        return screenFields;
    }
    // console.log({ screenFields, states });

    const extraFields = states.reduce(
        (
            statesFields,
            current
        ) => {
            const { id, fields = [], repeatable = false, fieldName = null, label, defaultValue = null } = current || {};

            return [
                ...statesFields,
                ...(repeatable
                    ? [
                          {
                              type: 'items',
                              name: fieldName || id,
                              label,
                              defaultValue,
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
            ];
        },
        [],
    );

    console.log({extraFields, screenFields});

    return [...extraFields, ...screenFields];
}

export default getScreenFieldsWithStates;
