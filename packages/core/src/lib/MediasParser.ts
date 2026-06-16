import isObject from 'lodash-es/isObject';
import isString from 'lodash-es/isString';

import {
    getFieldsPattern,
    getPatternsFromMatchingValue,
    getScreenFieldsWithStates,
    replaceAndExtractStoryEntities,
    replaceAtPatterns,
} from '../utils';

import { FieldDefinition, Media, StoryParser, StoryTheme } from '../types';
import FieldsManager from './FieldsManager';
import ScreensManager from './ScreensManager';

class MediasParser implements StoryParser {
    fieldsManager: FieldsManager;
    screensManager: ScreensManager;
    fieldsPatternCache: Record<string, RegExp[]>;
    parsedThemesCache: Record<string, { medias: Record<string, Media>; theme: StoryTheme }>;

    constructor({ fieldsManager, screensManager, fieldsPattern = {} }) {
        this.fieldsManager = fieldsManager;
        this.screensManager = screensManager;
        this.fieldsPatternCache = fieldsPattern || {};
        this.parsedThemesCache = {};
    }

    getParsedStoryTheme(storyId, theme) {
        if (typeof this.parsedThemesCache[storyId] === 'undefined') {
            const { medias: themeMedias, ...newTheme } = this.parseFromEditor(theme);
            this.parsedThemesCache[storyId] = { theme: newTheme, medias: themeMedias };
        }
        return this.parsedThemesCache[storyId];
    }

    getFieldsPatternByScreen(type) {
        if (typeof this.fieldsPatternCache[type] === 'undefined') {
            const fields = getScreenFieldsWithStates(this.screensManager.getDefinition(type) || {});
            this.fieldsPatternCache[type] = getFieldsPattern(
                fields || [],
                this.fieldsManager,
                (fieldDefinition, path) => [
                    ...(MediasParser.fieldIsMedia(fieldDefinition)
                        ? [new RegExp(`^${path}$`)]
                        : []),
                    ...(MediasParser.fieldIsFontFamily(fieldDefinition)
                        ? [
                              new RegExp(`^${path}\\.media$`),
                              new RegExp(`^${path}\\.variants\\.[0-9]+\\.media$`),
                          ]
                        : []),
                ],
            );
        }
        return this.fieldsPatternCache[type];
    }

    // Replace media paths with media objects
    parseToViewer(story) {
        if (story === null) {
            return story;
        }
        const { medias = {}, ...storyWithoutMedias } = story || {};
        const mediasPattern = getPatternsFromMatchingValue(
            storyWithoutMedias,
            (val) => isString(val) && typeof medias[val] !== 'undefined',
        );
        if (mediasPattern.length > 0) {
            const { data: newStory } = replaceAtPatterns(story, mediasPattern, (val) =>
                isString(val) && typeof medias[val] !== 'undefined' ? medias[val] : val,
            );
            return newStory;
        }
        return story;
    }

    // Convert medias object to path and extract medias
    parseFromEditor(story) {
        if (story === null) {
            return story;
        }

        const newStory = replaceAndExtractStoryEntities(
            story,
            'medias',
            ({ type }) => this.getFieldsPatternByScreen(type),
            (val) => (isObject(val) ? MediasParser.getMediaPath(val) : val) as string,
        );

        const {
            id: storyId = null,
            theme = null,
            components: newComponents = [],
            medias: newMedias,
        } = newStory || {};
        if (theme !== null) {
            const { theme: newTheme, medias: themeMedias } = this.getParsedStoryTheme(
                storyId,
                theme,
            );
            return themeMedias !== null
                ? {
                      ...newStory,
                      theme: newTheme,
                      components: newComponents,
                      medias: {
                          ...themeMedias,
                          ...newMedias,
                      },
                  }
                : newStory;
        }
        return newStory;
    }

    static fieldIsMedia({ media = false }: FieldDefinition) {
        return media;
    }

    static fieldIsFontFamily({ id = null }: FieldDefinition) {
        return id === 'font-family';
    }

    static getMediaPath({ id = null }) {
        return id !== null ? `media://${id}` : null;
    }
}

export default MediasParser;
