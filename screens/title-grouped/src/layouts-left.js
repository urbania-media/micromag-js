import normal from './layouts-normal';

const left = normal.map(a => ({
    ...a,
    props: { ...a.props, textAlign: 'left' },
}));

export default left;
