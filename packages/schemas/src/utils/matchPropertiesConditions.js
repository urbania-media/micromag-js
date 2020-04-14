import matchPropertyConditions from './matchPropertyConditions';

const matchPropertiesConditions = (condition, data) => {
    const { properties = {} } = condition;
    return Object.keys(properties).reduce((allMatch, key) => {
        const property = properties[key];
        const { properties: conditionProperties = null } = property;
        const propertyValue = data !== null ? data[key] || null : null;
        return (
            allMatch &&
            matchPropertyConditions(property, propertyValue) &&
            (conditionProperties === null ||
                this.matchPropertiesConditions(properties[key], propertyValue))
        );
    }, true);
};

export default matchPropertiesConditions;
