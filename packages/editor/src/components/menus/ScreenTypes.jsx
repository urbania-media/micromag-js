/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import orderBy from 'lodash/orderBy';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label } from '@micromag/core/components';
import { useScreensManager } from '@micromag/core/contexts';
import { isMessage } from '@micromag/core/utils';
import styles from '../../styles/menus/screen-types.module.scss';
import ScreensMenu from './ScreensMenu';

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
            const { order = 0, label = {}, hidden = false } = group || {};
            const { id: messageId = null } = label || {};

            if (hidden) {
                return allGroups;
            }

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
                    'bg-secondary': !selected,
                    'bg-primary': selected,
                    [styles.selected]: selected,
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
                            <ScreensMenu
                                items={items}
                                withPlaceholder
                                itemClassName={classNames([
                                    styles.screen,
                                    'border',
                                    'rounded',
                                    {
                                        'border-secondary': selectedTypes === null,
                                        'border-dark': selectedTypes !== null,
                                        'bg-secondary': selectedTypes === null,
                                        'text-secondary': selectedTypes !== null,
                                    },
                                ])}
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
