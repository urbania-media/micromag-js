/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';

import { withPanels } from '../../contexts';

import styles from '../../styles/panels/panels.module.css';

interface PanelsContainerProps {
    panels?: Panel[];
    setPanelsContainer?: (...args: unknown[]) => void;
    className?: string;
}

function PanelsContainer({ panels = [], setPanelsContainer = null, className = null }) {
    const containerRef = useRef(null);
    useEffect(() => {
        setPanelsContainer(containerRef.current);
    }, []);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
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
