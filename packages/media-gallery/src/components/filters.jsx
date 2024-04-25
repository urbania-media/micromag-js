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
            width: 220,
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
        // TODO: fix this on micromag.ca
        // {
        //     id: 'authors',
        //     component: 'select',
        //     name: 'authors',
        //     placeholder: <FormattedMessage defaultMessage="Authors" description="Filter label" />,
        //     requestUrl: route('medias.authors') || '/api/medias/authors',
        //     itemLabelPath: 'name',
        //     itemValuePath: 'id',
        //     multiple: true,
        // },
        {
            id: 'tags',
            component: 'select',
            name: 'tags',
            placeholder: <FormattedMessage defaultMessage="Tags" description="Filter label" />,
            requestUrl: route('medias.tags') || '/api/medias/tags',
            itemLabelPath: 'name',
            itemValuePath: 'id',
            multiple: true,
            paginated: true,
        },
        {
            id: 'source',
            component: 'toggle',
            label: <FormattedMessage defaultMessage="This micromag" description="Filter label" />,
            name: 'source',
        },
    ];
}

export default filters;
