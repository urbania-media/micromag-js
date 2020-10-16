/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { isMessage } from '@micromag/core/utils';
import { Label } from '@micromag/core/components';
import { useScreens } from '@micromag/core/contexts';

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
    const contextScreens = useScreens();
    const finalScreens = screens || contextScreens;
    const groups = useMemo(
        () =>
            finalScreens.reduce((allGroups, screen) => {
                const { id, title, group = null } = screen;
                const { id: groupId, name: groupName } = isMessage(group)
                    ? { id: group.id, name: group }
                    : { id: group || id, name: group || title };
                const groupIndex = allGroups.findIndex((it) => it.id === groupId);
                return groupIndex !== -1
                    ? [
                          ...allGroups.slice(0, groupIndex),
                          {
                              ...allGroups[groupIndex],
                              items: [...allGroups[groupIndex].items, screen],
                          },
                          ...allGroups.slice(groupIndex + 1),
                      ]
                    : [
                          ...allGroups,
                          {
                              id: groupId,
                              name: groupName,
                              items: [screen],
                          },
                      ];
            }, []),
        [finalScreens],
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
                        <h4 className={styles.title}>
                            <Label>{name}</Label>
                        </h4>
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
