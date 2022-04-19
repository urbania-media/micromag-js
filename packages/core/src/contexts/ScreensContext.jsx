/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { ScreensManager, PropTypes as MicromagPropTypes } from '../lib';
import { ComponentsProvider, SCREENS_NAMESPACE } from './ComponentsContext';

export const ScreensContext = React.createContext(new ScreensManager());

export const useScreensManager = () => useContext(ScreensContext);

const propTypes = {
    screens: MicromagPropTypes.screenDefinitions,
    withoutCustomScreens: PropTypes.bool,
    customScreens: PropTypes.arrayOf(PropTypes.string),
    manager: PropTypes.instanceOf(ScreensManager),
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    screens: null,
    withoutCustomScreens: false,
    customScreens: null,
    manager: null,
};

export const ScreensProvider = ({
    screens,
    customScreens,
    withoutCustomScreens,
    manager,
    children,
}) => {
    const previousManager = useScreensManager();
    const finalManager = useMemo(() => {
        let newManager = manager !== null ? manager : new ScreensManager(screens);
        if ((previousManager || null) !== null) {
            newManager = previousManager.merge(newManager);
        }
        if (withoutCustomScreens) {
            newManager = previousManager.filter(
                ({ id, custom = false }) =>
                    !custom || (customScreens !== null && customScreens.indexOf(id) !== -1),
            );
        }
        return newManager;
    }, [manager, screens, customScreens, withoutCustomScreens, previousManager]);

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
