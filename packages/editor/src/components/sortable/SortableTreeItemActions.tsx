import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faGripLines } from '@fortawesome/free-solid-svg-icons/faGripLines';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ForwardedRef, ReactNode } from 'react';

import styles from '../../styles/sortable/sortable-tree-item-actions.module.css';

interface SortableTreeItemActionsProps {
    childCount?: number;
    clone?: boolean;
    collapsed?: boolean;
    depth: number;
    disableInteraction?: boolean;
    disableSelection?: boolean;
    ghost?: boolean;
    handleProps?: unknown;
    indicator?: boolean;
    indentationWidth: number;
    value?: string;
    onCollapse?: (...args: unknown[]) => void;
    onRemove?: (...args: unknown[]) => void;
    onClick?: (...args: unknown[]) => void;
    wrapperRef?: unknown;
    style?: { width: number; height: number; transform: string };
    showId?: boolean;
    showCount?: boolean;
    showCollapsedCount?: boolean;
    children?: ReactNode;
    ref?: ForwardedRef<HTMLDivElement> | null;
}

const SortableTreeItemActions = function ({
    childCount = null,
    clone = false,
    depth,
    disableSelection = false,
    disableInteraction = false,
    ghost = false,
    handleProps = null,
    indentationWidth,
    indicator = false,
    collapsed = false,
    onCollapse = null,
    onRemove = null,
    onClick = null,
    style = null,
    value = null,
    wrapperRef = null,
    showId = false,
    showCount = false,
    showCollapsedCount = false,
    children = null,
    ref: containerRef = null,
    ...props
}: SortableTreeItemActionsProps) {
    return (
        <div
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
                marginRight: `${5 * depth}px`,
            }}
            {...props}
        >
            <div className={styles.inner} ref={containerRef} style={style}>
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
                {showCollapsedCount &&
                onCollapse &&
                collapsed &&
                childCount !== null &&
                childCount > 0 ? (
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
                <div className={styles.children}>{children}</div>
            </div>
        </div>
    );
};

export default SortableTreeItemActions;
