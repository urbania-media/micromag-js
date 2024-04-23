import { useUrlGenerator } from '@folklore/routes';
import React from 'react';
import { FormattedMessage } from 'react-intl';

function filters() {
    const route = useUrlGenerator();
    return [
        {
            id: 'search',
            component: 'search',
            name: 'search',
        },
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
            id: 'source',
            component: 'select',
            placeholder: <FormattedMessage defaultMessage="Source" description="Filter label" />,
            name: 'source',
            options: [
                {
                    label: (
                        <FormattedMessage defaultMessage="All" description="Filter item label" />
                    ),
                    value: 'all',
                },
                {
                    label: (
                        <FormattedMessage
                            defaultMessage="This micromag"
                            description="Filter item label"
                        />
                    ),
                    value: 'video',
                },
            ],
        },
        {
            id: 'authors',
            component: 'select',
            name: 'authors',
            placeholder: <FormattedMessage defaultMessage="Author" description="Filter label" />,
            requestUrl: route('medias.authors') || '/api/medias/authors',
            itemLabelPath: 'name',
            multiple: true,
        },
        {
            id: 'tags',
            component: 'select',
            name: 'tags',
            placeholder: <FormattedMessage defaultMessage="Tag" description="Filter label" />,
            requestUrl: route('medias.tags.get') || '/api/medias/tags',
            itemLabelPath: 'name',
            itemValuePath: 'id',
            multiple: true,
            // requestQuery: { page: 1 },
            paginated: true,
            // options: null,
        },
    ];
}

export default filters;
