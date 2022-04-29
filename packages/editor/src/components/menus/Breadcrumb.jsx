/* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Breadcrumb as BaseBreadcrumb, BackButton } from '@micromag/core/components';
import { useScreensManager, useFieldsManager, useUrlGenerator } from '@micromag/core/contexts';
import { isMessage, getScreenExtraField } from '@micromag/core/utils';
import styles from '../../styles/menus/breadcrumb.module.scss';
import getFieldByName from '../../utils/getFieldByName';
import getScreenFieldsWithStates from '../../utils/getScreenFieldsWithStates';

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

    const {
        title: screenTitle = null,
        fields: screenFields = [],
        states: screenStates = null,
        parameters: screenParameters = null,
    } = useMemo(() => {
        const screenIndex = screens.findIndex((it) => it.id === screenId);
        if (!screens[screenIndex]) {
            return {};
        }
        const { type, parameters = null } = screens[screenIndex];

        const definition = screensManager.getDefinition(type);
        const { states = null, title: definitionTitle = null } = definition || {};

        return {
            title: definitionTitle,
            fields:
                definition !== null
                    ? [...getScreenFieldsWithStates(definition), getScreenExtraField(intl)]
                    : null,
            states,
            parameters,
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
            let finalFieldPath = fieldPath;
            if (currentState !== null) {
                const { repeatable = false, fieldName = null } = currentState || {};
                finalFieldPath =
                    (repeatable || fieldName !== null) && fieldPath.length <= (repeatable ? 2 : 1)
                        ? [fieldName || stateId, ...fieldPath.slice(1)]
                        : fieldPath.slice(1);
            }

            const lastKeyIndex = finalFieldPath.length - 1;
            let parentItem = null;
            finalFieldPath.reduce(
                (currentFields, key, keyIndex) => {
                    const {
                        type: fieldType = null,
                        fields: currentSubFields = null,
                        itemsField: currentItemsField = null,
                    } = currentFields;

                    const fieldsDef =
                        fieldType !== null ? fieldsManager.getDefinition(fieldType) : currentFields;
                    const {
                        fields: defSubFields = null,
                        settings = null,
                        itemsField: defItemsField = null,
                    } = fieldsDef;

                    const itemsField = currentItemsField || defItemsField;
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
                        field: [
                            currentState !== null ? currentState.id : null,
                            ...finalFieldPath.slice(0, keyIndex + 1),
                        ].filter((it) => it !== null),
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
                                    field: [
                                        currentState !== null ? currentState.id : null,
                                        ...finalFieldPath.slice(0, keyIndex),
                                    ].filter((it) => it !== null),
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

        const { metadata = null } = screenParameters || {};
        const { title = null } = metadata || {};

        const typeTitle = screenTitle !== null ? <FormattedMessage {...screenTitle} /> : null;

        const parametersMessage = intl.formatMessage({
            defaultMessage: 'Parameters',
            description: 'Screen label in the breadcrumb',
        });

        const defaultLabel =
            (fieldItems || []).length === 0
                ? title || typeTitle || parametersMessage
                : parametersMessage;

        const finalItems = [
            currentState === null || (currentState.repeatable || false) === false
                ? {
                      label: currentState !== null ? currentState.label : defaultLabel,
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
    }, [
        intl,
        route,
        screenId,
        field,
        form,
        url,
        screenFields,
        screenStates,
        screenTitle,
        fieldsManager,
    ]);

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
