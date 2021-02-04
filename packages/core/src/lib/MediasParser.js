import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

class MediasParser {
    constructor({ fieldsManager, screensManager }) {
        this.fieldsManager = fieldsManager;
        this.screensManager = screensManager;
    }

    // Convert medias object to path
    toPath(story) {
        if (story === null) {
            return story;
        }
        const { components = [] } = story || {};
        const { components: newComponents, medias } = components.reduce(
            ({ components: previousComponents, medias: currentMedias }, screen) => {
                const { type } = screen;
                const { fields = [] } = this.screensManager.getDefinition(type) || {};
                const fieldsPattern = this.getMediaFieldsPattern(fields);
                const { data: newScreen, medias: newMedias } = MediasParser.replaceMediasWithPaths(
                    screen,
                    fieldsPattern,
                );
                return {
                    components: [...previousComponents, newScreen],
                    medias: {
                        ...currentMedias,
                        ...newMedias,
                    },
                };
            },
            { components: [], medias: {} },
        );
        // console.log(newComponents, medias);
        return {
            ...story,
            components: newComponents,
            medias,
        };
    }

    // Convert path to medias object
    fromPath(story) {
        if (story === null) {
            return story;
        }
        const { components = [], medias = null } = story || {};
        if (medias === null) {
            return story;
        }
        const newComponents = components.map((screen) => {
            const { type } = screen;
            const { fields = [] } = this.screensManager.getDefinition(type) || {};
            const fieldsPattern = this.getMediaFieldsPattern(fields);
            return MediasParser.replacePathsWithMedias(screen, medias, fieldsPattern);
        });
        return {
            ...story,
            components: newComponents,
        };
    }

    getMediaFieldsPattern(fields, namePrefix = null) {
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
                ...(MediasParser.fieldIsMedia(fieldDefinition) ? [new RegExp(`^${path}$`)] : []),
                ...(MediasParser.fieldIsFontFamily(fieldDefinition) ? [new RegExp(`^${path}\\.media$`)] : []),
                ...this.getMediaFieldsPattern(subFields, path),
                ...this.getMediaFieldsPattern(settings, path),
                ...(itemsField !== null
                    ? this.getMediaFieldsPattern([itemsField], `${path}\\.[0-9]+`)
                    : []),
            ];
        }, []);
    }

    static fieldIsMedia({ media = false }) {
        return media;
    }

    static fieldIsFontFamily({ id = null }) {
        return id === 'font-family';
    }

    static replacePathsWithMedias(data, medias, patterns, keyPrefix = null) {
        const dataIsArray = isArray(data);
        const keys = dataIsArray ? [...data.keys()] : Object.keys(data);
        return keys.reduce(
            (newData, key) => {
                const path = [keyPrefix, key].filter((it) => it !== null).join('.');
                const patternMatch = patterns.reduce(
                    (found, pattern) => found || pattern.test(path),
                    false,
                );
                const value = data[key];
                let newValue;
                if (patternMatch) {
                    newValue = isObject(value) ? value : medias[value] || null;
                } else {
                    newValue =
                        isObject(value) || isArray(value)
                            ? MediasParser.replacePathsWithMedias(value, medias, patterns, path)
                            : value;
                }
                return dataIsArray
                    ? [...newData, newValue]
                    : {
                          ...newData,
                          [key]: newValue,
                      };
            },
            dataIsArray ? [] : {},
        );
    };

    static getMediaPath({ id = null }) {
        return id !== null ? `media://${id}` : null;
    }

    static replaceMediasWithPaths(data, patterns, medias = null, keyPrefix = null) {
        const dataIsArray = isArray(data);
        const keys = dataIsArray ? [...data.keys()] : Object.keys(data);
        return keys.reduce(
            ({ data: currentData, medias: currentMedias }, key) => {
                const path = [keyPrefix, key].filter((it) => it !== null).join('.');
                const patternMatch = patterns.reduce(
                    (found, pattern) => found || pattern.test(path),
                    false,
                );
                const value = data[key];
                let newValue;
                let media = null;
                let subMedias = null;
                if (patternMatch && isObject(value)) {
                    const mediaPath = MediasParser.getMediaPath(value);
                    newValue = mediaPath !== null ? mediaPath : value;
                    media = mediaPath !== null ? value : null;
                } else if (isObject(value) || isArray(value)) {
                    const subReturn = MediasParser.replaceMediasWithPaths(value, patterns, medias, path);
                    newValue = subReturn.data;
                    subMedias = subReturn.medias;
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
                    medias:
                        media !== null
                            ? {
                                  ...currentMedias,
                                  ...subMedias,
                                  [newValue]: media,
                              }
                            : {
                                  ...currentMedias,
                                  ...subMedias,
                              },
                };
            },
            {
                data: null,
                medias,
            },
        );
    };
}

export default MediasParser;
