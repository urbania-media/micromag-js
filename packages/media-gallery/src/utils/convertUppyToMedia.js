const convertUppyToMedia = (it) => {
    // console.log('upload', it);
    const type = it.data.type.split('/')[0];
    const thumbnail = it.transloadit[`${type}_thumbnail`] || null;
    const original = it.transloadit[`${type}_original`] || null;
    return {
        handle: it.id,
        type,
        name: it.meta.name,
        mime: it.data.type,
        size: it.data.size,
        url: original !== null ? original.ssl_url || original.url : null,
        thumbnail_url: thumbnail !== null ? thumbnail.ssl_url || thumbnail.url : null,
        metadata: {
            ...(original !== null ? original.meta || null : null),
            ...(it.meta.user ? { user: it.meta.user } || null : null),
            filename: it.meta.filename,
            transloadit: it.transloadit.results || null,
        },
    };
};

export default convertUppyToMedia;
