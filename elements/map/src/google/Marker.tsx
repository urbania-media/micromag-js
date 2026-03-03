import type { ImageMedia } from '@micromag/core';
import useGoogleMapMarker from './useGoogleMapMarker';

import Pin from './pin.png';
import PinInactive from './pin-inactive.png';

interface MarkerProps {
    map?: Record<string, unknown>;
    position: { lat?: number; lng?: number };
    type?: string;
    events?: Record<string, unknown>;
    active?: boolean;
    title?: string;
    image?: ImageMedia;
    iconSize?: { width?: number; height?: number };
}

function Marker(
    { map = null, position, type, events = null, active = true, title = null, image = null, iconSize = {
        width: 50,
        height: 50,
    } },
) {
    useGoogleMapMarker(map, {
        position,
        type,
        events,
        title,
        icon: image || (active ? Pin : PinInactive),
        iconSize,
    });
    return null;
}

export default Marker;
