export const isYouTube = url => url !== null && url.match(/(youtube\.com|youtu\.be)/i) !== null;

export const getYouTubeVideoId = url => {
    const videoId = url !== null ? url.match(/(youtu.be\/|v=)([^&?]+)/) : null;
    return videoId !== null ? videoId[2] : url;
};

const sizeMaps = {};
export const getYouTubeVideoSize = (client, videoId, maxWidth = 1920) => {
    return new Promise((resolve, reject) => {
        if (typeof sizeMaps[videoId] !== 'undefined') {
            resolve(sizeMaps[videoId]);
            return;
        }
        client
            .request({
                path: `https://www.googleapis.com/youtube/v3/videos?part=player&maxWidth=${maxWidth}&id=${videoId}`,
            })
            .then(({ result: { items = [] } = {} }) => {
                const video = items[0] || null;
                if (video === null) {
                    throw new Error('Video not found');
                }
                const size = {
                    width: parseInt(video.player.embedWidth, 10),
                    height: parseInt(video.player.embedHeight, 10),
                };
                sizeMaps[videoId] = size;
                resolve(size);
            })
            .catch(reject);
    });
};
