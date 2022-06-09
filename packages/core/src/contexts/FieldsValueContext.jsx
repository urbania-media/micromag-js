/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

export const FieldsValueContext = React.createContext(null);

export const useFieldsValue = () => useContext(FieldsValueContext);

const propTypes = {
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    value: null,
};

export const FieldsValueContextProvider = ({ value, children }) => (
    <FieldsValueContext.Provider value={value}>{children}</FieldsValueContext.Provider>
);

FieldsValueContextProvider.propTypes = propTypes;
FieldsValueContextProvider.defaultProps = defaultProps;
