/* eslint-disable react/jsx-props-no-spreading */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { iOS } from '../../lib/utilities';
import styles from '../../styles/sortable/sortable-tree-item.module.scss';
import SortableTreeItemActions from './SortableTreeItemActions';

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

    const actionsStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const { onPointerDown } = listeners || {};
    const onClickAction = useCallback(
        (e) => {
            if (onClickItem !== null) {
                onClickItem(value, index);
            }
            if (onPointerDown !== null) {
                onPointerDown(e);
            }
        },
        [value, index, onClickItem, onPointerDown],
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
                }}
                collapsed={collapsed}
                onCollapse={onCollapse}
                {...props}
            >
                {Component !== null ? <Component {...value} /> : null}
            </SortableTreeItemActions>
        </div>
    );
};

SortableTreeItem.propTypes = propTypes;
SortableTreeItem.defaultProps = defaultProps;

export default SortableTreeItem;
