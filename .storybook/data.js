import Chance from 'chance';

import authors from './data/authors';
import companies from './data/companies';
import randomWords from './data/words';
import titles from './data/titles';
import subtitles from './data/subtitles';

import audioFile from './data/test.mp3';
import videoFile from './data/test.mp4';
import video360File from './data/test-360.mp4';
import closedCaptionsFile from './data/test.srt';

import webFontEOT from './data/webfont.eot';
import webFontSVG from './data/webfont.svg';
import webFontTTF from './data/webfont.ttf';
import webFontWOFF from './data/webfont.woff';
import webFontWOFF2 from './data/webfont.woff2';

import webFont2EOT from './data/webfont2.eot';
import webFont2SVG from './data/webfont2.svg';
import webFont2TTF from './data/webfont2.ttf';
import webFont2WOFF from './data/webfont2.woff';
import webFont2WOFF2 from './data/webfont2.woff2';

import webFont3OTF from './data/webfont3.otf';

const chance = new Chance();

const random = (array) => array[Math.floor(Math.random() * array.length)];

const words = (likelyhood = 100, min = 2, max = 6) =>
    likelyhood === 100 ? randomWords.slice(0, chance.integer({ min, max })).join(' ') : null;

const sentences = (likelyhood = 100, min = 30, max = 40) =>
    likelyhood === 100 ? randomWords.slice(0, chance.integer({ min, max })).join(' ') : null;

const name = (likelyhood = 100) => (likelyhood === 100 ? random(authors) : null);

const company = (likelyhood = 100) => (likelyhood === 100 ? random(companies) : null);

const shortText = ({ likelyhood = 100, min = 10, max = 20 } = {}) => words(likelyhood, min, max);

const longText = ({ likelyhood = 100, min = 30, max = 50 } = {}) => words(likelyhood, min, max);

// Methods

export const title = () => random(titles);

export const subtitle = () => random(subtitles);

export const quote = ({ likelyhood = 100, min = 7, max = 20 } = {}) =>
    `“ ${words(likelyhood, min, max)} ”`;

export const author = ({ likelyhood = 100 } = {}) => name(likelyhood);

export const source = ({ likelyhood = 100 } = {}) => company(likelyhood);

export const description = ({ likelyhood = 100, min = 10, max = 30 } = {}) =>
    sentences(likelyhood, min, max);

export const paragraph = ({ likelyhood = 100, min = 30, max = 60 } = {}) =>
    sentences(likelyhood, min, max);

export const textStyle = () => ({
    text: {
        color: chance.color({ format: 'rgb' }),
        size: chance.integer({ min: 16, max: 32 }),
    },
});

export const text = (length = 'normal', style = 'normal') => {
    let body = '';
    let styleProps = {};
    switch (length) {
        case 'short':
            body = shortText();
            break;
        case 'medium':
            body = shortText();
            break;
        case 'long':
            body = longText();
            break;
        case 'verylong':
            body = paragraph();
            break;
        default:
            body = shortText();
    }

    switch (style) {
        case 'big':
            styleProps = textStyle();
            break;
        default:
            styleProps = {};
    }

    return {
        textStyle: styleProps,
        body,
    };
};

export const imageUrl = ({ width = 800, height = 800, rand = false } = {}) =>
    `https://picsum.photos/${width}/${height}?random=${rand ? Math.random() : 1}`;

export const imageMedia = ({ width = 800, height = 800, rand = false } = {}) => ({
    type: 'image',
    url: imageUrl({ width, height, rand }),
    thumbnail_url: imageUrl({ width: 100, height: 100, rand }),
    metadata: {
        width,
        height,
    },
});

export const videoMedia = () => ({
    type: 'video',
    url: videoFile,
    thumbnail_url: imageUrl({ width: 1920, height: 1080, rand: true }),
    metadata: {
        width: 1920,
        height: 1080,
    },
});

export const video360Media = () => ({
    type: 'video',
    url: video360File,
    thumbnail_url: imageUrl({ width: 1920, height: 960, rand: true }),
    metadata: {
        width: 1920,
        height: 960,
    },
});

export const audioMedia = () => ({
    type: 'audio',
    url: audioFile,
    metadata: {
        duration: 16000,
    },
});

export const closedCaptionsMedia = () => ({
    type: 'closed-captions',
    url: closedCaptionsFile,
});

// -----------------

export const images = ({ count = 3, width = 800, height = 800, rand = false } = {}) =>
    [...Array(count)].map(() => ({
        type: 'image',
        url: imageUrl({ width, height, rand }),
        metadata: {
            width,
            height,
        },
    }));

export const imagesWithCaptions = ({ count = 3, width = 800, height = 800, rand = false } = {}) =>
    [...Array(count)].map(() => ({
        media: {
            type: 'image',
            url: imageUrl({ width, height, rand }),
            metadata: {
                width,
                height,
            },
        },
        caption: text(),
    }));

export const backgroundColor = () => ({
    color: { color: chance.color({ format: 'rgb' }), alpha: 1 },
});

export const backgroundImage = ({ random: randomImage = false } = {}) => ({
    color: { color: chance.color({ format: 'rgb' }), alpha: 1 },
    image: imageMedia({ width: 1000, height: 1000, random: randomImage }),
});

export const backgroundVideo = () => ({
    video: videoMedia(),
});

export const advertising = (mediaParams) => ({
    image: { media: imageMedia(mediaParams) },
    url: { url: 'https://www.urbania.ca', target: '_blank', rel: 'noopener noreferer' },
    text: { body: 'Presented by Paul' },
});

export const markers = ({
    count = 3,
    withTitle = true,
    withSubtitle = true,
    withDescription = true,
    withImage = false,
} = {}) =>
    [...Array(count)].map((j, i) => ({
        id: i,
        geoPosition: {
            lat: chance.floating({ min: 45.4, max: 45.6, fixed: 8 }),
            lng: chance.floating({ min: -74, max: -73, fixed: 8 }),
        },
        title: withTitle ? { body: title() } : null,
        subtitle: withSubtitle ? { body: subtitle() } : null,
        description: withDescription ? { body: shortText() } : null,
        image: withImage ? imageMedia({ width: 100, height: 100 }) : null,
    }));

export const callToAction = () => ({
    active: true,
    url: 'https://google.com',
    label: {
        body: 'Learn more'
    }
});

export const transitions = ({ transitionIn = 'fade', transitionOut = 'fade' } = {}) => ({
    in: transitionIn,
    out: transitionOut,
});

export const webfontFiles = {
    'webfonts.eot': {
        url: webFontEOT
    },
    'webfonts.svg': {
        url: webFontSVG
    },
    'webfonts.ttf': {
        url: webFontTTF
    },
    'webfonts.woff': {
        url: webFontWOFF
    },
    'webfonts.woff2': {
        url: webFontWOFF2
    }
};

export const webfont2Files = {
    'webfonts.eot': {
        url: webFont2EOT
    },
    'webfonts.svg': {
        url: webFont2SVG
    },
    'webfonts.ttf': {
        url: webFont2TTF
    },
    'webfonts.woff': {
        url: webFont2WOFF
    },
    'webfonts.woff2': {
        url: webFont2WOFF2
    }
};

export const webfont3Files = {
    otf: {
        url: webFont3OTF
    },
};

export const renderFormats = {
    View: 'view',
    Preview: 'preview',
    Placeholder: 'placeholder',
    Edit: 'edit',
};

export default {
    title,
    subtitle,
    quote,
    author,
    source,
    description,
    paragraph,
};
