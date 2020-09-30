const getRenderFormat = (renderFormat) => {
    const isPlaceholder = renderFormat === 'placeholder';
    const isPreview = renderFormat === 'preview';
    const isEditor = renderFormat === 'edit';
    const isView = renderFormat === 'view';

    return {
        isPlaceholder,
        isPreview,
        isEditor,
        isView,
    };
};

export default getRenderFormat;
