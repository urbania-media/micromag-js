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

    const hostname = useMemo(() => {
        const { hostname: urlHostname = null } = url !== null ? new URL(url) : {};
        return urlHostname;
    }, [url]);

    useEffect(() => {
        if (url !== null) {
            console.log('heyy', url);
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
            author = null,
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

        const defaultType = videoMedia !== null ? 'video' : type;
        return {
            type: defaultType,
            title: titleBody !== null ? title : { ...title, body: articleTitle },
            overTitle: overTitleBody !== null ? overTitle : { ...overTitle, body: 'En vedette' },
            authors: authors.map(({ name = null, url: authorUrl = null, ...otherProps }) => ({
                name: { body: `<p>${name}</p>` },
                url: `${hostname}${authorUrl}`,
                ...otherProps,
            })),
            author,
            sponsor:
                defaultSponsor !== null
                    ? [{ ...sponsor, body: `<strong>${defaultSponsor || sponsorBody}</strong>` }]
                    : null,
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
                label: defaultType === 'video' ? { body: 'Regarder' } : { body: 'Lire' },
                icon: defaultType === 'video' ? { id: 'play' } : null,
                inWebView: true,
                ...callToAction,
            },
        };
    }, [article, url, hostname, props]);

    console.log('values', url, values);

    return <UrbaniaArticle {...props} {...values} hasArticle={url !== null} />;
};

UrbaniaLoader.propTypes = propTypes;
UrbaniaLoader.defaultProps = defaultProps;

export default React.memo(UrbaniaLoader);
