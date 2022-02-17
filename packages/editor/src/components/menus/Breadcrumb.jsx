/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Breadcrumb as BaseBreadcrumb, BackButton } from '@micromag/core/components';
import { useScreensManager, useFieldsManager, useUrlGenerator } from '@micromag/core/contexts';
import { isMessage, getScreenExtraField } from '@micromag/core/utils';
import getScreenFieldsWithStates from '../../lib/getScreenFieldsWithStates';
import styles from '../../styles/menus/breadcrumb.module.scss';
import getFieldByName from '../../utils/getFieldByName';

const propTypes = {
    story: MicromagPropTypes.story,
    screenId: PropTypes.string,
    field: PropTypes.string,
    form: PropTypes.string,
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    story: null,
    screenId: null,
    field: null,
    form: null,
    className: null,
};

const Breadcrumb = ({ story, screenId, field, form, url, className }) => {
    const intl = useIntl();
    const { components: screens = [] } = story || {};
    const history = useHistory();
    const screensManager = useScreensManager();
    const fieldsManager = useFieldsManager();
    const route = useUrlGenerator();

    const { fields: screenFields = [], states: screenStates = null } = useMemo(() => {
        const screenIndex = screens.findIndex((it) => it.id === screenId);
        if (!screens[screenIndex]) {
            return {};
        }
        const { type } = screens[screenIndex];
        const definition = screensManager.getDefinition(type);
        const { states } = definition;
        return {
            fields: [...getScreenFieldsWithStates(definition), getScreenExtraField(intl)],
            states,
        };
    }, [screens, screenId, screensManager, intl]);

    const items = useMemo(() => {
        const fieldItems = [];
        let currentState = null;
        if (field !== null) {
            const fieldPath = field.split('/');

            // Get state and remove it from path. Replace it with field name if necessary (repeatable or fieldName present)
            const [stateId = null] = fieldPath;
            currentState =
                screenStates !== null
                    ? screenStates.find(({ id }) => id === stateId) || null
                    : null;
            let finalFieldPath = fieldPath
            if (currentState !== null) {
                const { repeatable = false, fieldName = null } = currentState || {};
                finalFieldPath = repeatable || fieldName !== null ? [
                    fieldName || stateId,
                    ...fieldPath.slice(1),
                ] : fieldPath.slice(1);
            }

            const lastKeyIndex = finalFieldPath.length - 1;
            let parentItem = null;
            finalFieldPath.reduce(
                (currentFields, key, keyIndex) => {
                    const { type: fieldType = null, fields: currentSubFields = null } =
                        currentFields;

                    const fieldsDef =
                        fieldType !== null ? fieldsManager.getDefinition(fieldType) : currentFields;
                    const {
                        fields: defSubFields = null,
                        settings = null,
                        itemsField = null,
                    } = fieldsDef;

                    const subFields = currentSubFields || defSubFields;

                    const currentSubfields =
                        subFields !== null ? getFieldByName(subFields, key) : null;
                    const currentSettings =
                        settings !== null ? getFieldByName(settings, key) : null;

                    const isCurrentSubfields = currentSubfields !== null;
                    const isCurrentSettings = currentSettings !== null;
                    const isListItems = itemsField !== null && !!key.match(/^[0-9]+$/);
                    const isLastIndex = keyIndex === lastKeyIndex;

                    const pathPrefix = route('screen.field', {
                        screen: screenId,
                        field: fieldPath.slice(0, keyIndex + 1),
                    });
                    const pathSuffix = isLastIndex && form !== null ? `/${form}` : '';

                    const addNewItem = isLastIndex || isListItems;

                    const itemPath = `${pathPrefix}${pathSuffix}`;

                    let nextFields = null;

                    if (isCurrentSubfields) {
                        nextFields = currentSubfields;
                    } else if (isCurrentSettings) {
                        nextFields = currentSettings;
                        if (parentItem !== null) {
                            fieldItems.push({
                                ...parentItem,
                                url: route('screen.field.form', {
                                    screen: screenId,
                                    field: fieldPath.slice(0, keyIndex),
                                    form: 'settings',
                                }),
                            });
                        }
                    } else if (isListItems) {
                        nextFields = itemsField;
                    }

                    const fieldLabel = nextFields
                        ? nextFields.breadcrumbLabel || nextFields.label
                        : null;

                    const itemLabel = isMessage(fieldLabel)
                        ? intl.formatMessage(fieldLabel)
                        : fieldLabel;

                    const { label: parentItemLabel = null } = parentItem || {};

                    const finalItemLabel = isListItems
                        ? `${itemLabel} #${parseInt(key, 10) + 1}`
                        : itemLabel || parentItemLabel;

                    const item = {
                        url: itemPath,
                        label: finalItemLabel || '',
                        active: false,
                    };

                    if (addNewItem) {
                        fieldItems.push(item);
                    }

                    parentItem = item;

                    return nextFields;
                },
                { fields: screenFields },
            );
        }

        const finalItems = [
            currentState === null || (currentState.repeatable || false) === false
                ? {
                      label:
                          currentState !== null
                              ? currentState.label
                              : intl.formatMessage({
                                    defaultMessage: 'Parameters',
                                    description: 'Screen label in the breadcrumb',
                                }),
                      url:
                          currentState !== null
                              ? route('screen.field', {
                                    screen: screenId,
                                    field: currentState.id,
                                })
                              : route('screen', {
                                    screen: screenId,
                                }),
                      active: false,
                  }
                : null,
            ...fieldItems,
        ].filter((it) => it !== null);

        const lastItemsIndex = finalItems.length - 1;

        return finalItems.map((it, index) =>
            index === lastItemsIndex
                ? {
                      ...it,
                      url,
                      active: true,
                  }
                : it,
        );
    }, [intl, route, screenId, field, form, url, screenFields, screenStates, fieldsManager]);

    const { length: itemsLength } = items;

    const onClickBack = useCallback(() => {
        history.push(items[itemsLength - 2].url);
    }, [items]);
    const withBack = itemsLength > 1;
    return (
        <>
            {withBack ? <BackButton onClick={onClickBack} className="me-2 py-0" /> : null}
            <BaseBreadcrumb
                items={items}
                theme="secondary"
                withoutBar
                noWrap
                className={classNames([
                    styles.container,
                    'text-truncate',
                    {
                        [className]: className !== null,
                    },
                ])}
            />
        </>
    );
};

Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

export default Breadcrumb;
