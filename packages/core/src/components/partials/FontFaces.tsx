/* eslint-disable react/no-array-index-key */
import isObject from 'lodash-es/isObject';
import React from 'react';

const emptyArray: never[] = [];

// Formats in order of preference. EOT (old Internet Explorer) and SVG fonts (old iOS Safari) are
// not supported by the browsers the viewer runs on, so they are no longer declared.
const defaultFormats = [
    'woff2',
    'woff',
    {
        name: 'otf',
        format: 'opentype',
    },
    {
        name: 'ttf',
        format: 'truetype',
    },
];

const getUrlsFromMedia = (media, formats) => {
    const { files = {} } = media || {};
    const { original: originalFile = null } = files || {};
    const { name: originalName = null, mime: originalMime = null } = originalFile || {};
    const urls = formats.reduce((currentUrls, format) => {
        const finalFormat = isObject(format) ? format.format : format;
        const formatExtension = isObject(format) ? format.name : format;
        const file = files[`webfonts.${formatExtension}`] || files[formatExtension] || null;
        if (file !== null) {
            return [...currentUrls, `url("${file.url}?") format("${finalFormat}")`];
        }
        const extensionRegExp = new RegExp(`.${formatExtension}$`, 'i');
        const mimeRegExp = new RegExp(`${finalFormat}`, 'i');
        if (
            (originalName !== null && originalName.match(extensionRegExp) !== null) ||
            (originalMime !== null && originalMime.match(mimeRegExp) !== null)
        ) {
            return [...currentUrls, `url("${originalFile.url}?") format("${finalFormat}")`];
        }
        return currentUrls;
    }, []);
    return urls;
};

interface FontFacesProps {
    fonts?: Font[];
    formats?: (string | { name?: string; format?: string })[];
    /**
     * `font-display` of the rules. With `swap` the text shows right away in the fallback font and
     * switches to the custom font once it is loaded, instead of staying invisible while it loads.
     */
    display?: string | null;
}

function FontFaces({
    fonts = emptyArray,
    formats = defaultFormats,
    display = 'swap',
}: FontFacesProps) {
    const fontDisplay = display !== null ? `font-display: ${display};` : '';
    const fontFaces = (fonts || [])
        .filter((it) => isObject(it) && it.type === 'custom' && (it.media || null) !== null)
        .reduce((fontFontFaces, { name = null, media = null, variants = [] }) => {
            if (name === null) {
                return fontFontFaces;
            }
            const urls = media !== null ? getUrlsFromMedia(media, formats) : null;

            const fontKey = name.toLowerCase();

            return {
                ...fontFontFaces,
                [fontKey]:
                    urls !== null && urls.length > 0
                        ? `
                @font-face {
                    font-family: "${name}";
                    src: ${urls.join(',')};
                    ${fontDisplay}
                }
            `
                        : null,
                ...variants.reduce(
                    (variantFontFaces, { weight, style, media: variantMedia = null }) => {
                        if (variantMedia == null) {
                            return variantFontFaces;
                        }
                        const variantUrls = getUrlsFromMedia(variantMedia, formats);
                        const variantKey = `${fontKey}-${weight !== null ? weight : 'normal'}-${
                            style !== null ? style : 'normal'
                        }`;
                        return {
                            ...variantFontFaces,
                            [variantKey]:
                                variantUrls !== null && variantUrls.length > 0
                                    ? `
                @font-face {
                    font-family: "${name}";
                    ${weight !== null ? `font-weight: ${weight};` : ''}
                    ${style !== null ? `font-style: ${style};` : ''}
                    src: ${variantUrls.join(',')};
                    ${fontDisplay}
                }
            `
                                    : null,
                        };
                    },
                    {},
                ),
            };

            // return [
            //     ...fontFontFaces,
            //     urls !== null && urls.length > 0
            //         ? `
            //     @font-face {
            //         font-family: "${name}";
            //         src: ${urls.join(',')};
            //     }
            // `
            //         : null,
            //     ...(variants || []).map(({ weight, style, media: variantMedia = null }) => {
            //         if (variantMedia == null) {
            //             return null;
            //         }
            //         const variantUrls = getUrlsFromMedia(variantMedia, formats);
            //         return variantUrls !== null && variantUrls.length > 0
            //             ? `
            //     @font-face {
            //         font-family: "${name}";
            //         ${weight !== null ? `font-weight: ${weight};` : ''}
            //         ${style !== null ? `font-style: ${style};` : ''}
            //         src: ${variantUrls.join(',')};
            //     }
            // `
            //             : null;
            //     }),
            // ];
        }, {});
    return Object.keys(fontFaces).length > 0 ? (
        <style
            type="text/css"
            dangerouslySetInnerHTML={{
                __html: Object.keys(fontFaces)
                    .map((it) => fontFaces[it])
                    .filter((it) => it !== null)
                    .join('\n'),
            }}
        />
    ) : null;
}

export default FontFaces;
