/* eslint-disable react/no-array-index-key */
import isObject from 'lodash/isObject';
import PropTypes from 'prop-types';
import React from 'react';
import { PropTypes as MicromagPropTypes } from '../../lib';

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

const propTypes = {
    fonts: MicromagPropTypes.fonts,
    formats: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                name: PropTypes.string,
                format: PropTypes.string,
            }),
        ]),
    ),
};

const defaultProps = {
    fonts: [],
    formats: [
        'eot',
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
        'svg',
    ],
};

const FontFaces = ({ fonts, formats }) => {
    const fontFaces = (fonts || [])
        .filter((it) => isObject(it) && it.type === 'custom' && (it.media || null) !== null)
        .reduce((fontFontFaces, { name = null, media = null, variants = [] }) => {
            if (name === null) {
                return fontFontFaces;
            }
            const urls = media !== null ? getUrlsFromMedia(media, formats) : null;
            return [
                ...fontFontFaces,
                urls !== null && urls.length > 0
                    ? `
                @font-face {
                    font-family: "${name}";
                    src: ${urls.join(',')};
                }
            `
                    : null,
                ...(variants || []).map(({ weight, style, media: variantMedia = null }) => {
                    if (variantMedia == null) {
                        return null;
                    }
                    const variantUrls = getUrlsFromMedia(variantMedia, formats);
                    return variantUrls !== null && variantUrls.length > 0
                        ? `
                @font-face {
                    font-family: "${name}";
                    ${weight !== null ? `font-weight: ${weight};` : ''}
                    ${style !== null ? `font-style: ${style};` : ''}
                    src: ${variantUrls.join(',')};
                }
            `
                        : null;
                }),
            ];
        }, [])
        .filter((it) => it !== null);
    return fontFaces.length > 0 ? <style type="text/css">{fontFaces.join('\n')}</style> : null;
};

FontFaces.propTypes = propTypes;
FontFaces.defaultProps = defaultProps;

export default FontFaces;
