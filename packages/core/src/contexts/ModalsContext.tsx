/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';

import { getDisplayName } from '../utils';

export const ModalsContext = React.createContext({
    container: null,
});

export const useModals = () => useContext(ModalsContext) || {};

export const withModals = (WrappedComponent) => {
    function WithModalsComponent(props) {
        return (
            <ModalsContext.Consumer>
                {({ modals, container, setContainer, register, unregister }) => (
                    <WrappedComponent
                        modalsContainer={container}
                        setModalsContainer={setContainer}
                        modals={modals}
                        registerModal={register}
                        unregisterModal={unregister}
                        {...props}
                    />
                )}
            </ModalsContext.Consumer>
        );
    }

    WithModalsComponent.displayName = `WithModals(${getDisplayName(WrappedComponent)})`;
    return WithModalsComponent;
};

interface ModalsProviderProps {
    children: React.ReactNode;
    container?: Record<string, unknown>;
}

export function ModalsProvider({ children, container: initialContainer = null }: ModalsProviderProps) {
    const [container, setContainer] = useState(initialContainer);
    const [modals, setModals] = useState([]);
    const modalsRef = useRef(modals);
    const register = useCallback(
        (id, data = null) => {
            const { current: currentModals } = modalsRef;
            const newModals = [
                ...currentModals,
                {
                    id,
                    ...data,
                },
            ];
            setModals(newModals);
            modalsRef.current = newModals;
        },
        [modals, setModals],
    );
    const unregister = useCallback(
        (id) => {
            const { current: currentModals } = modalsRef;
            const foundIndex = currentModals.findIndex(({ id: modalId }) => modalId === id);
            if (foundIndex !== -1) {
                const newModals = currentModals.filter(({ id: modalId }) => modalId !== id);
                setModals(newModals);
                modalsRef.current = newModals;
            }
        },
        [modals, setModals],
    );

    const value = useMemo(
        () => ({
            modals,
            container,
            setContainer,
            register,
            unregister,
        }),
        [modals, container, setContainer, register, unregister],
    );
    return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>;
}
