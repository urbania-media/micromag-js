/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import * as MicromagPropTypes from '../PropTypes';
import { ComponentsProvider, SCREENS_NAMESPACE } from './ComponentsContext';

export const ScreensContext = React.createContext([]);

export const useScreens = () => useContext(ScreensContext);

export const useScreen = (id) => {
    const screens = useScreens();
    return screens.find((it) => it.id === id) || null;
};

const propTypes = {
    screens: MicromagPropTypes.screenDefinitions.isRequired,
    children: PropTypes.node.isRequired,
};

const defaultProps = {};

export const ScreensProvider = ({ children, screens }) => {
    const previousScreens = useScreens();
    const finalScreens = useMemo(() => {
        const screenIds = screens.map(({ id }) => id);
        return [
            ...(previousScreens || []).filter(({ id }) => screenIds.indexOf(id) === -1),
            ...screens,
        ];
    }, [previousScreens, screens]);
    const components = useMemo(
        () =>
            finalScreens.reduce(
                (allComponents, { id, component }) => ({
                    ...allComponents,
                    [id]: component,
                }),
                {},
            ),
        [finalScreens],
    );
    return (
        <ScreensContext.Provider value={finalScreens}>
            <ComponentsProvider namespace={SCREENS_NAMESPACE} components={components}>
                {children}
            </ComponentsProvider>
        </ScreensContext.Provider>
    );
};

ScreensProvider.propTypes = propTypes;
ScreensProvider.defaultProps = defaultProps;

export default ScreensContext;
