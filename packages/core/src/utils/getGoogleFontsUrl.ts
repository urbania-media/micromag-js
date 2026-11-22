import isObject from 'lodash-es/isObject';

const GOOGLE_FONTS_CSS_URL = 'https://fonts.googleapis.com/css';

/**
 * Returns the URL of the Google Fonts stylesheet for the Google fonts of a list of fonts, in the
 * format webfontloader used (`family=Name:variant,variant|Other`), with a `display` value. The
 * stylesheet only declares the fonts: the browser downloads a file when text uses it.
 */
const getGoogleFontsUrl = (
    fonts: unknown[] | null = null,
    { display = 'swap' }: { display?: string | null } = {},
): string | null => {
    const families = (fonts || []).reduce<string[]>((currentFamilies, font) => {
        if (!isObject(font)) {
            return currentFamilies;
        }
        const {
            type = null,
            name = null,
            variants = null,
        } = font as {
            type?: string | null;
            name?: string | null;
            variants?: unknown[] | null;
        };
        if (type !== 'google' || typeof name !== 'string' || name.length === 0) {
            return currentFamilies;
        }
        const finalVariants = (variants || [])
            .filter((it) => typeof it === 'string' || typeof it === 'number')
            .map((it) => `${it}`)
            .filter((it) => it.length > 0);
        const family = [name.replace(/ /g, '+'), finalVariants.join(',')]
            .filter((it) => it.length > 0)
            .join(':');
        return currentFamilies.indexOf(family) === -1
            ? [...currentFamilies, family]
            : currentFamilies;
    }, []);

    if (families.length === 0) {
        return null;
    }

    return `${GOOGLE_FONTS_CSS_URL}?family=${families.join('%7C')}${
        display !== null ? `&display=${display}` : ''
    }`;
};

export default getGoogleFontsUrl;
