const getScreenExtraField = (intl) => ({
    name: 'parameters',
    type: 'parameters',
    label: intl.formatMessage({
        defaultMessage: 'Parameters',
        description: 'field label',
    }),
});

export default getScreenExtraField;
