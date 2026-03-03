/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
interface ElementPortalProps {
    id?: string;
    data?: Record<string, unknown>;
    container?: Record<string, unknown>;
    register?: (...args: unknown[]) => void;
    unregister?: (...args: unknown[]) => void;
    children?: React.ReactNode;
}

function ElementPortal(
    { id = null, data = null, children = null, container = null, register = null, unregister = null },
) {
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
