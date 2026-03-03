/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface ElementPortalProps {
    id?: string | null;
    data?: Record<string, unknown> | null;
    container?: Record<string, unknown> | null;
    register?: ((...args: unknown[]) => void) | null;
    unregister?: ((...args: unknown[]) => void) | null;
    children?: React.ReactNode | null;
}

function ElementPortal({
    id = null,
    data = null,
    children = null,
    container = null,
    register = null,
    unregister = null,
}: ElementPortalProps) {
    const finalId = useMemo(() => id || `element-${new Date().getTime()}`, [id]);
    useEffect(() => {
        if (register !== null) {
            register(finalId, data);
        }
        return () => {
            if (unregister !== null) {
                unregister(finalId);
            }
        };
    }, [finalId, data]);
    return container !== null ? createPortal(children, container) : null;
}

export default ElementPortal;
