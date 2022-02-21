import { arrayMove } from '@dnd-kit/sortable';

export const iOS = /iPad|iPhone|iPod/.test(navigator.platform);

export function getDragDepth(offset, indentationWidth) {
    return Math.round(offset / indentationWidth);
}

export function getMaxDepth({ previousItem }) {
    if (previousItem) {
        // return previousItem.depth + 1;
        return 1;
    }
    return 0;
}

export function getMinDepth({ nextItem }) {
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

export function findItem(items, itemId) {
    return items.find(({ id }) => id === itemId);
}

export function buildTree(flattenedItems) {
    const root = { id: 'root', children: [] };
    const nodes = { [root.id]: root };
    const items = flattenedItems.map((item) => ({ ...item, children: [] }));

    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
        const { id, children } = item;
        const parentId = item.parentId ?? root.id;
        const parent = nodes[parentId] ?? findItem(items, parentId);
        nodes[id] = { id, children };
        parent.children.push(item);
    }

    return root.children;
}

export function findItemDeep(items, itemId) {
    for (let i = 0; i < items.length; i += 1) {
        const item = items[i] || {};
        const { id, children = [] } = item;
        if (id === itemId) {
            return item;
        }
        if (children.length > 0) {
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

    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
        if (item.id === id) {
            // eslint-disable-next-line no-continue
            continue;
        }

        if (item.children.length) {
            item.children = removeItem(item.children, id);
        }

        newItems.push(item);
    }

    return newItems;
}

export function setProperty(items, id, property, setter) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
        if (item.id === id) {
            item[property] = setter(item[property]);
            // eslint-disable-next-line no-continue
            continue;
        }

        if (item.children.length) {
            item.children = setProperty(item.children, id, property, setter);
        }
    }

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

export const arrayEquals = (arrayA, arrayB) => {
    if (!arrayA || !arrayB) return false;

    if (arrayA.length !== arrayB.length) return false;

    for (let i = 0, l = arrayA.length; i < l; i += 1) {
        if (arrayA[i] instanceof Array && arrayB[i] instanceof Array) {
            // recurse into the nested arrays
            if (!arrayEquals(arrayA[i], arrayB[i])) {
                return false;
            }
        } else if (arrayA[i] !== arrayB[i]) {
            return false;
        }
    }
    return true;
};
