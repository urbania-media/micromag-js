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
            width: 152,
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
                {
                    label: (
                        <FormattedMessage defaultMessage="Font" description="Filter item label" />
                    ),
                    value: 'font',
                },
            ],
            multiple: true,
        },
        {
            id: 'authors',
            component: 'select',
            name: 'authors',
            placeholder: <FormattedMessage defaultMessage="Authors" description="Filter label" />,
            requestUrl: route('medias.authors') || '/medias/authors',
            itemLabelPath: 'name',
            itemValuePath: 'id',
            multiple: true,
            paginated: false,
        },
        {
            id: 'tags',
            component: 'select',
            name: 'tags',
            placeholder: <FormattedMessage defaultMessage="Tags" description="Filter label" />,
            requestUrl: route('medias.tags') || '/medias/tags',
            itemLabelPath: 'name',
            itemValuePath: 'name',
            multiple: true,
            paginated: false,
        },
        {
            id: 'source',
            component: 'radios',
            name: 'source',
            options: [
                {
                    label: (
                        <FormattedMessage
                            defaultMessage="In this Micromag"
                            description="Media gallery source filter"
                        />
                    ),
                    value: 'document-',
                },
            ],
        },
    ];
}

export default filters;
