/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

export const FieldContext = React.createContext(null);

export const useFieldContext = () => useContext(FieldContext);

const propTypes = {
    context: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node.isRequired,
};

export const FieldContextProvider = ({ context = null, children }) => (
    <FieldContext.Provider value={context}>{children}</FieldContext.Provider>
);

FieldContextProvider.propTypes = propTypes;
