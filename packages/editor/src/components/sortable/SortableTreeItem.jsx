/* eslint-disable react/jsx-props-no-spreading */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { iOS } from '../../lib/utilities';
import { SortableTreeItemActions } from './SortableTreeItemActions';

const propTypes = {
    id: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    component: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    screenValue: PropTypes.object,
    style: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        scaledWidth: PropTypes.number.isRequired,
        scaledHeight: PropTypes.number.isRequired,
        transform: PropTypes.string.isRequired,
        scale: PropTypes.number.isRequired,
    }),
    onCollapse: PropTypes.func,
    onClick: PropTypes.func,
};

const defaultProps = {
    component: null,
    screenValue: null,
    style: null,
    onCollapse: null,
    onClick: null,
};

const animateLayoutChanges = ({ isSorting, wasDragging }) => !(isSorting || wasDragging);

export const SortableTreeItem = ({
    id,
    depth,
    component: Component,
    screenValue,
    style: itemStyle,
    onCollapse,
    onClick,
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
        width: depth === 0 ? scaledWidth : scaledWidth * 0.75,
        height: depth === 0 ? scaledHeight + extraHeight : scaledHeight * 0.75,
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const previewStyle = {
        width: itemStyle.width,
        height: itemStyle.height,
        transform: depth === 0 ? itemStyle.transform : `scale(${scale * 0.75}, ${scale * 0.75})`,
        transformOrigin: 'top left',
    };

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
            }}
            onCollapse={onCollapse}
            onClick={onClick}
            {...props}
        >
            {Component !== null ? <Component {...screenValue} previewStyle={previewStyle} /> : null}
        </SortableTreeItemActions>
    );
};

SortableTreeItem.propTypes = propTypes;
SortableTreeItem.defaultProps = defaultProps;

export default SortableTreeItem;
