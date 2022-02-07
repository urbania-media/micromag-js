/* eslint-disable jsx-a11y/control-has-associated-label, react/jsx-props-no-spreading */
import { faAngleDown, faGripLines, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import styles from '../../styles/sortable/sortable-tree-item-actions.module.scss';

const propTypes = {
    childCount: PropTypes.number,
    clone: PropTypes.bool,
    collapsed: PropTypes.bool,
    depth: PropTypes.number.isRequired,
    disableInteraction: PropTypes.bool,
    disableSelection: PropTypes.bool,
    ghost: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    handleProps: PropTypes.any,
    indicator: PropTypes.bool,
    indentationWidth: PropTypes.number.isRequired,
    value: PropTypes.string,
    onCollapse: PropTypes.func,
    onRemove: PropTypes.func,
    onClick: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    wrapperRef: PropTypes.any,
    style: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        transform: PropTypes.string.isRequired,
    }),
    showId: PropTypes.bool,
    showCount: PropTypes.bool,
    children: PropTypes.node,
};

const defaultProps = {
    childCount: null,
    clone: false,
    collapsed: false,
    disableInteraction: false,
    disableSelection: false,
    ghost: false,
    handleProps: null,
    indicator: false,
    value: null,
    onCollapse: null,
    onRemove: null,
    onClick: null,
    wrapperRef: null,
    style: null,
    showId: false,
    showCount: false,
    children: null,
};

export const SortableTreeItemActions = forwardRef(
    (
        {
            childCount,
            clone,
            depth,
            disableSelection,
            disableInteraction,
            ghost,
            handleProps,
            indentationWidth,
            indicator,
            collapsed,
            onCollapse,
            onRemove,
            onClick,
            style,
            value,
            wrapperRef,
            showId,
            showCount,
            children,
            ...props
        },
        ref,
    ) => (
        <li
            className={classNames([
                styles.wrapper,
                {
                    [styles.clone]: clone,
                    [styles.ghost]: ghost,
                    [styles.indicator]: indicator,
                    [styles.disableSelection]: disableSelection,
                    [styles.disableInteraction]: disableInteraction,
                    [styles.withChildren]: onCollapse !== null,
                },
            ])}
            ref={wrapperRef}
            style={{
                marginLeft: `${indentationWidth * depth}px`,
                ...style,
            }}
            {...props}
        >
            <div className={styles.inner} ref={ref}>
                <button
                    className={classNames([styles.button, styles.handle])}
                    type="button"
                    {...handleProps}
                >
                    <FontAwesomeIcon className={styles.icon} icon={faGripLines} />
                </button>
                {!clone && onRemove ? (
                    <button type="button" onClick={onRemove}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                ) : null}
                {clone && showCount && childCount && childCount > 1 ? (
                    <span className={styles.count}>{childCount}</span>
                ) : null}
                {onCollapse && collapsed && childCount !== null && childCount > 0 ? (
                    <span className={styles.collapsedCount}>{childCount}</span>
                ) : null}
                {onCollapse && depth === 0 ? (
                    <button
                        type="button"
                        onClick={onCollapse}
                        className={classNames(
                            styles.button,
                            styles.collapse,
                            collapsed && styles.collapsed,
                        )}
                    >
                        <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                ) : null}
            </div>
            <div className={styles.children}>{children}</div>
        </li>
    ),
);

SortableTreeItemActions.propTypes = propTypes;
SortableTreeItemActions.defaultProps = defaultProps;

export default SortableTreeItemActions;
