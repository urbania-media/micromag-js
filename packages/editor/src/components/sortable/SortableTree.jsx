import {
    closestCenter,
    defaultDropAnimation,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    MeasuringStrategy,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { sortableTreeKeyboardCoordinates } from '../../lib/keyboardCoordinates';
import {
    buildTree,
    flattenTree,
    getChildCount,
    getProjection,
    removeChildrenOf,
    removeItem,
    setProperty,
    getMaxDepth,
} from '../../lib/utilities';
import styles from '../../styles/sortable/sortable-tree.module.scss';
import { SortableTreeItem } from './SortableTreeItem';

const initialItems = [
    {
        id: 'Home',
        children: [],
    },
    {
        id: 'Collections',
        children: [
            { id: 'Spring', children: [] },
            { id: 'Summer', children: [] },
            { id: 'Fall', children: [] },
            { id: 'Winter', children: [] },
        ],
    },
    {
        id: 'About Us',
        children: [],
    },
    {
        id: 'My Account',
        children: [
            { id: 'Addresses', children: [] },
            { id: 'Order History', children: [] },
        ],
    },
];

const measuring = {
    droppable: {
        strategy: MeasuringStrategy.Always,
    },
};

const dropAnimation = {
    ...defaultDropAnimation,
    dragSourceOpacity: 0.5,
};

const adjustTranslate = ({ transform }) => ({
    ...transform,
    y: transform.y - 25,
});

const propTypes = {
    collapsible: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    items: PropTypes.array,
    indentationWidth: PropTypes.number,
    indicator: PropTypes.bool,
    removable: PropTypes.bool,
    component: PropTypes.func,
    itemStyle: PropTypes.shape({}),
    onClickItem: PropTypes.func,
    onChange: PropTypes.func,
};

const defaultProps = {
    collapsible: true,
    items: initialItems,
    indentationWidth: 30,
    indicator: false,
    removable: false,
    component: null,
    itemStyle: null,
    onClickItem: null,
    onChange: null,
};

export const SortableTree = ({
    collapsible,
    items: defaultItems,
    indicator,
    indentationWidth,
    removable,
    component,
    itemStyle,
    onClickItem,
    onChange,
}) => {
    const [items, setItems] = useState(() => defaultItems);
    const [activeId, setActiveId] = useState(null);
    const [overId, setOverId] = useState(null);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(null);

    const flattenedItems = useMemo(() => {
        const flattenedTree = flattenTree(items);
        // console.log('yo', items, flattenedTree);
        const collapsedItems =
            flattenedTree.reduce(
                (acc, { children = [], collapsed, id }) =>
                    collapsed && children.length ? [...acc, id] : acc,
                [],
            ) || null;

        return removeChildrenOf(
            flattenedTree,
            activeId ? [activeId, ...collapsedItems] : collapsedItems,
        );
    }, [activeId, items]);

    const projected =
        activeId && overId
            ? getProjection(flattenedItems, activeId, overId, offsetLeft, indentationWidth)
            : null;

    const sensorContext = useRef({
        items: flattenedItems,
        offset: offsetLeft,
    });

    const [coordinateGetter] = useState(() =>
        sortableTreeKeyboardCoordinates(sensorContext, indentationWidth),
    );

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter,
        }),
    );

    const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [flattenedItems]);

    const activeItem = activeId ? flattenedItems.find(({ id }) => id === activeId) : null;

    useEffect(() => {
        sensorContext.current = {
            items: flattenedItems,
            offset: offsetLeft,
        };
    }, [flattenedItems, offsetLeft]);

    const announcements = useMemo(
        () => ({
            onDragStart(id) {
                return `Picked up ${id}.`;
            },
            onDragMove(id, currentOverId) {
                return getMovementAnnouncement('onDragMove', id, currentOverId);
            },
            onDragOver(id, currentOverId) {
                return getMovementAnnouncement('onDragOver', id, currentOverId);
            },
            onDragEnd(id, currentOverId) {
                // console.log('drag end', flattenedItems);
                if (onChange !== null) {
                    onChange(
                        (flattenedItems || []).map(
                            ({
                                id: itemId,
                                children = [],
                                parentId = null,
                                collapsed = false,
                            }) => ({
                                id: itemId,
                                props: {
                                    ...((children || []).length > 0
                                        ? {
                                              group: {
                                                  collapsed,
                                                  mergeNavItems: true,
                                              },
                                          }
                                        : {
                                              group: null,
                                          }),
                                    ...(parentId !== null ? { parentId } : { parentId: null }),
                                },
                            }),
                        ),
                    );
                }
                return getMovementAnnouncement('onDragEnd', id, currentOverId);
            },
            onDragCancel(id) {
                return `Moving was cancelled. ${id} was dropped in its original position.`;
            },
        }),
        [flattenedItems, onChange],
    );

    // Initial tree setup from list
    useEffect(() => {
        // console.log('fuck off');
        setItems(buildTree(defaultItems));
    }, []);

    const activeValue = defaultItems.find(({ id: defaultId = null }) => defaultId === activeId);

    return (
        <DndContext
            announcements={announcements}
            sensors={sensors}
            collisionDetection={closestCenter}
            measuring={measuring}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
                {flattenedItems.map(({ id, children = [], collapsed, depth }, idx) => {
                    const screenValue = defaultItems.find(
                        ({ id: defaultId = null }) => defaultId === id,
                    );
                    const next = flattenedItems[idx + 1]?.parentId || null;
                    const isCollapsed = collapsed && children.length > 0;
                    const onCollapse =
                        collapsible && children.length ? () => handleCollapse(id) : null;
                    const currentDepth = id === activeId && projected ? projected.depth : depth;
                    return (
                        <div
                            className={classNames([
                                styles.item,
                                {
                                    [styles.parent]: onCollapse !== null && !collapsed,
                                    [styles.group]: depth === 1,
                                    [styles.isLastChild]: next === null,
                                },
                            ])}
                            key={id}
                        >
                            <SortableTreeItem
                                key={id}
                                id={id}
                                depth={currentDepth}
                                indentationWidth={indentationWidth}
                                indicator={indicator}
                                collapsed={isCollapsed}
                                onCollapse={onCollapse}
                                onRemove={removable ? () => handleRemove(id) : undefined}
                                childCount={getChildCount(items, id)}
                                component={component}
                                value={screenValue?.value || null}
                                style={itemStyle}
                                onClickItem={onClickItem}
                                index={idx}
                            />
                        </div>
                    );
                })}
                {createPortal(
                    <DragOverlay
                        dropAnimation={dropAnimation}
                        modifiers={indicator ? [adjustTranslate] : undefined}
                    >
                        {activeId && activeItem ? (
                            <div className={styles.item} key={activeId}>
                                <SortableTreeItem
                                    id={activeId}
                                    depth={activeItem.depth}
                                    clone
                                    childCount={getChildCount(items, activeId) + 1}
                                    indentationWidth={indentationWidth}
                                    component={component}
                                    value={activeValue?.value}
                                    onClickItem={onClickItem}
                                    index={flattenedItems.findIndex(({ id }) => activeId === id)}
                                    style={itemStyle}
                                />
                            </div>
                        ) : null}
                    </DragOverlay>,
                    document.body,
                )}
            </SortableContext>
        </DndContext>
    );

    function handleDragStart({ active: { id: newActiveId } }) {
        setActiveId(newActiveId);
        setOverId(newActiveId);

        const newActiveItem = flattenedItems.find(({ id }) => id === newActiveId);

        if (newActiveItem) {
            setCurrentPosition({
                parentId: newActiveItem.parentId,
                overId: activeId,
            });
        }

        document.body.style.setProperty('cursor', 'grabbing');
    }

    function handleDragMove({ delta }) {
        setOffsetLeft(delta.x);
    }

    function handleDragOver({ over }) {
        setOverId(over?.id ?? null);
    }

    function resetState() {
        setOverId(null);
        setActiveId(null);
        setOffsetLeft(0);
        setCurrentPosition(null);

        document.body.style.setProperty('cursor', '');
    }

    function handleDragEnd({ active, over }) {
        resetState();

        if (projected && over) {
            const { depth, parentId } = projected;
            const clonedItems = JSON.parse(JSON.stringify(flattenTree(items)));
            const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
            const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
            const activeTreeItem = clonedItems[activeIndex];
            const maxDepth = getMaxDepth(activeTreeItem);

            // Un-merge and flatten
            if (
                depth > 0 &&
                depth >= maxDepth &&
                activeTreeItem?.children !== null &&
                activeTreeItem.children.length > 0
            ) {
                for (let i = 0; i < activeTreeItem.children.length; i += 1) {
                    const { id: childId } = activeTreeItem.children[i];
                    const childIndex = clonedItems.findIndex(({ id }) => id === childId);
                    clonedItems[childIndex].parentId = parentId;
                    clonedItems[childIndex].depth = depth;
                }
                activeTreeItem.children = [];
            }

            clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

            const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
            const newItems = buildTree(sortedItems);

            setItems(newItems);
        }
    }

    function handleDragCancel() {
        resetState();
    }

    function handleRemove(id) {
        setItems((newItems) => removeItem(newItems, id));
    }

    function handleCollapse(id) {
        setItems((newItems) => setProperty(newItems, id, 'collapsed', (value) => !value));
    }

    function getMovementAnnouncement(eventName, currentActiveId, currentOverId) {
        if (currentOverId && projected) {
            if (eventName !== 'onDragEnd') {
                if (
                    currentPosition &&
                    projected.parentId === currentPosition.parentId &&
                    currentOverId === currentPosition.overId
                ) {
                    return;
                }
                setCurrentPosition({
                    parentId: projected.parentId,
                    overId: currentOverId,
                });
            }

            const clonedItems = JSON.parse(JSON.stringify(flattenTree(items)));
            const overIndex = clonedItems.findIndex(({ id }) => id === currentOverId);
            const activeIndex = clonedItems.findIndex(({ id }) => id === currentActiveId);
            const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

            const previousItem = sortedItems[overIndex - 1];

            let newAnnouncement;
            const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
            const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

            if (!previousItem) {
                const nextItem = sortedItems[overIndex + 1] || null;
                newAnnouncement = nextItem !== null ? `${currentActiveId} was ${movedVerb} before ${nextItem.id}.` : null;
            } else if (projected.depth > previousItem.depth) {
                newAnnouncement = `${currentActiveId} was ${nestedVerb} under ${previousItem.id}.`;
            } else {
                let previousSibling = previousItem;
                while (previousSibling && projected.depth < previousSibling.depth) {
                    const { parentId } = previousSibling;
                    previousSibling = sortedItems.find(({ id }) => id === parentId);
                }

                if (previousSibling) {
                    newAnnouncement = `${currentActiveId} was ${movedVerb} after ${previousSibling.id}.`;
                }
            }

            // eslint-disable-next-line consistent-return
            return newAnnouncement;
        }
    }
};

SortableTree.propTypes = propTypes;
SortableTree.defaultProps = defaultProps;

export default SortableTree;
