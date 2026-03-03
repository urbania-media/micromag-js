/* eslint-disable react/jsx-props-no-spreading */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';
import React, { useCallback, useRef } from 'react';

import { iOS } from '../../lib/utilities';

import SortableTreeItemActions from './SortableTreeItemActions';

import styles from '../../styles/sortable/sortable-tree-item.module.css';

const animateLayoutChanges = ({ isSorting, wasDragging }) => !(isSorting || wasDragging);

interface SortableTreeItemProps {
    id: string;
    index: number;
    depth: number;
    component?: (...args: unknown[]) => void;
    value?: Record<string, unknown>;
    style?: {
        width: number;
        height: number;
        scaledWidth: number;
        scaledHeight: number;
        transform: string;
        scale: number;
    };
    smallScale?: number;
    collapsed?: boolean;
    onCollapse?: (...args: unknown[]) => void;
    onClickItem?: (...args: unknown[]) => void;
    childValue?: Record<string, unknown>;
    isLastChild?: boolean;
}

function SortableTreeItem({
    id,
    index,
    depth,
    component: Component = null,
    value = null,
    style: itemStyle = null,
    smallScale = 0.75,
    collapsed = false,
    onCollapse = null,
    onClickItem = null,
    childValue = null,
    isLastChild = false,
    ...props
}) {
    const {
        attributes,
        isDragging,
        isSorting,
        listeners,
        setDraggableNodeRef,
        setDroppableNodeRef,
        transform,
        transition,
    } = useSortable({
        id,
        animateLayoutChanges,
    });

    const timeout = useRef(null);

    const actionsStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const { onPointerDown = null, onPointerUp = null } = listeners || {};
    const onClickAction = useCallback(
        (e) => {
            if (onClickItem !== null) {
                onClickItem(value, index);
            }
            if (onPointerDown !== null) {
                e.persist();
                timeout.current = setTimeout(() => {
                    if (onPointerDown !== null) {
                        onPointerDown(e);
                    }
                    timeout.current = null;
                }, 200);
            }
        },
        [value, index, onClickItem, onPointerDown],
    );
    const cancellingPointerUp = useCallback(
        (e) => {
            if (timeout.current !== null) {
                clearTimeout(timeout.current);
            }
            if (onPointerUp !== null) {
                onPointerUp(e);
            }
        },
        [onPointerUp],
    );

    return (
        <div className={classNames([styles.container])}>
            <SortableTreeItemActions
                ref={setDraggableNodeRef}
                wrapperRef={setDroppableNodeRef}
                style={actionsStyle}
                depth={depth}
                ghost={isDragging}
                disableSelection={iOS}
                disableInteraction={isSorting}
                handleProps={{
                    ...attributes,
                    ...listeners,
                    onPointerDown: onClickAction,
                    onPointerUp: cancellingPointerUp,
                }}
                collapsed={collapsed}
                onCollapse={onCollapse}
                {...props}
            >
                {Component !== null ? (
                    <div className={styles.parent}>
                        <Component {...value} />
                    </div>
                ) : null}
                {childValue !== null ? (
                    <div className={styles.child}>
                        <Component {...childValue} />
                    </div>
                ) : null}
            </SortableTreeItemActions>
        </div>
    );
}

export default SortableTreeItem;
