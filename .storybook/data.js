import Chance from 'chance';

import authors from './data/authors';
import companies from './data/companies';
import video360File from './data/files/test-360.mp4';
import bigVideoFile from './data/files/test-apple.mp4';
import videoWithAudio from './data/files/test-audio.mp4';
import bigVideoWithAudio from './data/files/test-big-skate.mp4';
import videoFileVertical from './data/files/test-vertical.mp4';
import audioFile from './data/files/test.mp3';
import videoFile from './data/files/test.mp4';
import webFont2WOFF2 from './data/files/webfont2.woff2';
import webFontWOFF2 from './data/files/webfont.woff2';
import subtitles from './data/subtitles';
import titles from './data/titles';
import randomWords from './data/words';

import image360File from './data/files/image-360.jpg';
import gifFile from './data/files/test.gif';
import closedCaptionsFile from './data/files/test.srt';
import webFont2EOT from './data/files/webfont2.eot';
import webFont2SVG from './data/files/webfont2.svg';
import webFont2TTF from './data/files/webfont2.ttf';
import webFont2WOFF from './data/files/webfont2.woff';
import webFont3OTF from './data/files/webfont3.otf';
import webFontEOT from './data/files/webfont.eot';
import webFontSVG from './data/files/webfont.svg';
import webFontTTF from './data/files/webfont.ttf';
import webFontWOFF from './data/files/webfont.woff';

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

export const title = () => random(titles);

export const subtitle = () => random(subtitles);

export const quote = ({ likelyhood = 100, min = 5, max = 12 } = {}) =>
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

export const imageUrl = ({ width = 800, height = 800, rand = false, gif = false } = {}) =>
    gif ? gifFile : `https://picsum.photos/${width}/${height}?random=${rand ? Math.random() : 1}`;

export const imageMedia = ({
    width = 800,
    height = 800,
    rand = false,
    gif = false,
    sizes = { large: 0.9, medium: 0.75, small: 0.3 },
} = {}) => ({
    type: 'image',
    url: imageUrl({ width, height, rand, gif }),
    thumbnail_url: imageUrl({ width: 100, height: 100, rand }),
    metadata: {
        width,
        height,
        mime: gif ? 'image/gif' : 'image/jpg',
    },
    sizes: Object.keys(sizes).reduce(
        (currentSizes, key) => ({
            ...currentSizes,
            [key]: {
                url: imageUrl({
                    width: Math.round(width * sizes[key]),
                    height: Math.round(height * sizes[key]),
                    rand,
                    gif,
                }),
                width: Math.round(width * sizes[key]),
                height: Math.round(height * sizes[key]),
            },
        }),
        {},
    ),
});

export const imageMediaFromURL = (url) => ({
    ...imageMedia(),
    url,
    thumbnail_url: url,
    sizes: [],
});

export const videoMedia = ({ vertical = false, big = false } = {}) => ({
    type: 'video',
    url: vertical ? videoFileVertical : big ? bigVideoFile : videoFile, // eslint-disable-line no-nested-ternary
    thumbnail_url: imageUrl({ width: 1920, height: 1080, rand: true }),
    metadata: vertical
        ? { width: 720, height: 1280 }
        : {
              width: 1920,
              height: 1080,
          },
    files: {
        thumbnail_0: {
            handle: 'thumbnail_0',
            url: imageUrl({ width: 1920, height: 1080, rand: true }),
        },
        thumbnail_1: {
            handle: 'thumbnail_1',
            url: imageUrl({ width: 1920, height: 1080, rand: true }),
        },
    },
});

export const videoMediaFromURL = (url) => ({
    ...videoMedia(),
    url,
});

export const videoMediaWithSound = () => ({
    ...videoMedia(),
    url: videoWithAudio,
});

export const bigVideoMediaWithSound = () => ({
    ...videoMedia(),
    url: bigVideoWithAudio,
});

export const gifVideoMedia = ({ withoutFiles = null } = {}) => ({
    type: 'video',
    url: gifFile,
    thumbnail_url: imageUrl({ width: 500, height: 281, rand: true }),
    metadata: {
        width: 500,
        height: 281,
        mime: 'image/gif',
    },
    ...(!withoutFiles
        ? {
              files: {
                  h264: {
                      url: videoFile,
                      mime: 'video/mp4',
                  },
              },
          }
        : {
              files: {
                  original: {
                      url: gifFile,
                      mime: 'image/gif',
                  },
              },
          }),
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

export const image360Media = () => ({
    type: 'image',
    url: image360File,
    thumbnail_url: image360File,
    metadata: {
        width: 7680,
        height: 1920,
    },
});

export const audioMedia = ({ withWaveform = false } = {}) => ({
    type: 'audio',
    url: audioFile,
    metadata: {
        duration: 16000,
        waveform: withWaveform
            ? [...Array(100).keys()].map(() => -128 + 256 * Math.random())
            : null,
    },
});

export const closedCaptionsMedia = () => ({
    type: 'closed-captions',
    url: closedCaptionsFile,
});

export const medias = ({ count = 3, width = 800, height = 800, rand = false, gif = false } = {}) =>
    [...Array(count)].map((_, index) =>
        index % 3 === 0 ? videoMedia({ width, height }) : imageMedia({ width, height, rand, gif }),
    );

export const mediasWithCaptions = ({
    count = 3,
    width = 800,
    height = 800,
    rand = false,
    gif = false,
} = {}) =>
    [...Array(count)].map((_, index) => ({
        media:
            index % 3 === 0
                ? videoMedia({ width, height })
                : imageMedia({ width, height, rand, gif }),
        caption: index % 3 === 0 ? text() : null,
    }));

export const images = ({ count = 3, width = 800, height = 800, rand = false, gif = false } = {}) =>
    [...Array(count)].map(() => imageMedia({ width, height, rand, gif }));

export const imagesWithCaptions = ({
    count = 3,
    width = 800,
    height = 800,
    rand = false,
    gif = false,
} = {}) =>
    [...Array(count)].map(() => ({
        media: imageMedia({ width, height, rand, gif }),
        caption: Math.random() > 0.5 ? text() : null,
    }));

export const backgroundColor = () => ({
    color: { color: chance.color({ format: 'rgb' }), alpha: 1 },
});

export const backgroundImage = ({ rand = false, gif = false } = {}) => ({
    color: { color: chance.color({ format: 'rgb' }), alpha: 1 },
    image: imageMedia({ width: 1000, height: 1000, rand, gif }),
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
    inWebView: true,
    url: 'https://urbania.ca',
    label: {
        body: 'Learn moar',
    },
});

export const shareIncentive = (body = 'Share this Micromag!') => ({
    active: true,
    label: {
        body,
        textStyle: {
            color: {
                alpha: 1,
                color: '#222222',
            },
        },
    },
    boxStyle: {
        borderWidth: 4,
        padding: {
            top: 5,
            right: 20,
            bottom: 5,
            left: 20,
        },
        borderColor: {
            alpha: 0.44,
            color: '#fffc00',
        },
        backgroundColor: {
            alpha: 1,
            color: '#fffc00',
        },
        borderRadius: 30,
        borderStyle: 'solid',
        shadowAngle: 45,
        shadowDistance: 5,
        shadowBlur: 0,
        shadowColor: {
            color: '#000000',
            alpha: 1,
        },
    },
});

export const callToActionWithStyles = () => ({
    active: true,
    inWebView: true,
    type: 'button',
    url: 'https://urbania.ca',
    label: {
        body: 'Visit website',
        textStyle: {
            color: {
                alpha: 1,
                color: '#222222',
            },
        },
    },
    boxStyle: {
        borderWidth: 4,
        padding: {
            top: 8,
            right: 20,
            bottom: 5,
            left: 20,
        },
        borderColor: {
            alpha: 0.44,
            color: '#fffc00',
        },
        backgroundColor: {
            alpha: 1,
            color: '#fffc00',
        },
        borderRadius: 40,
        borderStyle: 'solid',
    },
});

export const transitions = ({ transitionIn = 'fade', transitionOut = 'fade' } = {}) => ({
    in: transitionIn,
    out: transitionOut,
});

export const webfontFiles = {
    'webfonts.eot': {
        url: webFontEOT,
    },
    'webfonts.svg': {
        url: webFontSVG,
    },
    'webfonts.ttf': {
        url: webFontTTF,
    },
    'webfonts.woff': {
        url: webFontWOFF,
    },
    'webfonts.woff2': {
        url: webFontWOFF2,
    },
};

export const webfont2Files = {
    'webfonts.eot': {
        url: webFont2EOT,
    },
    'webfonts.svg': {
        url: webFont2SVG,
    },
    'webfonts.ttf': {
        url: webFont2TTF,
    },
    'webfonts.woff': {
        url: webFont2WOFF,
    },
    'webfonts.woff2': {
        url: webFont2WOFF2,
    },
};

export const webfont3Files = {
    otf: {
        url: webFont3OTF,
    },
};

export const renderFormats = {
    View: 'view',
    Preview: 'preview',
    Placeholder: 'placeholder',
    Edit: 'edit',
};

export const color = () => ({
    alpha: 1,
    color: `#${`${Math.random().toString(16)}000000`.substring(2, 8)}`,
});

export const conversation = (messagesNumber = 10, speakersNumber = 2, timing = 'sequence') => {
    const speakers = ([...Array(speakersNumber)] || []).map((s, idx) => ({
        id: `${idx}`,
        name: name(),
        avatar: imageMedia(),
        color: color(),
        side: Math.random() > 0.3 ? 'left' : 'right',
    }));

    const messages = [...Array(messagesNumber)].map(() => ({
        message: shortText({ likelyhood: 100, min: 2, max: 12 }),
        speaker: random(speakers).id,
        image: Math.random() < 0.2 ? imageMedia({ gif: true }) : null,
    }));
    return {
        speakers,
        timing,
        messages,
    };
};

export const badge = () => ({
    active: true,
    label: {
        body:
            Math.random() > 0.5
                ? `My badge ${Math.floor(Math.random() * 10000000)}`
                : words(100, 8, 10),
        textStyle: { color: color() },
    },
    boxStyle: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        padding: null,
        borderWidth: 2,
        borderColor: color(),
        borderStyle: 'solid',
        // shadowDistance: 0,
        // shadowBlur: 6,
        // shadowColor: color(),
        // shadowAngle: 45,
    },
});

export const header = () => ({
    badge: badge(),
});

export const footer = () => ({
    callToAction: callToAction(),
});

export const headerFooter = () => ({
    header: header(),
    footer: footer(),
});

export default {
    title,
    subtitle,
    quote,
    author,
    source,
    description,
    paragraph,
};
