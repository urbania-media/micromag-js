/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TrackingContainer, TrackingContext } from '@folklore/tracking';

import { Tracking } from '../lib';

export const useTracking = () => useContext(TrackingContext);

const propTypes = {
    children: PropTypes.node.isRequired,
};

const defaultProps = {};

export const TrackingProvider = ({ children }) => {
    const contextTracking = useTracking();
    const tracking = useMemo(() => contextTracking || new Tracking(), [contextTracking]);

    return <TrackingContainer tracking={tracking}>{children}</TrackingContainer>;
};

TrackingProvider.propTypes = propTypes;
TrackingProvider.defaultProps = defaultProps;

export default TrackingContext;
