import { defineMessage } from 'react-intl';

export default {
    id: 'drop-shadow',
    component: 'drop-shadow',
    fields: [
        {
            type: 'fields',
            isList: true,
            label: defineMessage({
                defaultMessage: 'Drop Shadow',
                description: 'Field label',
            }),
            fields: [
                {
                    name: 'dropShadowDistance',
                    type: 'number',
                    isHorizontal: true,
                    dataList: [1, 2, 3, 4, 5],
                    label: defineMessage({
                        defaultMessage: 'Distance',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'dropShadowBlur',
                    type: 'number',
                    isHorizontal: true,
                    dataList: [0, 1, 2, 3, 4, 5],
                    label: defineMessage({
                        defaultMessage: 'Blur',
                        description: 'Field label',
                    }),
                },
            ],
        },
    ]
}
