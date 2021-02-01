/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import orderBy from 'lodash/orderBy';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { isMessage } from '@micromag/core/utils';
import { Label } from '@micromag/core/components';
import { useScreensManager } from '@micromag/core/contexts';

import Screens from './Screens';

import styles from '../../styles/menus/screen-types.module.scss';

const propTypes = {
    screens: MicromagPropTypes.screenDefinitions,
    selectedTypes: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    onClickItem: PropTypes.func,
};

const defaultProps = {
    screens: null,
    selectedTypes: null,
    className: null,
    onClickItem: null,
};

const ScreenTypes = ({ screens, selectedTypes, className, onClickItem }) => {
    const intl = useIntl();
    const screensManager = useScreensManager();
    const finalDefinitions = screens || screensManager.getDefinitions();
    const groups = useMemo(() => {
        const groupItems = finalDefinitions.reduce((allGroups, definition) => {
            const { id, title, group = {} } = definition;
            const { order = 0, label = {} } = group || {};
            const { id: messageId = null } = label || {};

            const { id: groupId, name: groupName } = isMessage(label)
                ? { id: messageId || id, name: group }
                : { id: messageId || id, name: title };

            const groupIndex = allGroups.findIndex((it) => it.id === groupId);
            const selected = selectedTypes !== null && selectedTypes.indexOf(id) !== -1;
            const item = {
                id,
                type: id,
                screen: definition,
                className: classNames({
                    'bg-light': selected,
                    'text-dark': selected,
                }),
            };
            return groupIndex !== -1
                ? [
                      ...allGroups.slice(0, groupIndex),
                      {
                          ...allGroups[groupIndex],
                          items: [...allGroups[groupIndex].items, item],
                      },
                      ...allGroups.slice(groupIndex + 1),
                  ]
                : [
                      ...allGroups,
                      {
                          id: groupId,
                          name: isMessage(label) ? intl.formatMessage(label) : groupName,
                          order,
                          items: [item],
                      },
                  ];
        }, []);

        return orderBy(groupItems, ['order', 'name'], ['asc', 'asc']);
    }, [finalDefinitions, selectedTypes]);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <div className={styles.rows}>
                {groups.map(({ id, name, items }) => (
                    <div key={`group-${id}`} className={styles.row}>
                        <Label>{name}</Label>
                        <div className={styles.layouts}>
                            <Screens
                                items={items}
                                withPlaceholder
                                itemClassName={classNames([
                                    'border',
                                    'rounded',
                                    {
                                        'border-secondary': selectedTypes === null,
                                        'border-dark': selectedTypes !== null,
                                        'bg-secondary': selectedTypes !== null,
                                        'text-secondary': selectedTypes !== null,
                                    },
                                ])}
                                previewMinWidth={100}
                                onClickItem={onClickItem}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ScreenTypes.propTypes = propTypes;
ScreenTypes.defaultProps = defaultProps;

export default ScreenTypes;
