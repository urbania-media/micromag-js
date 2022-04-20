/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { ScreensManager, PropTypes as MicromagPropTypes } from '../lib';
import { ComponentsProvider, SCREENS_NAMESPACE } from './ComponentsContext';

export const ScreensContext = React.createContext(new ScreensManager());

export const useScreensManager = () => useContext(ScreensContext);

const propTypes = {
    screens: MicromagPropTypes.screenDefinitions,
    namespaces: PropTypes.arrayOf(PropTypes.string),
    filterNamespaces: PropTypes.bool,
    manager: PropTypes.instanceOf(ScreensManager),
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    screens: null,
    namespaces: null,
    filterNamespaces: false,
    manager: null,
};

export const ScreensProvider = ({ screens, namespaces, filterNamespaces, manager, children }) => {
    const previousManager = useScreensManager();
    const finalManager = useMemo(() => {
        let newManager = manager !== null ? manager : new ScreensManager(screens);
        if ((previousManager || null) !== null) {
            newManager = previousManager.merge(newManager);
        }
        if (filterNamespaces) {
            newManager = previousManager.filter(
                ({ namespaces: screenGroups = null }) =>
                    screenGroups === null ||
                    (namespaces !== null &&
                        screenGroups.reduce(
                            (acc, id) => acc || namespaces.indexOf(id) !== -1,
                            false,
                        )),
            );
        }
        return newManager;
    }, [manager, screens, namespaces, filterNamespaces, previousManager]);

    const initialComponents = useMemo(() => finalManager.getComponents(), [finalManager]);
    const [components, setComponents] = useState(initialComponents);
    useEffect(() => {
        const onChange = () => setComponents(finalManager.getComponents());
        finalManager.on('change', onChange);
        return () => {
            finalManager.off('change', onChange);
        };
    }, [finalManager, setComponents]);

    return (
        <ScreensContext.Provider value={finalManager}>
            <ComponentsProvider namespace={SCREENS_NAMESPACE} components={components}>
                {children}
            </ComponentsProvider>
        </ScreensContext.Provider>
    );
};

ScreensProvider.propTypes = propTypes;
ScreensProvider.defaultProps = defaultProps;
