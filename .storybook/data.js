import Chance from 'chance';

import authors from './data/authors';
import companies from './data/companies';
import randomWords from './data/words';
import titles from './data/titles';
import subtitles from './data/subtitles';

import AudioTest from './data/test.mp3';
import VideoTest from './data/test.mp4';
import ClosedCaptionsTest from './data/test.srt';

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

export const quote = ({ likelyhood = 100, min = 7, max = 20 } = {}) => `“ ${words(likelyhood, min, max)} ”`;

export const author = ({ likelyhood = 100 } = {}) => name(likelyhood);

export const source = ({ likelyhood = 100 } = {}) => company(likelyhood);

export const description = ({ likelyhood = 100, min = 10, max = 30 } = {}) =>
    sentences(likelyhood, min, max);

export const paragraph = ({ likelyhood = 100, min = 30, max = 60 } = {}) =>
    sentences(likelyhood, min, max);

export const textStyle = () => {
    return {
        text: {
            color: chance.color({ format: 'rgb' }),
            size: chance.integer({ min: 16, max: 32 }),
        },
    };
};

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

export const imageMedia = ({ width = 800, height = 800 } = {}) => ({
    url: `https://picsum.photos/${width}/${height}`,
    metadata: {
        width,
        height,
    }
});

export const image = (mediaParams) => ({
    media: imageMedia(mediaParams),
    name: 'Image!'
});

export const imageWithRandomSize = ({ min = 100, max = 800 } = {}) => {
    const width = chance.integer({ min, max });
    const height = chance.integer({ min, max });
    return image({ width, height });
};

export const imageSquareWithRandomSize = ({ min = 100, max = 800 } = {}) => {
    const size = chance.integer({ min, max });
    return image({ width: size, height: size });
};

export const images = ({ count = 3, width = 800, height = 800, rand = false } = {}) => {
    return [...Array(count)].map(() => ({
        media: {
            url: `https://picsum.photos/${width}/${height}?random=${rand ? Math.random() : 1}`,
            metadata: {
                width,
                height,
            }
        },
        name: 'image-in-array',
    }));
};

export const video = () => ({
    media: {
        type: 'video',
        url: VideoTest,
        metadata: {
            width: 1920,
            height: 1080,
        },
    },
});

export const background = () => ({ color: { color: chance.color({ format: 'rgb' }) } });

export const backgroundImage = ({ rand = false } = {}) => ({
    color: { color: chance.color({ format: 'rgb' }) },
    image: {
        media: {
            type: 'image',
            url: `https://picsum.photos/1000/1000/?blur&random=${rand ? Math.random() : 1}`,
            metadata: {
                width: 1000,
                height: 1000,
            }
        },
    },
});

export const audio = () => ({
    media: {
        type: 'audio',
        url: AudioTest,
        metadata: {
            duration: 16000,
        }
    }
});

export const closedCaptions = () => ({
    media: {
        type: 'closed-captions',
        url: ClosedCaptionsTest,
    }
});

export const advertising = (mediaParams) => ({
    image: { media: imageMedia(mediaParams) },
    url: { url: 'https://www.urbania.ca', target: '_blank', rel: 'noopener noreferer' },
    text: { body: 'Presented by Paul' },
});

export const markers = ({ count = 3, withTitle = true, withDescription = true, withImage = false } = {}) => {
    return [...Array(count)].map((j, i) => ({
        id: i,
        geoPosition: {
            lat: chance.floating({ min: 45.4, max: 45.6, fixed: 8 }),
            lng: chance.floating({ min: -74, max: -73, fixed: 8 }),
        },
        title: withTitle ? { body: title() } : null,
        description: withDescription ? { body: shortText() } : null,
        image: withImage ? imageWithRandomSize({ min: 100, max: 120 }) : null,
    }));
};

export const map = () => ({
    zoom: 9,
    center: {
        lat: 45.5,
        lng: -73.56,
    },
});

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
