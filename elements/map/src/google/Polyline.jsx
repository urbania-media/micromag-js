// import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useGoogleMapPolyline from './useGoogleMapPolyline';

const propTypes = {
    coords: PropTypes.arrayOf(
        PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number,
        }),
    ).isRequired,
    mapsApi: PropTypes.object.isRequired, // eslint-disable-line
    map: PropTypes.object.isRequired, // eslint-disable-line
    events: PropTypes.object, // eslint-disable-line
};

const defaultProps = {};

const Polyline = ({ mapsApi, map, coords }) => {
    useGoogleMapPolyline({
        mapsApi,
        coords,
        map,
    });

    return null;
};

Polyline.propTypes = propTypes;
Polyline.defaultProps = defaultProps;

export default Polyline;
