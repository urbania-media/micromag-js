/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';

import { useSetting } from './SettingsContext';

export const GoogleKeysContext = React.createContext({
    apiKey: null,
});

export const useGoogleKeys = () => useContext(GoogleKeysContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    apiKey: PropTypes.string, // .isRequired,
};

const defaultProps = {
    apiKey: null,
};

export const GoogleKeysProvider = ({ children, apiKey }) => {
    const { apiKey: previousApiKey } = useGoogleKeys();
    const settingApiKey = useSetting('googleApiKey');
    const value = useMemo(
        () => ({ apiKey: apiKey || previousApiKey || settingApiKey }),
        [apiKey, previousApiKey, settingApiKey],
    );
    return <GoogleKeysContext.Provider value={value}>{children}</GoogleKeysContext.Provider>;
};

GoogleKeysProvider.propTypes = propTypes;
GoogleKeysProvider.defaultProps = defaultProps;
