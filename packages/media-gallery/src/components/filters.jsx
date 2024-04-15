import { useUrlGenerator } from '@folklore/routes';
import React from 'react';
import { FormattedMessage } from 'react-intl';

function filters() {
    const route = useUrlGenerator();
    return [
        {
            id: 'types',
            component: 'select',
            name: 'types',
            placeholder: <FormattedMessage defaultMessage="Type" description="Filter label" />,
            options: [
                {
                    label: (
                        <FormattedMessage defaultMessage="Image" description="Filter item label" />
                    ),
                    value: 'image',
                },
                {
                    label: (
                        <FormattedMessage defaultMessage="Video" description="Filter item label" />
                    ),
                    value: 'video',
                },
                {
                    label: (
                        <FormattedMessage defaultMessage="Audio" description="Filter item label" />
                    ),
                    value: 'audio',
                },
            ],
            multiple: true,
        },
        {
            id: 'author',
            component: 'select',
            name: 'author',
            placeholder: <FormattedMessage defaultMessage="Author" description="Filter label" />,
            requestUrl: route('medias.authors') || '/api/medias/authors',
            itemLabelPath: 'name',
            multiple: true,
        },
        {
            id: 'tag',
            component: 'select',
            name: 'tag',
            placeholder: <FormattedMessage defaultMessage="Tag" description="Filter label" />,
            requestUrl: route('medias.tags') || '/api/medias/tags',
            multiple: true,
        },
        {
            id: 'search',
            component: 'search',
            name: 'search',
        },
    ];
}

export default filters;