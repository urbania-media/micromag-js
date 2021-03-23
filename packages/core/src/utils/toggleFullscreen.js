const toggleFullscreen = (sourceElement = null) => {
    const document =
        typeof window !== 'undefined' && typeof window.document !== 'undefined'
            ? window.document
            : null;

    if (sourceElement !== null || document !== null) {
        const element = sourceElement || document.documentElement || {};

        const isFullscreen =
            document.fullscreenElement ||
            element.fullscreenElement ||
            element.webkitFullscreenElement ||
            element.webkitCurrentFullScreenElement ||
            element.mozFullScreenElement ||
            element.msFullscreenElement ||
            false;

        const requestFullscreen =
            element.requestFullscreen ||
            element.webkitRequestFullscreen ||
            element.webkitRequestFullScreen ||
            element.mozRequestFullScreen ||
            element.msRequestFullscreen ||
            null;

        const exitFullscreen =
            document.exitFullscreen ||
            document.webkitExitFullscreen ||
            document.webkitCancelFullScreen ||
            document.mozCancelFullScreen ||
            document.msExitFullscreen ||
            null;

        if (!isFullscreen && requestFullscreen !== null) {
            requestFullscreen.call(element);
        } else if (exitFullscreen !== null) {
            exitFullscreen.call(document);
        }
    }
};

export default toggleFullscreen;
