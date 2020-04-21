import { useEffect, useState } from 'react';

export default function TransitLayer({ enabled, mapsApi, map }) {
    const [transitLayer, setTransitLayer] = useState();
    useEffect(() => {
        setTransitLayer(new mapsApi.TransitLayer());
    }, []);

    useEffect(() => {
        if (transitLayer) {
            if (enabled) {
                transitLayer.setMap(map);
            } else {
                transitLayer.setMap(null);
            }
        }
    }, [enabled]);

    return null;
}
