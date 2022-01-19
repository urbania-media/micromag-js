/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Stack from './Stack';

const propTypes = {};

const defaultProps = {};

function HStack(props) {
    return <Stack {...props} direction="horizontal" />;
}

HStack.propTypes = propTypes;
HStack.defaultProps = defaultProps;

export default HStack;
