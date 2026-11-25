type PlayableMedia = Pick<HTMLMediaElement, 'muted' | 'play'>;

/**
 * Plays a media without blocking the page. On iOS, play() on a media with sound blocks the main
 * thread for ~700 ms (measured on an iPhone), so a screen change waited that long before its
 * transition started; play() on a muted media returns at once. The media starts muted and gets
 * its sound back two frames later, once the transition has started.
 */
export default function playMediaQuickly(
    media: PlayableMedia,
    requestFrame: (callback: () => void) => unknown = (callback) => requestAnimationFrame(callback),
): Promise<void> {
    if (media.muted) {
        return media.play();
    }
    media.muted = true;
    const played = media.play();
    requestFrame(() =>
        requestFrame(() => {
            media.muted = false;
        }),
    );
    return played;
}
