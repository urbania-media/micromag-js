/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

export const FieldsValueContext = React.createContext(null);

export const useFieldsValue = () => useContext(FieldsValueContext);

const propTypes = {
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node.isRequired,
};

export const FieldsValueContextProvider = ({ value = null, children }) => (
    <FieldsValueContext.Provider value={value}>{children}</FieldsValueContext.Provider>
);

FieldsValueContextProvider.propTypes = propTypes;
