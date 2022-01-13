import React from 'react';
import { FormattedMessage } from 'react-intl';

export const useSearchFilters = ({
    recent = [],
    tags = [],
    team = [],
    sources: upstreamSources = [],
    withType = false,
    storyId = null,
}) => {
    const sources = [
        ...(storyId !== null
            ? [
                  {
                      label: (
                          <FormattedMessage
                              defaultMessage="This Micromag"
                              description="Media gallery source"
                          />
                      ),
                      value: storyId,
                  },
              ]
            : []),
        {
            label: (
                <FormattedMessage defaultMessage="All sources" description="Media gallery source" />
            ),
            value: 'all',
        },
        ...(team !== null && team.length > 0
            ? [
                  {
                      label: (
                          <FormattedMessage
                              defaultMessage="My files"
                              description="Media gallery source"
                          />
                      ),
                      value: 'user',
                  },
              ]
            : []),
        ...upstreamSources,
    ].filter((it) => it !== null);

    const types = [
        {
            label: <FormattedMessage defaultMessage="Images" description="Media label" />,
            value: 'image',
        },
        {
            label: <FormattedMessage defaultMessage="Videos" description="Media label" />,
            value: 'video',
        },
        {
            label: <FormattedMessage defaultMessage="Audios" description="Media label" />,
            value: 'audio',
        },
    ];

    const usage = [
        {
            label: <FormattedMessage defaultMessage="Unused" description="Media label" />,
            value: 'unused',
        },
        {
            label: <FormattedMessage defaultMessage="Used" description="Media label" />,
            value: 'used',
        },
    ];

    const sections = [
        withType
            ? {
                  value: 'types',
                  label: <FormattedMessage defaultMessage="Types" description="Media label" />,
                  items: types,
              }
            : null,
        {
            value: 'recent',
            label: <FormattedMessage defaultMessage="Recent searches" description="Media label" />,
            items: recent,
        },
        {
            value: 'tags',
            label: <FormattedMessage defaultMessage="Tags" description="Media label" />,
            items: tags,
        },
        {
            value: 'users',
            label: <FormattedMessage defaultMessage="Added by" description="Media label" />,
            items: team,
        },
        {
            value: 'usage',
            label: <FormattedMessage defaultMessage="Usage" description="Media label" />,
            items: usage,
        },
    ].filter((it) => it !== null);

    return {
        sources,
        sections,
        types,
    };
};

export default useSearchFilters;
