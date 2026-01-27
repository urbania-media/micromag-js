const possibleMimes = ['video/webm', 'video/mp4', 'video/ogg', 'application/vnd.apple.mpegurl'];
let supportedMimes = null;
function getVideoSupportedMimes(mimes = possibleMimes) {
    if (supportedMimes === null) {
        const video = document.createElement('video');
        console.log({
            checkMimes: mimes || possibleMimes,
        })
        supportedMimes = (mimes || possibleMimes).filter((mime) => video.canPlayType(mime) !== '');
    }
    return supportedMimes;
}

export default getVideoSupportedMimes;
