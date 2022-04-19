/* eslint-disable react/jsx-props-no-spreading */
import { getJSON } from '@folklore/fetch';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import UrbaniaArticle from './UrbaniaArticle';

const propTypes = {
    url: PropTypes.string,
    article: PropTypes.shape({}),
};

const defaultProps = {
    url: null,
    article: null,
};

const UrbaniaLoader = ({ url, article: initialArticle, ...props }) => {
    const [article, setArticle] = useState(initialArticle);
    console.log('fuuuu');

    useEffect(() => {
        if (url !== null) {
            // TODO: fix cors on urbania.ca
            getJSON(`${url}.json`, { mode: 'cors' }).then((art) => {
                setArticle(art);
            });
        }
    }, [url, setArticle]);

    const values = useMemo(() => {
        console.log('article', article);

        const {
            title = {},
            overTitle = {},
            sponsor = {},
            image = {},
            video = {},
            callToAction = null,
        } = props || {};
        const { body: titleBody = null } = title || {};
        const { body: overTitleBody = null } = overTitle || {};
        const { body: sponsorBody = null } = sponsor || {};
        const { url: imageUrl = null } = image || {};
        const { media: videoMedia = null } = video || {};

        // Straight from article
        const {
            type = null,
            title: articleTitle = null,
            image: articleImage = null,
            metadata = {},
        } = article || {};
        const { authors = [], sponsors = [], site = null, canonical = null } = metadata || {};
        const { sizes = {} } = articleImage || {};
        const { medium, large } = sizes || {};

        // Sponsors
        const sponsorPrefix =
            sponsorBody === null ? (
                <FormattedMessage defaultMessage="Presented by" description="Sponsor label" />
            ) : null;
        const defaultSponsor =
            (sponsors || []).length > 0
                ? (sponsors || [])
                      .map(({ name = null }) => name)
                      .filter((name) => name !== null)
                      .join(', ')
                      .trim()
                : null;

        return {
            type,
            title: titleBody !== null ? title : { ...title, body: articleTitle },
            overTitle: overTitleBody !== null ? overTitle : { ...overTitle, body: 'En vedette' },
            authors,
            sponsor: { ...sponsor, body: defaultSponsor || sponsorBody },
            sponsorPrefix,
            site,
            image:
                imageUrl !== null
                    ? image
                    : { type: 'image', ...articleImage, sizes: { medium, large } },
            video: { ...video },
            callToAction: {
                active: true,
                type: 'swipe-up',
                url: videoMedia !== null ? videoMedia.url : canonical,
                label: type === 'video' ? { body: 'Regarder' } : { body: 'Lire' },
                inWebView: true,
                ...callToAction,
            },
        };
    }, [article, props]);

    console.log('values', values);

    return <UrbaniaArticle {...props} {...values} />;
};

UrbaniaLoader.propTypes = propTypes;
UrbaniaLoader.defaultProps = defaultProps;

export default React.memo(UrbaniaLoader);
