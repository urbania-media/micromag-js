/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { isMessage } from '@micromag/core/utils';
import { Label } from '@micromag/core/components';
import { useScreensManager } from '@micromag/core/contexts';

import Screens from './Screens';

import styles from '../../styles/menus/screen-types.module.scss';

const propTypes = {
    screens: MicromagPropTypes.screenDefinitions,
    className: PropTypes.string,
    onClickItem: PropTypes.func,
};

const defaultProps = {
    screens: null,
    className: null,
    onClickItem: null,
};

const ScreenTypes = ({ screens, className, onClickItem }) => {
    const screensManager = useScreensManager();
    const finalDefinitions = screens || screensManager.getDefinitions();
    const groups = useMemo(
        () =>
            finalDefinitions.reduce((allGroups, definition) => {
                const { id, title, group = {} } = definition;
                const { id: messageId } = group;

                const { id: groupId, name: groupName } = isMessage(group)
                    ? { id: messageId || id, name: group }
                    : { id: messageId || id, name: title };
                const groupIndex = allGroups.findIndex((it) => it.id === groupId);
                const item = {
                    id,
                    type: id,
                    definition,
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
                              name: groupName,
                              items: [item],
                          },
                      ];
            }, []),
        [finalDefinitions],
    );
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
                                itemClassName={styles.item}
                                previewMinWidth={120}
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
