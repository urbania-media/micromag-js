import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import useGoogleMapMarker from './useGoogleMapMarker';

import Pin from './pin.png';
import PinInactive from './pin-inactive.png';

const propTypes = {
    // map: PropTypes.object.isRequired, // eslint-disable-line
    map: PropTypes.object, // eslint-disable-line
    position: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }).isRequired,
    type: PropTypes.string, // .isRequired,
    events: PropTypes.object, // eslint-disable-line
    active: PropTypes.bool,
    title: PropTypes.string,
    image: MicromagPropTypes.imageMedia,
    iconSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
    }),
};

const defaultProps = {
    map: null,
    events: null,
    active: true,
    title: null,
    image: null,
    iconSize: {
        width: 50,
        height: 50,
    },
};

const Marker = ({ map, position, type, events, active, title, image, iconSize }) => {
    useGoogleMapMarker(map, {
        position,
        type,
        events,
        title,
        icon: image || (active ? Pin : PinInactive),
        iconSize,
    });
    return null;
};

Marker.propTypes = propTypes;
Marker.defaultProps = defaultProps;

export default Marker;
