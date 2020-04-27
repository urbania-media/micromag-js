const getRenderFormat = renderFormat => {
    const isPlaceholder = renderFormat === 'placeholder';
    const isPreview = renderFormat === 'preview';
    const isEditor = renderFormat === 'edit';
    const isView = renderFormat === 'view';
    const isSimple = isPlaceholder || isPreview;

    return {
        isPlaceholder,
        isPreview,
        isSimple,
        isEditor,
        isView,
    };
};

export default getRenderFormat;
