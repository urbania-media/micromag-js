/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

import { withModals } from '../../contexts';

import styles from '../../styles/modals/modals.module.css';

interface ModalsContainerProps {
    modals: Modal[];
    setModalsContainer: (...args: unknown[]) => void;
    className?: string | null;
}

function ModalsContainer({ modals, setModalsContainer, className = null }: ModalsContainerProps) {
    const containerRef = useRef(null);
    useEffect(() => {
        setModalsContainer(containerRef.current);
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
                    styles.modals,
                    {
                        [styles.hasModals]: modals.length > 0,
                    },
                ])}
                ref={containerRef}
            />
        </div>
    );
}

export default withModals(ModalsContainer);
