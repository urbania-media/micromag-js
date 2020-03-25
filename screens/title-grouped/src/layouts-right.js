import normal from './layouts-normal';

const right = normal.map(a => ({
    ...a,
    props: { ...a.props, textAlign: 'right' },
}));

export default right;
