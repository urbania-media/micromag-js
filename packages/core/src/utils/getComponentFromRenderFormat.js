const getComponentFromRenderFormat = (
    renderFormat,
    isEmpty = false,
    { view = () => null, empty = () => null, placeholder = () => null, preview = null },
) => {
    const isPlaceholder = renderFormat === 'placeholder';
    const isPreview = renderFormat === 'preview';
    const isEditor = renderFormat === 'edit';
    // const isView = renderFormat === 'view';

    // console.log('placeh, preview, editor, view', isPlaceholder, isPreview, isEditor, isView);

    if (isPlaceholder) {
        return placeholder();
    }

    if (isPreview && preview !== null) {
        return preview();
    }

    if (isEditor && isEmpty) {
        if (isEmpty) {
            return empty();
        }
        return view();
    }

    return view();
};

export default getComponentFromRenderFormat;
