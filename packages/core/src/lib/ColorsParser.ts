import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import uniqWith from 'lodash/uniqWith';
import sortBy from 'lodash/sortBy';

const sortedColors = (colors) => sortBy(colors, ['color', 'alpha']);

const uniqueColors = (colors) =>
    uniqWith(
        colors,
        (colorA, colorB) => colorA.alpha === colorB.alpha && colorA.color === colorB.color,
    );

class ColorsParser {
    constructor({ fieldsManager, screensManager }) {
        this.fieldsManager = fieldsManager;
        this.screensManager = screensManager;
    }

    // Convert medias object to path
    parse(story) {
        if (story === null) {
            return story;
        }
        const { theme = null, components = [] } = story || {};
        const { colors } = components.reduce(
            ({ colors: currentColors = null }, screen) => {
                const { type } = screen;
                const { fields = [] } = this.screensManager.getDefinition(type) || {};
                const fieldsPattern = this.getColorFieldPatterns(fields);
                const { colors: newColors } = ColorsParser.getColorsFromPath(screen, fieldsPattern);
                return {
                    colors: [...currentColors, ...newColors],
                };
            },
            { colors: [] },
        );

        if (theme !== null) {
            const themeColors = this.parse(theme);
            return colors !== null || themeColors !== null
                ? uniqueColors([...sortedColors(themeColors || []), ...sortedColors(colors || [])])
                : [];
        }

        return colors !== null ? sortedColors(uniqueColors(colors || [])) : [];
    }

    getColorFieldPatterns(fields, namePrefix = null) {
        return fields.reduce((patterns, field) => {
            const { name = null, type = null } = field;
            const path = [namePrefix, name].filter((it) => it !== null).join('\\.');
            const fieldDefinition = {
                ...(type !== null ? this.fieldsManager.getDefinition(type) : null),
                ...field,
            };
            // also check settings fields
            const { fields: subFields = [], itemsField = null, settings = [] } = fieldDefinition;

            return [
                ...patterns,
                ...(ColorsParser.fieldIsColor(fieldDefinition) ? [new RegExp(`^${path}$`)] : []),
                ...this.getColorFieldPatterns(subFields, path),
                ...this.getColorFieldPatterns(settings, path),
                ...(itemsField !== null
                    ? this.getColorFieldPatterns([itemsField], `${path}\\.[0-9]+`)
                    : []),
            ];
        }, []);
    }

    static fieldIsColor({ id = null }) {
        return id === 'color';
    }

    static getColorsFromPath(data, patterns, colors = null, keyPrefix = null) {
        const dataIsArray = isArray(data);
        const keys = dataIsArray ? [...data.keys()] : Object.keys(data);
        return keys.reduce(
            ({ data: currentData, colors: currentColors = null }, key) => {
                const path = [keyPrefix, key].filter((it) => it !== null).join('.');
                const patternMatch = patterns.reduce(
                    (found, pattern) => found || pattern.test(path),
                    false,
                );
                const value = data[key];
                let color = null;
                let newValue = null;
                let subColors = null;
                if (patternMatch && isObject(value)) {
                    if (value.color && value.color.length === 4) {
                        const innerColor = value.color
                            .split('')
                            .map((hex, i) => (i > 0 ? hex + hex : hex))
                            .join('')
                            .toUpperCase();
                        color = {
                            alpha: value.alpha || 1,
                            color: innerColor,
                        };
                    } else if (value.color) {
                        color = {
                            alpha: value.alpha,
                            color: value.color.toUpperCase(),
                        };
                    }
                } else if (isObject(value) || isArray(value)) {
                    const subReturn = ColorsParser.getColorsFromPath(value, patterns, colors, path);
                    newValue = subReturn.data;
                    subColors = subReturn.colors;
                } else {
                    newValue = value;
                }

                return {
                    data: dataIsArray
                        ? [...(currentData || []), newValue]
                        : {
                              ...currentData,
                              [key]: newValue,
                          },
                    colors:
                        color !== null
                            ? [...(currentColors || []), ...(subColors || []), color]
                            : [...(currentColors || []), ...(subColors || [])],
                };
            },
            {
                data: keys.length === 0 ? data : null,
                colors,
            },
        );
    }
}

export default ColorsParser;
