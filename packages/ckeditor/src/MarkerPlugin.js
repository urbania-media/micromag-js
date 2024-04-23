import { Plugin } from '@ckeditor/ckeditor5-core';

export default class MarkerPlugin extends Plugin {
    init() {
        const options = this.editor.config.get('highlight.options') || [];
        const markers = options.filter(({ color = null }) => color !== null);

        this.editor.conversion.attributeToElement({
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
    }
}
