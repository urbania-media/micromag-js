/* eslint-disable react/no-array-index-key */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { Breadcrumb as BaseBreadcrumb, BackButton } from '@micromag/core/components';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { isMessage } from '@micromag/core/utils';
import { useScreensManager, useFieldsManager } from '@micromag/core/contexts';

import getFieldByName from '../../utils/getFieldByName';

import styles from '../../styles/menus/breadcrumb.module.scss';

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

    const items = useMemo(() => {
        const screenIndex = screens.findIndex((it) => it.id === screenId);
        if (!screens[screenIndex]) {
            return [];
        }
        const { type } = screens[screenIndex];
        const fieldItems = [];
        if (field !== null) {
            const { fields = [] } = screensManager.getDefinition(type);
            const fieldPath = field.split('/');

            const lastKeyIndex = fieldPath.length - 1;
            let parentItem = null;
            fieldPath.reduce(
                (currentFields, key, keyIndex) => {
                    const { type: fieldType = null } = currentFields;

                    const fieldsDef =
                        fieldType !== null ? fieldsManager.getDefinition(fieldType) : currentFields;
                    const {
                        fields: subFields = null,
                        settings = null,
                        itemsField = null,
                    } = fieldsDef;

                    const currentSubfields =
                        subFields !== null ? getFieldByName(subFields, key) : null;
                    const currentSettings =
                        settings !== null ? getFieldByName(settings, key) : null;

                    const isCurrentSubfields = currentSubfields !== null;
                    const isCurrentSettings = currentSettings !== null;
                    const isListItems = itemsField !== null && !!key.match(/^[0-9]+$/);
                    const isLastIndex = keyIndex === lastKeyIndex;

                    const pathPrefix = `/${screenId}/${fieldPath.slice(0, keyIndex + 1).join('/')}`;
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
                                url: `/${screenId}/${fieldPath
                                    .slice(0, keyIndex)
                                    .join('/')}/settings`,
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
                { fields },
            );
        }

        const finalItems = [
            {
                label: intl.formatMessage(
                    {
                        defaultMessage: 'Screen {index}',
                        description: 'Screen label in the breadcrumb',
                    },
                    {
                        index: screenIndex + 1,
                    },
                ),
                url: `/${screenId}`,
                active: false,
            },
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
    }, [intl, screens, screenId, field, form, url, screensManager, fieldsManager]);

    const { length: itemsLength } = items;

    const onClickBack = useCallback(() => {
        history.push(items[itemsLength - 2].url);
    }, [items]);
    const withBack = itemsLength > 1;
    return (
        <>
            {withBack ? <BackButton onClick={onClickBack} className="mr-2" /> : null}
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
