import { arrayMove } from '@dnd-kit/sortable';

export const iOS = /iPad|iPhone|iPod/.test(navigator.platform);

function getDragDepth(offset, indentationWidth) {
    return Math.round(offset / indentationWidth);
}

function getMaxDepth({ previousItem }) {
    if (previousItem) {
        // return previousItem.depth + 1;
        return 1;
    }
    return 0;
}

function getMinDepth({ nextItem }) {
    if (nextItem) {
        // return nextItem.depth;
        return 0;
    }
    return 0;
}

export function getProjection(items, activeId, overId, dragOffset, indentationWidth) {
    const overItemIndex = items.findIndex(({ id }) => id === overId);
    const activeItemIndex = items.findIndex(({ id }) => id === activeId);
    const activeItem = items[activeItemIndex];
    const newItems = arrayMove(items, activeItemIndex, overItemIndex);
    const previousItem = newItems[overItemIndex - 1];
    const nextItem = newItems[overItemIndex + 1];
    const dragDepth = getDragDepth(dragOffset, indentationWidth);
    const projectedDepth = activeItem.depth + dragDepth;
    const maxDepth = getMaxDepth({
        previousItem,
    });
    const minDepth = getMinDepth({ nextItem });
    let depth = projectedDepth;

    if (projectedDepth >= maxDepth) {
        depth = maxDepth;
    } else if (projectedDepth < minDepth) {
        depth = minDepth;
    }

    function getParentId() {
        if (depth === 0 || !previousItem) {
            return null;
        }

        if (depth === previousItem.depth) {
            return previousItem.parentId;
        }

        if (depth > previousItem.depth) {
            return previousItem.id;
        }

        const newParent = newItems
            .slice(0, overItemIndex)
            .reverse()
            .find((item) => item.depth === depth)?.parentId;

        return newParent ?? null;
    }

    return { depth, maxDepth, minDepth, parentId: getParentId() };
}

function flatten(items, parentId = null, depth = 0) {
    return items.reduce(
        (acc, item, index) => [
            ...acc,
            {
                ...item,
                parentId: item.parentId || parentId,
                depth: item.parentId ? 1 : 0,
                index,
            },
            ...flatten(item.children || [], item.id, depth + 1),
        ],
        [],
    );
}

export function flattenTree(items) {
    return flatten(items);
}

export function buildTree(flattenedItems) {
    const items = flattenedItems.map((item) => ({ ...item, children: [] }));
    const nodeList = items.reduce((acc, item) => {
        const { parentId = null } = item;
        if (parentId) {
            let found = false;
            const newList = acc.map((it) => {
                if (it.id === parentId) {
                    found = true;
                    return {
                        ...it,
                        children: [...it.children, { ...item }],
                    };
                }
                return it;
            });
            if (found) {
                return newList;
            }
            acc.push({ ...(items.find(({ id }) => id === parentId) || null), children: [item] });
            return acc;
        }
        acc.push(item);
        return acc;
    }, []);
    return nodeList;
}

export function findItem(items, itemId) {
    return items.find(({ id }) => id === itemId);
}

export function findItemDeep(items, itemId) {
    for (let i = 0; i < items.length - 1; i += 1) {
        const item = items[i] || {};
        const { id, children = [] } = item;

        if (id === itemId) {
            return item;
        }

        if (children.length) {
            const child = findItemDeep(children, itemId);

            if (child) {
                return child;
            }
        }
    }

    return undefined;
}

export function removeItem(items, id) {
    const newItems = [];

    for (let i = 0; i < items.length - 1; i += 1) {
        const item = items[i] || {};
        if (item.id === id) {
            // eslint-disable-next-line no-continue
            continue;
        }

        if (item.children.length) {
            item.children = removeItem(item.children || [], id);
        }

        newItems.push(item);
    }

    return newItems;
}

export function setProperty(items, id, property, setter) {
    //  console.log('items', items);
    const newItems = [];
    // for (let i = 0; i < items.length - 1; i += 1) {
    //     const item = items[i];
    //     if (item.id === id) {
    //         item[property] = setter(item[property]);
    //         newItems.push({ ...item });
    //     } else {
    //         const { children = [] } = item;
    //         let newChildren = [];
    //         if (children.length > 0) {
    //             newChildren = setProperty(children, id, property, setter);
    //         }
    //         newItems.push({ ...item, children: newChildren });
    //     }
    // }

    for (const item of items) {
        if (item.id === id) {
            item[property] = setter(item[property]);
            continue;
        }

        const { children = [] } = item;

        if (children.length) {
            children = setProperty(children, id, property, setter);
        }
    }

    // console.log('fubar', items, newItems);

    // return newItems;
    return [...items];
}

function countChildren(items, count = 0) {
    return items.reduce((acc, { children = [] }) => {
        if (children.length) {
            return countChildren(children, acc + 1);
        }

        return acc + 1;
    }, count);
}

export function getChildCount(items, id) {
    if (!id) {
        return 0;
    }

    const item = findItemDeep(items, id);

    return item ? countChildren(item.children || []) : 0;
}

export function removeChildrenOf(items, ids) {
    const excludeParentIds = [...ids];

    return items.filter((item) => {
        if (item.parentId && excludeParentIds.includes(item.parentId)) {
            const { children = [] } = item;
            if (children.length) {
                excludeParentIds.push(item.id);
            }
            return false;
        }

        return true;
    });
}
