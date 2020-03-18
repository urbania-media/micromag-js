import arrangements from './arrangements';

const leftArrangements = arrangements.map(a => ({
    ...a,
    props: { ...a.props, textAlign: 'right' },
}));

export default leftArrangements;
