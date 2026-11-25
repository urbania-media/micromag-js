/**
 * Key of a background from what it shows: two backgrounds that show the same thing (the same
 * video, image or color) get the same key, even when they are different objects. The quiz uses it
 * to keep the background (and a video's playback) when the next step shows the same background,
 * instead of fading to a new copy of it that starts over.
 */
function getBackgroundKey(background: unknown = null): string {
    return `background-${JSON.stringify(background ?? null)}`;
}

export default getBackgroundKey;
