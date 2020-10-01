const getLayoutParts = (layout = null) => {
    const [horizontal, vertical, suffix] =
        layout !== null && layout.indexOf('-') !== false ? layout.split('-') : [layout, null, null];

    return { horizontal, vertical, suffix };
};

export default getLayoutParts;
