/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import useItems from '../../hooks/useItems';

const propTypes = {
    getItems: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

const defaultProps = {
    getItems: null,
    items: null,
    children: null,
};

const AsyncList = ({ getItems, items, children, ...props }) => {
    const state = useItems({
        getItems,
        items,
        ...props,
    });
    if (typeof children === 'function') {
        return children(state);
    }
    return React.cloneElement(children, state);
};

AsyncList.propTypes = propTypes;
AsyncList.defaultProps = defaultProps;

export default AsyncList;
