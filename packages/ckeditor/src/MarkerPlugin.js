const MarkerPlugin = (editor) => {
    const options = editor.config.get('highlight.options') || [];
    const markers = options.filter(({ color = null }) => color !== null);
    //
    editor.conversion.attributeToElement({
        model: {
            key: 'highlight',
            values: markers.map(({ model }) => model),
        },
        view: markers.reduce(
            (map, { model, color }) => ({
                ...map,
                [model]: {
                    name: 'mark',
                    styles: {
                        'background-color': color,
                        'box-shadow': `0.05em 0px 0px ${color}, -0.05em 0px 0px ${color}`,
                    },
                },
            }),
            {},
        ),
    });
};

export default MarkerPlugin;
