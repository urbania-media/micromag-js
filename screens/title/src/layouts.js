import Grouped from './grouped/Grouped';

export { default as Default } from './default/Default';

export const GroupedLeft = Object.assign(Grouped, {
    defaultProps: { ...Grouped.defaultProps, textAlign: 'left' },
});

export const GroupedRight = Object.assign(Grouped, {
    defaultProps: { ...Grouped.defaultProps, textAlign: 'right' },
});

export const GroupedCentered = Object.assign(Grouped, {
    defaultProps: { ...Grouped.defaultProps, textAlign: 'center' },
});
