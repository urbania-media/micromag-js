const convertUppyToMedia = it => {
    if (it.transloadit === null) {
        return null;
    }
    const type = it.data.type.split('/')[0];
    const thumbnails = it.transloadit.results[`${type}_thumbnail`] || [];
    const originals = it.transloadit.results[`${type}_original`] || [];
    return {
        id: it.id,
        type,
        name: it.meta.name,
        filename: it.meta.filename,
        mime: it.data.type,
        size: it.data.size,
        url:
            originals !== null && originals.length > 0
                ? originals[0].ssl_url || originals[0].url
                : null,
        thumbnail_url:
            thumbnails !== null && thumbnails.length > 0
                ? thumbnails[0].ssl_url || thumbnails[0].url
                : null,
        data: {
            transloadit: it.transloadit.results || null,
        },
    };
};

export default convertUppyToMedia;
