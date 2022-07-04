/* eslint-disable react/jsx-props-no-spreading */
import { isString } from 'lodash';
import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect, useMemo } from 'react';

import { PropTypes as MicromagPropTypes } from '../lib';

export const VisitorContext = React.createContext();

export const useVisitorContext = () => {
    const { visitor, setVisitor } = useContext(VisitorContext);
    return { visitor, setVisitor };
};

export const useVisitor = () => {
    const { visitor } = useContext(VisitorContext);
    return visitor;
};

export const useSetVisitor = () => {
    const { setVisitor } = useContext(VisitorContext);
    return setVisitor;
};

const propTypes = {
    children: PropTypes.node.isRequired,
    visitor: MicromagPropTypes.visitor,
};

const defaultProps = {
    visitor: null,
};

export const VisitorProvider = ({ visitor: providedVisitor, children }) => {
    const [visitor, setVisitor] = useState(providedVisitor);

    useEffect(() => {
        if (providedVisitor !== visitor) {
            setVisitor(providedVisitor);
        }
    }, [providedVisitor, setVisitor]);

    const value = useMemo(
        () => ({
            visitor,
            setVisitor: (newVisitor) => (isString(newVisitor) ? { id: newVisitor } : newVisitor),
        }),
        [visitor, setVisitor],
    );

    return <VisitorContext.Provider value={value}>{children}</VisitorContext.Provider>;
};

VisitorProvider.propTypes = propTypes;
VisitorProvider.defaultProps = defaultProps;
