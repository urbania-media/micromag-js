import { useEffect, useRef } from 'react';
import { useGoogleMapsClient } from '@micromag/core/contexts';

interface TransitLayerProps {
    map?: Record<string, unknown>;
    enabled?: boolean;
}

function TransitLayer({ map = null, enabled = false }) {
    const client = useGoogleMapsClient();
    const transitLayerRef = useRef(null);

    useEffect(() => {
        if (client === null || map === null) {
            return () => {};
        }
        if (transitLayerRef.current === null) {
            transitLayerRef.current = new client.maps.TransitLayer();
        }

        if (enabled) {
            transitLayerRef.current.setMap(map);
        } else {
            transitLayerRef.current.setMap(null);
        }

        return () => {
            transitLayerRef.current.setMap(null);
        }
    }, [client, map, enabled]);

    return null;
}

export default TransitLayer;
