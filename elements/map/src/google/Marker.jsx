import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import useGoogleMapMarker from './useGoogleMapMarker';

import Pin from './pin.png';
import PinInactive from './pin-inactive.png';

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
    image: MicromagPropTypes.imageElement,
    imageSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
    }),
};

const defaultProps = {
    events: null,
    active: true,
    title: null,
    image: null,
    imageSize: {
        width: 50,
        height: 50,
    },
};

const Marker = ({ mapsApi, position, type, map, events, active, title, image, imageSize }) => {
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
            const { media: imageMedia = null } = image || {};
            const { url: imageUrl = null } = imageMedia || {};
            if (imageUrl !== null) {
                marker.setIcon({
                    url: imageUrl,
                    scaledSize: new mapsApi.Size(imageSize.width, imageSize.height),
                });
            } else if (active) {
                marker.setIcon(Pin);
            } else {
                marker.setIcon(PinInactive);
            }
            marker.setPosition(position);
        }
    }, [active, position]);

    return null;
};

Marker.propTypes = propTypes;
Marker.defaultProps = defaultProps;

export default Marker;
