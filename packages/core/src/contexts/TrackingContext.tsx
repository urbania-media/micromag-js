/* eslint-disable react/jsx-props-no-spreading */
import { TrackingContainer, TrackingContext } from '@folklore/tracking';
import React, { useContext, useMemo, useRef } from 'react';

import { Tracking } from '../lib';

export { TrackingContext };

export const useTracking = () => useContext(TrackingContext);

interface TrackingProviderProps {
    children: React.ReactNode;
    variables?: TrackingVariables;
    disabled?: boolean;
    paused?: boolean;
}

export function TrackingProvider(options = null) {
    const { variables = null, disabled = false, paused = false, children = null } = options || {};
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
}
