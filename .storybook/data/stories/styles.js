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

export const backgroundImage = ({ rand = false } = {}) => ({
    color: { color: chance.color({ format: 'rgb' }) },
    image: {
        media: {
            type: 'image',
            url: `https://picsum.photos/1000/1000/?blur&random=${rand ? Math.random() : 1}`,
            metadata: {
                width: 1000,
                height: 1000,
            },
        },
    },
});
