import Chance from 'chance';

const chance  = new Chance();

export const header1 = {
    fontFamily: {
        name: 'Garage Gothic',
        fallback: 'Arial',
        type: 'sans-serif',
    },
    fontSize: 50,
    fontStyle: {
        bold: true,
        transform: 'uppercase',
    },
    lineHeight: 1,
};

export const header2 = {
    fontFamily: {
        name: 'Garage Gothic',
        fallback: 'Arial',
        type: 'sans-serif',
    },
    fontSize: 35,
    fontStyle: {
        transform: 'uppercase',
    },
    lineHeight: 1,
};

export const header3 = {
    fontFamily: {
        name: 'Apercu',
        fallback: 'Arial',
        type: 'sans-serif',
    },
    fontSize: 18,
    fontStyle: {
        bold: false,
    },
    lineHeight: 1,
};

export const bodyText = {
    fontFamily: {
        name: 'Sina Nova',
        fallback: 'Gerogia',
        type: 'serif',
    },
    fontSize: 18,
    fontStyle: {
        bold: false,
    },
    lineHeight: 1.1,
};

export const background = () => ({ color: { color: chance.color({ format: 'rgb' }) } });

export const backgroundImage = ({ rand = false } = {}) => {
    const random = rand ? Math.random() : 1;
    return {
        color: { color: chance.color({ format: 'rgb' }) },
        image: {
            type: 'image',
            name: 'image.jpg',
            url: `https://picsum.photos/1000/1000/?blur&random=${random}`,
            thumbnail_url: `https://picsum.photos/200/200/?blur&random=${random}`,
            metadata: {
                width: 1000,
                height: 1000,
            },
        },
        fit: true,
    };
};
