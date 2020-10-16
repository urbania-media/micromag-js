/* eslint-disable react/no-array-index-key */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { Breadcrumb as BaseBreadcrumb } from '@micromag/core/components';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useSchemasRepository, SCREENS_NAMESPACE } from '@micromag/schemas';

import BackButton from '../buttons/Back';

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
    const repository = useSchemasRepository();
    const history = useHistory();

    const items = useMemo(() => {
        const screenIndex = screens.findIndex((it) => it.id === screenId);
        const { type, layout = null } = screens[screenIndex];
        const fieldItems = [];
        if (field !== null) {
            const fields = repository.getFieldsFromSchema(`${SCREENS_NAMESPACE}/${type}`, {
                layout,
            });
            const fieldParts = field.split('/');
            const parentField = fields.find((it) => it.name === fieldParts[0]) || null;
            const currentField = fieldParts.reduce(
                (foundField, name) => {
                    if (foundField === null) {
                        return null;
                    }
                    const { setting = false } = foundField;
                    const newField =
                        (foundField.fields || []).find((it) => it.name === name) || null;
                    return setting
                        ? {
                              ...newField,
                              setting,
                          }
                        : newField;
                },
                { fields },
            );
            const isSetting = currentField !== null && currentField.setting === true;
            if (isSetting && parentField !== null) {
                fieldItems.push({
                    label: parentField.label,
                    url: `/${screenId}/${parentField.name}${isSetting ? '/settings' : ''}`,
                    active: false,
                });
            }
            if (currentField !== null) {
                fieldItems.push({
                    label: currentField.description || currentField.label,
                    url: `/${screenId}/${field}${form !== null ? `/${form}` : ''}`,
                    active: false,
                });
            }
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
    }, [intl, repository, screens, screenId, field, form, url]);

    const onClickBack = useCallback(() => history.push(items[items.length - 2].url), [items]);
    const withBack = items.length > 1;

    return (
        <>
            {withBack ? <BackButton onClick={onClickBack} className="mr-2" /> : null}
            <BaseBreadcrumb
                items={items}
                theme="secondary"
                withoutBar
                noWrap
                className={className}
            />
        </>
    );
};

Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

export default Breadcrumb;
