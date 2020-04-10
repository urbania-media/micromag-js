const matchPropertyConditions = (
    { const: constCondition = null, pattern = null, enum: enumCondition = null },
    value,
) => (
    (constCondition === null || constCondition === value) &&
    (pattern === null || new RegExp(pattern).test(value || '')) &&
    (enumCondition === null || enumCondition.indexOf(value) !== -1)
);

export default matchPropertyConditions;
