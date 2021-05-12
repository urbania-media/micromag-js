/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

export const FieldContext = React.createContext(null);

export const useFieldContext = () => useContext(FieldContext);

const propTypes = {
    context: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    context: null,
};

export const FieldContextProvider = ({ context, children }) => (
    <FieldContext.Provider value={context}>{children}</FieldContext.Provider>
);

FieldContextProvider.propTypes = propTypes;
FieldContextProvider.defaultProps = defaultProps;
