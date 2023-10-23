/* eslint-disable react/jsx-props-no-spreading */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';

import { iOS } from '../../lib/utilities';

import SortableTreeItemActions from './SortableTreeItemActions';

import styles from '../../styles/sortable/sortable-tree-item.module.scss';

const propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    depth: PropTypes.number.isRequired,
    component: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.object,
    style: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        scaledWidth: PropTypes.number.isRequired,
        scaledHeight: PropTypes.number.isRequired,
        transform: PropTypes.string.isRequired,
        scale: PropTypes.number.isRequired,
    }),
    smallScale: PropTypes.number,
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
    onClickItem: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    childValue: PropTypes.object,
    isLastChild: PropTypes.bool,
};

const defaultProps = {
    component: null,
    value: null,
    style: null,
    smallScale: 0.75,
    collapsed: false,
    onCollapse: null,
    onClickItem: null,
    childValue: null,
    isLastChild: false,
};

const animateLayoutChanges = ({ isSorting, wasDragging }) => !(isSorting || wasDragging);

const SortableTreeItem = ({
    id,
    index,
    depth,
    component: Component,
    value,
    style: itemStyle,
    smallScale,
    collapsed,
    onCollapse,
    onClickItem,
    childValue,
    isLastChild,
    ...props
}) => {
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
};

SortableTreeItem.propTypes = propTypes;
SortableTreeItem.defaultProps = defaultProps;

export default SortableTreeItem;
