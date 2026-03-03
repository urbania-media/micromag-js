export const selectTheme = (theme) => ({
    ...theme,
    colors: {
        ...theme.colors,
        // Color overrides
        primary: 'hsl(0, 0%, 90%)',
        primary75: 'hsl(0, 0%, 75%)',
        primary50: 'hsl(0, 0%, 50%)',
        primary25: 'hsl(0, 0%, 25%)',

        danger: '#DE350B',
        dangerLight: '#FFBDAD',

        neutral0: 'hsl(0, 0%, 10%)',
        neutral5: 'hsl(0, 0%, 20%)',
        neutral10: 'hsl(0, 0%, 30%)',
        neutral20: 'hsl(0, 0%, 40%)',
        neutral30: 'hsl(0, 0%, 50%)',
        neutral40: 'hsl(0, 0%, 60%)',
        neutral50: 'hsl(0, 0%, 70%)',
        neutral60: 'hsl(0, 0%, 80%)',
        neutral70: 'hsl(0, 0%, 90%)',
        neutral80: 'hsl(0, 0%, 95%)',
        neutral90: 'hsl(0, 0%, 100%)',
    },
    // Other options
    // borderRadius: 4
    // baseUnit: 4,
    // controlHeight: 38
    // menuGutter: baseUnit * 2
});

export default selectTheme;
