import isObject from 'lodash-es/isObject';
import sortBy from 'lodash-es/sortBy';
import uniqWith from 'lodash-es/uniqWith';

import { extractAtPatterns, getFieldsPattern, getScreenFieldsWithStates } from '../utils';

import { ColorObject } from '../types';
import FieldsManager from './FieldsManager';
import ScreensManager from './ScreensManager';

const sortedColors = (colors) => sortBy(colors, ['color', 'alpha']);

const uniqueColors = (colors: ColorObject[]) =>
    uniqWith(
        colors,
        (colorA, colorB) => colorA.alpha === colorB.alpha && colorA.color === colorB.color,
    );

class ColorsParser {
    screensManager: ScreensManager;
    fieldsManager: FieldsManager;
    fieldsPatternCache: Record<string, RegExp[]>;

    constructor({ fieldsManager, screensManager, fieldsPattern = null }) {
        this.fieldsManager = fieldsManager;
        this.screensManager = screensManager;
        this.fieldsPatternCache = fieldsPattern || {};
    }

    getFieldsPatternByScreen(type) {
        if (typeof this.fieldsPatternCache[type] === 'undefined') {
            const fields = getScreenFieldsWithStates(this.screensManager.getDefinition(type) || {});
            this.fieldsPatternCache[type] = getFieldsPattern(
                fields || [],
                this.fieldsManager,
                (fieldDefinition, path) => {
                    return ColorsParser.fieldIsColor(fieldDefinition)
                        ? new RegExp(`^${path}$`)
                        : null;
                },
            );
        }
        return this.fieldsPatternCache[type];
    }

    extract(story): ColorObject[] | null {
        if (story === null) {
            return story;
        }
        const { theme = null, components = [] } = story || {};
        const { colors } = components.reduce(
            ({ colors: currentColors = null }, screen) => {
                const { type } = screen;
                const fieldsPattern = this.getFieldsPatternByScreen(type);
                const newColors = extractAtPatterns(
                    screen,
                    fieldsPattern,
                    (val) => isObject(val) && typeof val.color !== 'undefined',
                ).map((value) => {
                    if (value.color.length === 4) {
                        const innerColor = value.color
                            .split('')
                            .map((hex, i) => (i > 0 ? hex + hex : hex))
                            .join('')
                            .toUpperCase();
                        return {
                            alpha: value.alpha || 1,
                            color: innerColor,
                        };
                    }

                    return {
                        alpha: value.alpha,
                        color: value.color.toUpperCase(),
                    };
                });
                return {
                    colors: [...currentColors, ...newColors],
                };
            },
            { colors: [] },
        );

        if (theme !== null) {
            const themeColors = this.extract(theme);
            return colors !== null || themeColors !== null
                ? uniqueColors([...sortedColors(themeColors || []), ...sortedColors(colors || [])])
                : [];
        }

        return colors !== null ? sortedColors(uniqueColors(colors || [])) : [];
    }

    static fieldIsColor({ id = null }) {
        return id === 'color';
    }
}

export default ColorsParser;
