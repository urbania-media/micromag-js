// import { useEffect } from 'react';
import useGoogleMapPolyline from './useGoogleMapPolyline';

interface PolylineProps {
    map?: Record<string, unknown>;
    coords: { lat?: number; lng?: number }[];
    events?: Record<string, unknown>;
}

function Polyline({ map = null, coords }: PolylineProps) {
    useGoogleMapPolyline(map, {
        coords,
    });
    return null;
}

export default Polyline;
