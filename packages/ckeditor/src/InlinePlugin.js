const InlinePlugin = (editor) => {
    editor.conversion.elementToElement({ model: 'paragraph', view: 'span' });
};

export default InlinePlugin;
