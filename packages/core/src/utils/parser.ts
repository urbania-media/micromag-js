import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';

import { FieldsManager } from '../lib';

import { FieldDefinition, ScreenComponent, Story } from '../types';

export function getPatternsFromMatchingValue(
    obj,
    matcher: (value: unknown, key: string) => boolean = () => true,
): RegExp[] {
    const dotObj = toDot(obj);
    return Object.keys(dotObj)
        .filter((key) => matcher(dotObj[key], key))
        .map((it) => new RegExp(`^${it.replace(/\./g, '\\.')}$`));
}

export function toDot(obj, prefix = null): Record<string, unknown> {
    if (obj === null) {
        return {};
    }
    if (!isObject(obj) && !isArray(obj)) {
        return prefix !== null ? { [prefix]: obj } : {};
    }
    return getKeys(obj).reduce((acc, key) => {
        if (!isObject(obj[key]) && !isArray(obj[key])) {
            return {
                ...acc,
                [prefix !== null ? `${prefix}.${key}` : `${key}`]: obj[key],
            };
        }

        return {
            ...acc,
            ...toDot(obj[key], prefix !== null ? `${prefix}.${key}` : `${key}`),
        };
    }, {});
}

export function getFieldsPattern(
    fields,
    fieldsManager: FieldsManager,
    patternsMatcher: (fieldDefinition: FieldDefinition, path: string) => RegExp | RegExp[] | null,
    namePrefix = null,
) {
    return (fields || []).reduce((patterns, field) => {
        const { name = null, type = null } = field;
        const path = [namePrefix, name].filter((it) => it !== null && it !== '').join('\\.');
        const fieldDefinition = {
            ...(type !== null ? fieldsManager.getDefinition(type) : null),
            ...field,
        };

        // also check settings fields
        const { fields: subFields = [], itemsField = null, settings = [] } = fieldDefinition;

        const newPatterns = patternsMatcher(fieldDefinition, path);

        return [
            ...patterns,
            ...(newPatterns !== null ? (isArray(newPatterns) ? newPatterns : [newPatterns]) : []),
            ...getFieldsPattern(subFields, fieldsManager, patternsMatcher, path),
            ...getFieldsPattern(settings, fieldsManager, patternsMatcher, path),
            ...(itemsField !== null
                ? getFieldsPattern([itemsField], fieldsManager, patternsMatcher, `${path}\\.[0-9]+`)
                : []),
        ];
    }, []);
}

export function extractAtPatterns(
    data: object | Array<unknown>,
    patterns: RegExp[],
    matcher: (val: unknown) => boolean = () => true,
    keyPrefix: string | null = null,
) {
    const dataIsArray = isArray(data);
    const keys = dataIsArray ? [...data.keys()] : Object.keys(data);
    return keys.reduce((currentFonts, key) => {
        const path = [keyPrefix, key].filter((it) => it !== null).join('.');
        const patternMatch = patterns.reduce(
            (found, pattern) => found || pattern.test(path),
            false,
        );
        const value = data[key];
        let extract = null;
        let subExtract = null;
        if (patternMatch && matcher(value)) {
            extract = value;
        } else if (isObject(value) || isArray(value)) {
            subExtract = extractAtPatterns(value, patterns, matcher, path);
        }
        return subExtract !== null || extract !== null
            ? [...currentFonts, ...(subExtract || []), ...(extract !== null ? [extract] : [])]
            : currentFonts;
    }, []);
}

export function replaceAtPatterns(
    data: object | Array<unknown>,
    patterns: RegExp[],
    replacer: (value: unknown, path: string) => unknown,
    extract: Record<string, unknown> | null = null,
    keyPrefix: string | null = null,
): {
    data: object | Array<unknown>;
    extract: Record<string, unknown> | null;
} {
    const dataIsArray = isArray(data);
    const dataKeys = getKeys(data);
    return dataKeys.reduce(
        ({ data: currentData, extract: currentExtract }, key) => {
            const path = [keyPrefix, key].filter((it) => it !== null).join('.');
            const patternMatch = patterns.reduce(
                (found, pattern) => found || pattern.test(path),
                false,
            );
            const value = currentData[key];
            let newValue = value;
            let hasExtract = false;
            let extract = null;
            let subExtract = null;
            if (patternMatch) {
                newValue = replacer(value, path);
                extract = value;
                hasExtract = true;
            } else if (isObject(value) || isArray(value)) {
                const subReturn = replaceAtPatterns(value, patterns, replacer, extract, path);
                newValue = subReturn.data;
                subExtract = subReturn.extract;
            }
            const currentArray = dataIsArray ? ((currentData || []) as Array<unknown>) : [];
            return {
                data:
                    newValue === value
                        ? currentData
                        : dataIsArray
                          ? [
                                ...currentArray.slice(0, key as number),
                                newValue,
                                ...currentArray.slice((key as number) + 1),
                            ]
                          : {
                                ...currentData,
                                [key]: newValue,
                            },
                extract: hasExtract
                    ? { ...currentExtract, ...subExtract, [path]: extract }
                    : subExtract !== null
                      ? { ...currentExtract, ...subExtract }
                      : currentExtract,
            };
        },
        {
            data,
            extract,
        },
    );
}

export function replaceAndExtractStoryEntities(
    story: Story | null,
    entityType: 'fonts' | 'medias',
    getFieldsPatternByScreen: (screen: ScreenComponent) => RegExp[],
    getKey: (value: unknown, path: string) => string,
): Story | null {
    const { components = [] } = story || {};
    return components.reduce<Story | null>((currentStory, screen, screenIndex) => {
        const fieldsPattern = getFieldsPatternByScreen(screen);
        const { data: newScreen, extract: newEntities } = replaceAtPatterns(
            screen,
            fieldsPattern,
            getKey,
        );
        if (newScreen === screen) {
            return currentStory;
        }
        const { components: previousComponents, [entityType]: currentEntities } =
            currentStory || {};
        return {
            ...currentStory,
            components: [
                ...previousComponents.slice(0, screenIndex),
                newScreen as ScreenComponent,
                ...previousComponents.slice(screenIndex + 1),
            ],
            [entityType]:
                newEntities !== null
                    ? Object.keys(newEntities).reduce((entities, key) => {
                          const entity = newEntities[key];
                          if (isObject(entity)) {
                              return {
                                  ...entities,
                                  [getKey(entity, key)]: entity,
                              };
                          }
                          return entities;
                      }, currentEntities)
                    : currentEntities,
        };
    }, story);
}

export function replaceStoryEntities(
    story: Story | null,
    entityType: 'fonts' | 'medias',
    getFieldsPatternByScreen: (screen: ScreenComponent) => RegExp[],
    getKey = (val: unknown) => val as string,
): Story | null {
    const { components = [] } = story || {};
    return components.reduce<Story | null>((currentStory, screen, screenIndex) => {
        const { components: previousComponents, [entityType]: currentEntities } =
            currentStory || {};
        const fieldsPattern = getFieldsPatternByScreen(screen);
        const { data: newScreen } = replaceAtPatterns(screen, fieldsPattern, (val) =>
            isObject(val) ? val : (currentEntities?.[getKey(val)] ?? val),
        );
        if (newScreen === screen) {
            return currentStory;
        }
        return {
            ...currentStory,
            components: [
                ...previousComponents.slice(0, screenIndex),
                newScreen as ScreenComponent,
                ...previousComponents.slice(screenIndex + 1),
            ],
        };
    }, story);
}

export function getKeys(obj) {
    return isArray(obj) ? [...obj.keys()] : Object.keys(obj);
}
