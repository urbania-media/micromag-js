/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb as BaseBreadcrumb } from '@micromag/core/components';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { injectIntl } from 'react-intl';
import { useSchemasRepository, SCREENS_NAMESPACE } from '@micromag/schemas';

import messages from '../../messages';

const propTypes = {
    intl: MicromagPropTypes.intl.isRequired,
    value: MicromagPropTypes.story,
    screenId: PropTypes.string,
    field: PropTypes.string,
    panels: PropTypes.arrayOf(PropTypes.object),
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    screenId: null,
    field: null,
    panels: null,
    className: null,
};

const Breadcrumb = ({ intl, value, screenId, field, panels, url, className }) => {
    const { components: screens = [] } = value || {};
    const repository = useSchemasRepository();

    const items = useMemo(() => {
        const screenIndex = screens.findIndex(it => it.id === screenId);
        const { type, layout = null } = screens[screenIndex];
        let fieldItems = [];
        if (field !== null) {
            const fields = repository.getFieldsFromSchema(`${SCREENS_NAMESPACE}/${type}`, {
                layout,
            });
            const fieldParts = field.split('/');
            const lastIndex = fieldParts.length - 1;
            fieldItems = fieldParts.reduce(
                (
                    {
                        items: currentItems,
                        fields: currentFields,
                        path: currentPath,
                        url: currentUrl,
                        settingPath,
                    },
                    key,
                    index,
                ) => {
                    const {
                        name,
                        label = null,
                        fields: subFields = [],
                        // setting = false,
                    } =
                        currentFields.find(it => it.name === key) ||
                        (key.match(/^[0-9]+$/) !== null
                            ? {
                                  label: `#${parseInt(key, 10) + 1}`,
                              }
                            : null) ||
                        {};
                    const subHasSettings = subFields.reduce(
                        (hasSettings, { setting: subSetting = false }) => hasSettings || subSetting,
                        false,
                    );
                    const path = `${currentPath}/${name}`;
                    const newSettingPath = subHasSettings ? `${path}/settings` : settingPath;
                    const newUrl = newSettingPath || path;
                    return {
                        path,
                        url: newUrl,
                        settingPath: newSettingPath,
                        items:
                            label !== null && (newUrl !== currentUrl || index === lastIndex)
                                ? [
                                      ...currentItems,
                                      {
                                          label,
                                          url: newUrl,
                                          active: false,
                                      },
                                  ]
                                : currentItems,
                        fields: subFields,
                    };
                },
                {
                    items: [],
                    fields,
                    url: `/${screenId}`,
                    path: `/${screenId}`,
                    settingPath: null,
                },
            ).items;
        }

        const panelsItems = panels.map(panel => ({
            label: panel.title,
            url,
            active: false,
        }));

        const finalItems = [
            {
                label: intl.formatMessage(messages.screenIndexName, {
                    index: screenIndex + 1,
                }),
                url: `/${screenId}`,
                active: false,
            },
            ...fieldItems,
            ...panelsItems,
        ].filter(it => it !== null);

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
    }, [intl, repository, screens, screenId, field, panels, url]);

    return <BaseBreadcrumb items={items} className={className} />;
};

Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

export default injectIntl(Breadcrumb);
