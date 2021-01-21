/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ComponentsProvider, SCREENS_NAMESPACE } from './ComponentsContext';
import { ScreensManager, PropTypes as MicromagPropTypes } from '../lib';

export const ScreensContext = React.createContext(new ScreensManager());

export const useScreensManager = () => useContext(ScreensContext);

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
