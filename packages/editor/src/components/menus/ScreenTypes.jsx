/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useSchemasRepository, SCREENS_NAMESPACE } from '@micromag/schemas';

import Screens from './Screens';

import styles from '../../styles/menus/screen-types.module.scss';

const propTypes = {
    types: MicromagPropTypes.screenTypes,
    className: PropTypes.string,
    onClickItem: PropTypes.func,
};

const defaultProps = {
    types: null,
    className: null,
    onClickItem: null,
};

const ScreenTypes = ({ types, className, onClickItem }) => {
    const repository = useSchemasRepository();
    const contextTypes = useMemo(() => {
        const screenSchemas = repository.getSchemas(SCREENS_NAMESPACE);
        return screenSchemas
            .filter(it => it.$id.match(/\/screen\.json$/) === null)
            .map(schema => {
                const id = schema.$id.match(/\/([^./]+)\.json$/i)[1];
                return {
                    id,
                    name: schema.title,
                    group: schema.group || null,
                };
            });
    }, [repository]);
    const finalTypes = types || contextTypes;
    const groups = useMemo(
        () =>
            finalTypes.reduce((allGroups, type) => {
                const { group = null, name = null, id = null } = type;
                const groupId = group || id;
                const groupName = group || name;
                const groupIndex = allGroups.findIndex(it => it.id === groupId);
                const item = {
                    ...type,
                    type: type.id,
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
        [finalTypes],
    );
    console.log(groups);
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
                        <h4 className={styles.title}>{name}</h4>
                        <div className={styles.layouts}>
                            <Screens
                                items={items}
                                withPlaceholder
                                itemClassName={styles.item}
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
