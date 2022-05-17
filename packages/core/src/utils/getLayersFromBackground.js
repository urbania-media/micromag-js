import isArray from 'lodash/isArray';

const getLayersFromBackground = (background = null) => {
    if (background === null) {
        return [];
    }
    return (isArray(background) ? background : [background]).reduce(
        (layers, { image = null, video = null, media = null, audio = null, ...data }) => {
            if (image !== null && video !== null) {
                return [
                    ...layers,
                    {
                        media: image,
                        ...data,
                    },
                    {
                        media: video,
                        ...data,
                    },
                    {
                        media: audio,
                        ...data,
                    },
                ];
            }
            return [
                ...layers,
                {
                    media: media || image || video || audio,
                    ...data,
                },
            ];
        },
        [],
    );
};

export default getLayersFromBackground;
