/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import getDisplayName from '../utils/getDisplayName';

const ComponentsContext = React.createContext({});

export const useComponents = (namespace = null) => {
    const { components } = useContext(ComponentsContext);
    return namespace !== null ? (components || {})[namespace] : components;
};

export const withComponents = WrappedComponent => {
    const withComponentsComponent = props => (
        <ComponentsContext.Consumer>
            {({ components }) => <WrappedComponent components={components} {...props} />}
        </ComponentsContext.Consumer>
    );
    withComponentsComponent.displayName = `withComponents(${getDisplayName(WrappedComponent)})`;
    return withComponentsComponent;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    namespace: PropTypes.string,
    components: PropTypes.objectOf(PropTypes.object),
};

const defaultProps = {
    namespace: null,
    components: {},
};

export const ComponentsProvider = ({ children, components, namespace }) => {
    const previousComponents = useComponents();
    const finalComponents =
        namespace !== null
            ? {
                  ...previousComponents,
                  [namespace]: {
                      ...((previousComponents || {})[namespace] || null),
                      ...components,
                  },
              }
            : { ...previousComponents, ...components };
    return (
        <ComponentsContext.Provider value={{ components: finalComponents }}>
            {children}
        </ComponentsContext.Provider>
    );
};

ComponentsProvider.propTypes = propTypes;
ComponentsProvider.defaultProps = defaultProps;

export default ComponentsContext;
