/* eslint-disable react/no-array-index-key */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { Breadcrumb as BaseBreadcrumb } from '@micromag/core/components';
import { PropTypes as MicromagPropTypes, isMessage } from '@micromag/core';
import { useScreensManager, useFieldsManager } from '@micromag/core/contexts';

import getFieldFromPath from '../../utils/getFieldFromPath';
import getFieldByName from '../../utils/getFieldByName';
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
    const history = useHistory();
    const screensManager = useScreensManager();
    const fieldsManager = useFieldsManager();

    const items = useMemo(() => {
        const screenIndex = screens.findIndex((it) => it.id === screenId);
        const { type } = screens[screenIndex];
        const fieldItems = [];
        if (field !== null) {
            const { fields = [] } = screensManager.getDefinition(type);
            const [screenFieldName, ...subFieldsPath] = field.split('/');
            const screenField = getFieldByName(fields, screenFieldName);
            const { settings: screenFieldSettings = null } =
                screenField !== null
                    ? fieldsManager.getDefinition(screenField.type) || screenField
                    : screenField;
            const currentField = getFieldFromPath(
                [screenFieldName, ...subFieldsPath],
                fields,
                fieldsManager,
            );
            if (screenFieldSettings !== null && screenField !== null && screenFieldName !== field) {
                fieldItems.push({
                    label: screenField.label || null,
                    url: `/${screenId}/${screenField.name}/settings`,
                    active: false,
                });
            }
            if (currentField !== null) {
                const lastPath =
                    subFieldsPath.length > 0 ? subFieldsPath[subFieldsPath.length - 1] : null;
                const currentFieldLabel =
                    currentField.breadcrumbLabel || currentField.label || screenField.label;
                if (lastPath !== null && lastPath.match(/^[0-9]+$/) !== null) {
                    fieldItems.push({
                        label: `${
                            isMessage(currentFieldLabel)
                                ? intl.formatMessage(currentFieldLabel)
                                : currentFieldLabel
                        } #${parseInt(lastPath, 10) + 1}`,
                        url: `/${screenId}/${field}${form !== null ? `/${form}` : ''}`,
                        active: false,
                    });
                } else {
                    fieldItems.push({
                        label: currentFieldLabel,
                        url: `/${screenId}/${field}${form !== null ? `/${form}` : ''}`,
                        active: false,
                    });
                }
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
    }, [intl, screens, screenId, field, form, url, screensManager, fieldsManager]);

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
