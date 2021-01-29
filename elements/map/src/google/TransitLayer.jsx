import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useGoogleMapsClient } from '@micromag/core/contexts';

const propTypes = {
    map: PropTypes.object, // eslint-disable-line
    enabled: PropTypes.bool,
};

const defaultProps = {
    map: null,
    enabled: false,
};

const TransitLayer = ({ map, enabled }) => {
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
};

TransitLayer.propTypes = propTypes;
TransitLayer.defaultProps = defaultProps;

export default TransitLayer;
