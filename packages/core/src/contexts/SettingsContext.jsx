/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';

export const SettingsContext = React.createContext({});

export const useSettings = () => useContext(SettingsContext);

export const useSetting = (key, defaultValue = null) => {
    const settings = useSettings();
    const { [key]: value = defaultValue } = settings || {};
    return value;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    settings: PropTypes.object,
};

const defaultProps = {
    settings: null,
};

export const SettingsProvider = ({ children, settings }) => {
    const previousSettings = useSettings();
    const value = useMemo(
        () => ({
            ...previousSettings,
            ...settings,
        }),
        [settings, previousSettings],
    );
    return (
        <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
    );
};

SettingsProvider.propTypes = propTypes;
SettingsProvider.defaultProps = defaultProps;
