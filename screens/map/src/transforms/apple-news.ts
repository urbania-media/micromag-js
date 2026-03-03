import { Container, Map } from '@micromag/transforms/apple-news';

const transform = (newStory, { markers }) => {
    const marker = markers.find(
        ({ geoPosition = null }) =>
            geoPosition !== null && geoPosition.latitude !== null && geoPosition.longitude !== null,
    );
    const { geoPosition = {} } = marker || {};
    const { lat = null, lng = null } = geoPosition || {};

    const { story: titleStory, component: titleComponent } = Map(newStory, {
        latitude: lat,
        longitude: lng,
    });

    const { story: containerStory, component: containerComponent } = Container(titleStory, [
        ...(titleComponent ? [titleComponent] : []),
    ]);

    return {
        ...containerStory,
        components: [
            ...(newStory.components || []),
            ...(containerComponent ? [containerComponent] : []),
        ],
    };
};

export default transform;
