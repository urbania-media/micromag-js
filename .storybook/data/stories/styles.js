import Chance from 'chance';

const chance  = new Chance();

export const header1 = {
    fontFamily: '"Garage Gothic", Arial',
    fontSize: 50,
    fontStyle: {
        bold: true,
        uppercase: true,
    },
    uppercase: true,
    lineHeight: 1,
};

export const header2 = {
    fontFamily: '"Garage Gothic", Arial',
    fontSize: 35,
    uppercase: true,
    lineHeight: 1,
};

export const header3 = {
    fontFamily: 'Apercu',
    fontSize: 18,
    fontStyle: {
        bold: false,
    },
    lineHeight: 1,
};

export const bodyText = {
    fontFamily: 'Sina Nova',
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
