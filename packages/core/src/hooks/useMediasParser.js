import { useCallback } from 'react';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import { useScreensManager, useFieldsManager } from '../contexts';

const fieldIsMedia = ({ media = false }) => media;

const getMediaFieldsPattern = (fieldsManager, fields, namePrefix = null) =>
    fields.reduce((patterns, field) => {
        const { name = null, type = null } = field;
        const path = [namePrefix, name].filter((it) => it !== null).join('\\.');
        const fieldDefinition = {
            ...(type !== null ? fieldsManager.getDefinition(type) : null),
            ...field,
        };
        const { fields: subFields = [], itemsField = null } = fieldDefinition;
        return [
            ...patterns,
            ...(fieldIsMedia(fieldDefinition) ? [new RegExp(`^${path}$`)] : []),
            ...getMediaFieldsPattern(fieldsManager, subFields, path),
            ...(itemsField !== null
                ? getMediaFieldsPattern(fieldsManager, [itemsField], `${path}\\.[0-9]+`)
                : []),
        ];
    }, []);

const replacePathsWithMedias = (data, medias, patterns, keyPrefix = null) => {
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
                        ? replacePathsWithMedias(value, medias, patterns, path)
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

const getMediaPath = ({ id = null }) => (id !== null ? `media://${id}` : null);

const replaceMediasWithPaths = (data, patterns, medias = null, keyPrefix = null) => {
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
                const mediaPath = getMediaPath(value);
                newValue = mediaPath !== null ? mediaPath : value;
                media = mediaPath !== null ? value : null;
            } else if (isObject(value) || isArray(value)) {
                const subReturn = replaceMediasWithPaths(value, patterns, medias, path);
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

const useMediasParser = () => {
    const screensManager = useScreensManager();
    const fieldsManager = useFieldsManager();

    // Convert medias object to path
    const toPath = useCallback(
        (story) => {
            if (story === null) {
                return story;
            }
            const { components = [] } = story;
            const { components: newComponents, medias } = components.reduce(
                ({ components: previousComponents, medias: currentMedias }, screen) => {
                    const { type } = screen;
                    const { fields = [] } = screensManager.getDefinition(type) || {};
                    const fieldsPattern = getMediaFieldsPattern(fieldsManager, fields);
                    const { data: newScreen, medias: newMedias } = replaceMediasWithPaths(
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
        },
        [screensManager, fieldsManager],
    );

    // Convert path to medias object
    const fromPath = useCallback(
        (story) => {
            if (story === null) {
                return story;
            }
            const { components = [], medias = null } = story;
            if (medias === null) {
                return story;
            }
            const newComponents = components.map((screen) => {
                const { type } = screen;
                const { fields = [] } = screensManager.getDefinition(type) || {};
                const fieldsPattern = getMediaFieldsPattern(fieldsManager, fields);
                return replacePathsWithMedias(screen, medias, fieldsPattern);
            });
            return {
                ...story,
                components: newComponents,
            };
        },
        [screensManager, fieldsManager],
    );

    return { toPath, fromPath };
};

export default useMediasParser;
