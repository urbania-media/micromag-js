/* eslint-disable react/no-array-index-key */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useHistory } from 'react-router';
import { Breadcrumb as BaseBreadcrumb } from '@micromag/core/components';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { injectIntl } from 'react-intl';
import { useSchemasRepository, SCREENS_NAMESPACE } from '@micromag/schemas';

import BackButton from '../buttons/Back';

import styles from '../../styles/menus/breadcrumb.module.scss';

import messages from '../../messages';

const propTypes = {
    intl: MicromagPropTypes.intl.isRequired,
    story: MicromagPropTypes.story,
    screenId: PropTypes.string,
    field: PropTypes.string,
    form: PropTypes.string,
    panel: MicromagPropTypes.panel,
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    story: null,
    screenId: null,
    field: null,
    form: null,
    panel: null,
    className: null,
};

const Breadcrumb = ({ intl, story, screenId, field, form, panel, url, className }) => {
    const { components: screens = [] } = story || {};
    const repository = useSchemasRepository();
    const history = useHistory();

    const items = useMemo(() => {
        const screenIndex = screens.findIndex(it => it.id === screenId);
        const { type, layout = null } = screens[screenIndex];
        const fieldItems = [];
        if (field !== null) {
            const fields = repository.getFieldsFromSchema(`${SCREENS_NAMESPACE}/${type}`, {
                layout,
            });
            const fieldParts = field.split('/');
            const parentField = fields.find(it => it.name === fieldParts[0]) || null;
            const currentField = fieldParts.reduce(
                (foundField, name) => {
                    if (foundField === null) {
                        return null;
                    }
                    const { setting = false } = foundField;
                    const newField = (foundField.fields || []).find(it => it.name === name) || null;
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

        const panelItems =
            panel !== null
                ? [
                      {
                          label: panel.title,
                          url: '',
                          active: false,
                          panel: panel.id,
                      },
                  ]
                : [];

        const finalItems = [
            {
                label: intl.formatMessage(messages.screenIndexName, {
                    index: screenIndex + 1,
                }),
                url: `/${screenId}`,
                active: false,
            },
            ...fieldItems,
            ...panelItems,
        ]
            .filter(it => it !== null);

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
    }, [intl, repository, screens, screenId, field, form, panel, url]);

    const onClickBack = useCallback(() => history.push(items[items.length - 2].url), [items]);
    const withBack = items.length > 1;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {withBack ? <BackButton onClick={onClickBack} className="mr-2" /> : null}
            <BaseBreadcrumb items={items} className={styles.menu} />
        </div>
    );
};

Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

export default injectIntl(Breadcrumb);
