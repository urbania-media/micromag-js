// import { useEffect } from 'react';
import PropTypes from 'prop-types';

import useGoogleMapPolyline from './useGoogleMapPolyline';

const propTypes = {
    map: PropTypes.object, // eslint-disable-line
    coords: PropTypes.arrayOf(
        PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number,
        }),
    ).isRequired,
    events: PropTypes.object, // eslint-disable-line
};

const defaultProps = {
    map: null,
};

const Polyline = ({ map, coords }) => {
    useGoogleMapPolyline(map, {
        coords,
    });
    return null;
};

Polyline.propTypes = propTypes;
Polyline.defaultProps = defaultProps;

export default Polyline;
