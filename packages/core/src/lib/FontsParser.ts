import isObject from 'lodash-es/isObject';
import isString from 'lodash-es/isString';

import {
    extractAtPatterns,
    getFieldsPattern,
    getScreenFieldsWithStates,
    replaceAndExtractStoryEntities,
} from '../utils';

import { StoryParser } from '../types';
import FieldsManager from './FieldsManager';
import ScreensManager from './ScreensManager';

class FontsParser implements StoryParser {
    fieldsManager: FieldsManager;
    screensManager: ScreensManager;
    fieldsPatternCache: Record<string, RegExp[]>;

    constructor({ fieldsManager, screensManager, fieldsPattern = {} }) {
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
                    return FontsParser.fieldIsFontFamily(fieldDefinition)
                        ? new RegExp(`^${path}$`)
                        : null;
                },
            );
        }
        return this.fieldsPatternCache[type];
    }

    // Extract fonts
    parseToViewer(story) {
        if (story === null) {
            return story;
        }

        // Extract fonts from screen
        const { theme = null, components = [], fonts: storyFonts = null } = story || {};
        const fonts =
            storyFonts === null
                ? components.reduce((currentFonts, screen) => {
                      const { type } = screen;
                      const fieldsPattern = this.getFieldsPatternByScreen(type);
                      const newFonts = extractAtPatterns(
                          screen,
                          fieldsPattern,
                          (val) => isObject(val) && FontsParser.valueIsFont(val),
                      );
                      return newFonts.length > 0
                          ? {
                                ...currentFonts,
                                ...Object.keys(newFonts).reduce(
                                    (acc, key) => ({
                                        ...acc,
                                        [newFonts[key].name]: newFonts[key],
                                    }),
                                    {},
                                ),
                            }
                          : currentFonts;
                  }, {})
                : storyFonts;

        // Extract fonts from theme
        const { fonts: themeFonts = null, ...newTheme } =
            theme !== null ? this.parseToViewer(theme) : {};
        if (themeFonts !== null && Object.keys(themeFonts).length > 0) {
            return {
                ...story,
                theme: newTheme,
                fonts: { ...themeFonts, ...fonts },
            };
        }

        return Object.keys(fonts).length > 0 && fonts !== storyFonts
            ? {
                  ...story,
                  fonts,
              }
            : story;
    }

    parseFromEditor(story) {
        if (story === null) {
            return story;
        }

        const newStory = replaceAndExtractStoryEntities(
            story,
            'fonts',
            ({ type }) => this.getFieldsPatternByScreen(type),
            (val) => (isObject(val) ? val.name : val) as string,
        );
        return newStory;
    }

    static fieldIsFontFamily({ id = null }) {
        return id === 'font-family';
    }

    static valueIsFont({ type = null }) {
        return type === 'custom' || type === 'google';
    }
}

export default FontsParser;
