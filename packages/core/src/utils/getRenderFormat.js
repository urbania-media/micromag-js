const getRenderFormat = renderFormat => {
    const isPlaceholder = renderFormat === 'placeholder';
    const isPreview = renderFormat === 'preview';
    const isSimple = isPlaceholder || isPreview;

    return {
        isPlaceholder,
        isPreview,
        isSimple,
    };
};

export default getRenderFormat;
