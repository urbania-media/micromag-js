const deviceScreens = [
    {
        name: 'mobile',
    },
    {
        name: 'small',
        mediaQuery: 'only screen and (min-width: 500px)',
    },
    {
        name: 'medium',
        mediaQuery: 'only screen and (min-width: 790px)',
    },
    {
        name: 'large',
        mediaQuery: 'only screen and (min-width: 1000px)',
    },
    {
        name: 'very-large',
        mediaQuery: 'only screen and (min-width: 1600px)',
    },
];

// eslint-disable-next-line import/prefer-default-export
export const getDeviceScreens = () => deviceScreens;

export default getDeviceScreens;
