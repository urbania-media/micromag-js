import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useGoogleMapMarker from './useGoogleMapMarker';
import Pin from './pin.png';

const propTypes = {
    position: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }).isRequired,
    type: PropTypes.string.isRequired,
    mapsApi: PropTypes.object.isRequired, // eslint-disable-line
    map: PropTypes.object.isRequired, // eslint-disable-line
    events: PropTypes.object, // eslint-disable-line
    active: PropTypes.bool,
    title: PropTypes.string,
};

const defaultProps = {
    events: null,
    active: true,
    title: null,
};

const Marker = ({ mapsApi, position, type, map, events, active = false, title }) => {
    const marker = useGoogleMapMarker({
        mapsApi,
        position,
        type,
        map,
        events,
        title,
    });

    useEffect(() => {
        if (marker) {
            if (active) {
                marker.setIcon(Pin);
            } else {
                marker.setIcon(Pin);
            }
        }
    }, [active]);

    return null;
};

Marker.propTypes = propTypes;
Marker.defaultProps = defaultProps;

export default Marker;
