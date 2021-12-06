/* eslint-disable react/jsx-props-no-spreading */
import { TrackingContainer, TrackingContext } from '@folklore/tracking';
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import { PropTypes as MicromagPropTypes, Tracking } from '../lib';

export { TrackingContext };

export const useTracking = () => useContext(TrackingContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    variables: MicromagPropTypes.trackingVariables,
};

const defaultProps = {
    variables: null,
};

export const TrackingProvider = ({ variables, children }) => {
    const contextTracking = useTracking() || null;
    const tracking = useMemo(
        () =>
            new Tracking({
                variables: {
                    ...(contextTracking !== null ? contextTracking.getVariables() : null),
                    ...variables,
                },
            }),
        [contextTracking, variables],
    );

    return <TrackingContainer tracking={tracking}>{children}</TrackingContainer>;
};

TrackingProvider.propTypes = propTypes;
TrackingProvider.defaultProps = defaultProps;
