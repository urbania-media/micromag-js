import isArray from 'lodash/isArray';

const getLayersFromBackground = (background = null) => {
    if (background === null) {
        return [];
    }
    return (isArray(background) ? background : [background]).reduce(
        (layers, { image = null, video = null, media = null, color = null, ...data }) => {
            if (image === null && video === null && color === null) {
                return layers;
            }
            if (image !== null && video !== null) {
                return [
                    ...layers,
                    {
                        media: image,
                        ...data,
                    },
                    {
                        media: video,
                        color,
                        ...data,
                    },
                ];
            }
            return [
                ...layers,
                {
                    media: media || image || video,
                    color,
                    ...data,
                },
            ];
        },
        [],
    );
};

export default getLayersFromBackground;
