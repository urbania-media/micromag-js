/* eslint-disable react/jsx-props-no-spreading */
import { TrackingContainer, TrackingContext } from '@folklore/tracking';
import PropTypes from 'prop-types';
import React, { useContext, useMemo, useRef } from 'react';

import { PropTypes as MicromagPropTypes, Tracking } from '../lib';

export { TrackingContext };

export const useTracking = () => useContext(TrackingContext);

const propTypes = {
    children: PropTypes.node.isRequired,
    variables: MicromagPropTypes.trackingVariables,
    disabled: PropTypes.bool,
    paused: PropTypes.bool,
};

const defaultProps = {
    variables: null,
    disabled: false,
    paused: false,
};

export const TrackingProvider = ({ variables, disabled, paused, children }) => {
    const contextTracking = useTracking() || null;
    const refTracking = useRef(null);
    const tracking = useMemo(() => {
        if (refTracking.current === null) {
            refTracking.current = new Tracking({
                variables: {
                    ...(contextTracking !== null ? contextTracking.getVariables() : null),
                    ...variables,
                },
                disabled,
                paused,
            });
        } else {
            refTracking.current.setVariables({
                ...refTracking.current.getVariables(),
                ...variables,
            });
            refTracking.current.setDisabled(disabled);
            refTracking.current.setPaused(paused);
        }
        return refTracking.current;
    }, [contextTracking, variables, disabled, paused]);

    return <TrackingContainer tracking={tracking}>{children}</TrackingContainer>;
};

TrackingProvider.propTypes = propTypes;
TrackingProvider.defaultProps = defaultProps;
