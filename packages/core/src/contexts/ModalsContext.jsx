/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import getDisplayName from '../utils/getDisplayName';

const ModalsContext = React.createContext({
    modals: [],
    openModal: () => {},
    updateModal: () => {},
    closeModal: () => {},
});

export const useModals = () => useContext(ModalsContext);

export const withModals = WrappedComponent => {
    const WithModalsComponent = props => (
        <ModalsContext.Consumer>
            {({ modals, openModal, updateModal, closeModal }) => (
                <WrappedComponent
                    modals={modals}
                    openModal={openModal}
                    updateModal={updateModal}
                    closeModal={closeModal}
                    {...props}
                />
            )}
        </ModalsContext.Consumer>
    );
    WithModalsComponent.displayName = `WithModals(${getDisplayName(WrappedComponent)})`;
    return WithModalsComponent;
};

const propTypes = {
    children: PropTypes.node.isRequired,
};

const defaultProps = {};

export const ModalsProvider = ({ children }) => {
    const [modals, setModals] = useState([]);

    const openModal = useCallback(
        (name, props, options = null) =>
            setModals([
                ...modals,
                {
                    name,
                    props,
                    ...options,
                },
            ]),
        [modals, setModals],
    );

    const updateModal = useCallback(
        (name, props, options = null) => {
            const foundIndex = modals.findIndex(({ name: modalName }) => modalName === name);
            if (foundIndex !== -1) {
                const { props: currentProps = null, ...currentOptions } = modals[foundIndex];
                setModals([
                    ...modals.slice(0, foundIndex),
                    {
                        ...currentOptions,
                        props: {
                            ...currentProps,
                            ...props,
                        },
                        ...options,
                    },
                    ...modals.slice(foundIndex + 1),
                ]);
            }
        },
        [modals, setModals],
    );

    const closeModal = useCallback(
        name => {
            const foundIndex = modals.findIndex(({ name: modalName }) => modalName === name);
            if (foundIndex !== -1) {
                setModals(modals.filter(({ name: modalName }) => modalName !== name));
            }
        },
        [modals, setModals],
    );

    const contextValue = useMemo(() => ({ modals, openModal, closeModal, updateModal }), [
        modals,
        openModal,
        closeModal,
        updateModal,
    ]);

    return <ModalsContext.Provider value={contextValue}>{children}</ModalsContext.Provider>;
};

ModalsProvider.propTypes = propTypes;
ModalsProvider.defaultProps = defaultProps;

export default ModalsContext;
