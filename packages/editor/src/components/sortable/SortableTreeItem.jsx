/* eslint-disable react/jsx-props-no-spreading */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { iOS } from '../../lib/utilities';
import { SortableTreeItemActions } from './SortableTreeItemActions';

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
    onCollapse: PropTypes.func,
    onClickItem: PropTypes.func,
};

const defaultProps = {
    component: null,
    value: null,
    style: null,
    smallScale: 0.75,
    onCollapse: null,
    onClickItem: null,
};

const animateLayoutChanges = ({ isSorting, wasDragging }) => !(isSorting || wasDragging);

export const SortableTreeItem = ({
    id,
    index,
    depth,
    component: Component,
    value,
    style: itemStyle,
    smallScale,
    onCollapse,
    onClickItem,
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

    const hasCollapse = onCollapse !== null;
    const { scaledWidth = 100, scaledHeight = 66, scale = 1 } = itemStyle;
    const extraHeight = hasCollapse ? 30 : 0;

    const actionsStyle = {
        width: depth === 0 ? scaledWidth : scaledWidth * smallScale,
        height: depth === 0 ? scaledHeight + extraHeight : scaledHeight * smallScale,
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const previewStyle = {
        width: itemStyle.width,
        height: itemStyle.height,
        transform:
            depth === 0
                ? itemStyle.transform
                : `scale(${scale * smallScale}, ${scale * smallScale})`,
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
            onCollapse={onCollapse}
            {...props}
        >
            {Component !== null ? <Component {...value} previewStyle={previewStyle} /> : null}
        </SortableTreeItemActions>
    );
};

SortableTreeItem.propTypes = propTypes;
SortableTreeItem.defaultProps = defaultProps;

export default SortableTreeItem;
