import arrangements from './arrangements';

const leftArrangements = arrangements.map(a => ({
    ...a,
    props: { ...a.props, textAlign: 'left' },
}));

export default leftArrangements;
