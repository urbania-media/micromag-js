// HTMLMediaElement.HAVE_FUTURE_DATA: the media can play
const HAVE_FUTURE_DATA = 3;

interface WaitableMedia {
    readyState?: number;
    addEventListener: (type: string, listener: () => void) => void;
    removeEventListener: (type: string, listener: () => void) => void;
}

interface WaitForMediaCanPlayOptions {
    /** Call onReady after this delay even if the media can't play yet */
    timeout: number;
    onReady: () => void;
}

/**
 * Calls onReady once, as soon as the media can play (or right away without a media), and at the
 * latest after `timeout`. Returns a function that cancels the wait.
 */
function waitForMediaCanPlay(
    media: WaitableMedia | null,
    { timeout, onReady }: WaitForMediaCanPlayOptions,
): () => void {
    let done = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const events = ['canplay', 'canplaythrough', 'playing'];

    const cleanup = () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        if (media !== null) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            events.forEach((event) => media.removeEventListener(event, onCanPlay));
        }
    };

    function onCanPlay() {
        if (done) {
            return;
        }
        done = true;
        cleanup();
        onReady();
    }

    if (media === null || (media.readyState || 0) >= HAVE_FUTURE_DATA) {
        onCanPlay();
        return () => {};
    }

    events.forEach((event) => media.addEventListener(event, onCanPlay));
    timeoutId = setTimeout(onCanPlay, timeout);

    return () => {
        done = true;
        cleanup();
    };
}

export default waitForMediaCanPlay;
