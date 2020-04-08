// import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useGoogleMapPolyline from './useGoogleMapPolyline';

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

const Polyline = ({ mapsApi, map, coords }) => {
    useGoogleMapPolyline({
        mapsApi,
        coords,
        map,
    });

    // useEffect(() => {
    //     if (line) {
    //         if (active) {
    //             marker.setIcon(Pin);
    //         } else {
    //             marker.setIcon(PinInactive);
    //         }
    //     }
    // }, [active]);

    return null;
};

Polyline.propTypes = propTypes;
Polyline.defaultProps = defaultProps;

export default Polyline;
