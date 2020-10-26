/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as MicromagPropTypes from '../PropTypes';
import { ComponentsProvider, SCREENS_NAMESPACE } from './ComponentsContext';
import ScreensManager from '../lib/ScreensManager';

export const ScreensContext = React.createContext(new ScreensManager());

export const useScreensManager = () => useContext(ScreensContext);

export const useScreens = () => {
    const manager = useScreensManager();
    return manager.getScreens();
};

export const useScreen = (id) => {
    const manager = useScreensManager();
    return manager.getScreen(id);
};

export const useScreenFields = (id) => {
    const { fields = [] } = useScreen(id);
    return fields;
};

const propTypes = {
    screens: MicromagPropTypes.screenDefinitions,
    manager: PropTypes.instanceOf(ScreensManager),
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    screens: null,
    manager: null,
};

export const ScreensProvider = ({ screens, manager, children }) => {
    const previousManager = useScreensManager();
    const finalManager = useMemo(() => {
        const newManager = manager !== null ? manager : new ScreensManager(screens);
        if ((previousManager || null) !== null) {
            return previousManager.merge(newManager);
        }
        return newManager;
    }, [manager, screens, previousManager]);

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

export default ScreensContext;
