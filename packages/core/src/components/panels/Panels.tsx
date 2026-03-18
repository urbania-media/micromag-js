/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

import { withPanels } from '../../contexts';

import styles from '../../styles/panels/panels.module.css';

const emptyArray: never[] = [];

interface PanelsContainerProps {
    panels?: Panel[];
    setPanelsContainer?: ((...args: unknown[]) => void) | null;
    className?: string | null;
}

function PanelsContainer({
    panels = emptyArray,
    setPanelsContainer = null,
    className = null,
}: PanelsContainerProps) {
    const containerRef = useRef(null);
    useEffect(() => {
        setPanelsContainer(containerRef.current);
    }, []);
    return (
        <div
            className={classNames([
                styles.container,
                className,
            ])}
        >
            <div
                className={classNames([
                    styles.panels,
                    {
                        [styles.hasPanels]: panels.length > 0,
                    },
                ])}
                ref={containerRef}
            />
        </div>
    );
}

export default withPanels(PanelsContainer);
