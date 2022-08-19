
const yo = `
Just some string
`;

const shit = {
    header: p => ({
        y: `-100 * ${p}%`,
        opacity: p,
        boxShadow: `0 0 ${5 * p}rem ${-2 * p}rem black`,
    }),
    backdrop: p => ({
        opacity: p,
    }),
    signs: p => ({
        y: -5 * p,
        opacity: p
    }),
    button: p => ({
        opacity: 1 - p,
        y: `${-5 * p}%`
    })
};