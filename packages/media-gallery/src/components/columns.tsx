import isArray from 'lodash-es/isArray';
import isString from 'lodash-es/isString';
import omit from 'lodash-es/omit';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useDisplaysComponents } from '@panneau/core/contexts';
import { getComponentFromName } from '@panneau/core/utils';

// @note Panneau's table passes the column's props to the actions display, its label included,
// and each action button takes it as its own label: every button showed "Actions" (the column
// header). A click on that text, which isn't a button, was also taken by the row as a selection,
// so the edit and delete buttons selected the media instead. Without that label, the restore
// action of the trash (added by Panneau without an icon) would be empty: it gets its icon back
type ColumnAction = string | { id?: string; icon?: string | null; [key: string]: unknown };

function ActionsColumn(props: Record<string, unknown>) {
    const displayComponents = useDisplaysComponents();
    const ActionsDisplay = getComponentFromName('actions', displayComponents, null);
    const { actions = null } = props as { actions?: ColumnAction[] | null };
    const finalActions = isArray(actions)
        ? actions.map((action) =>
              !isString(action) && action.id === 'restore' && !action.icon
                  ? { ...action, icon: 'box-arrow-left' }
                  : action,
          )
        : actions;
    return ActionsDisplay !== null ? (
        <ActionsDisplay {...omit(props, ['label'])} actions={finalActions} />
    ) : null;
}

export default [
    {
        id: 'image',
        label: null,
        component: 'image',
        path: 'thumbnail_url',
        sortable: false,
    },
    {
        id: 'name',
        label: <FormattedMessage defaultMessage="File name" description="Field name" />,
        component: 'text-description',
        path: 'name',
        descriptionPath: 'type',
        descriptionValues: {
            image: <FormattedMessage defaultMessage="Image" description="Media type" />,
            video: <FormattedMessage defaultMessage="Video" description="Media type" />,
            audio: <FormattedMessage defaultMessage="Audio" description="Media type" />,
            document: <FormattedMessage defaultMessage="Document" description="Media type" />,
        },
        sortable: true,
    },
    {
        id: 'dimensions',
        label: <FormattedMessage defaultMessage="Dimensions" description="Field name" />,
        component: 'unit',
        format: 'dimensions',
        path: 'metadata',
    },
    {
        id: 'size',
        label: <FormattedMessage defaultMessage="Size" description="Field name" />,
        component: 'unit',
        format: 'bytes',
        path: 'metadata.size',
    },
    {
        id: 'duration',
        label: <FormattedMessage defaultMessage="Duration" description="Field name" />,
        component: 'unit',
        format: 'duration',
        path: 'metadata.duration',
    },
    // {
    //     id: 'author',
    //     label: <FormattedMessage defaultMessage="Added by" description="Field name" />,
    //     component: 'avatar',
    //     path: 'metadata.author',
    //     namePath: 'name',
    //     withoutName: true,
    // },
    {
        id: 'created_at',
        label: <FormattedMessage defaultMessage="Created at" description="Field name" />,
        component: 'date',
        path: 'created_at',
        format: 'yyyy-MM-dd hh:ss',
        sortable: true,
    },
    {
        id: 'actions',
        label: <FormattedMessage defaultMessage="Actions" description="Field name" />,
        actions: ['edit', 'delete'],
        component: ActionsColumn,
        // component: ItemActions,
        // label: 'Edit',
        // url: '/edit/1',
    },
    // {
    //     id: 'status',
    //     label: <FormattedMessage defaultMessage="Status" description="Field name" />,
    //     component: 'text',
    //     path: 'metadata.status',
    // },
];
