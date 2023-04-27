/* eslint-disable react/jsx-props-no-spreading */
import { getJSON } from '@folklore/fetch';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { isTextFilled, isValidUrl } from '@micromag/core/utils';

import UrbaniaArticle from './UrbaniaArticle';

const propTypes = {
    url: PropTypes.string,
    article: PropTypes.shape({
        type: PropTypes.string,
    }),
};

const defaultProps = {
    url: null,
    article: null,
};

const UrbaniaLoader = ({ url, article: initialArticle, ...props }) => {
    const [article, setArticle] = useState(initialArticle);

    const hostname = useMemo(() => {
        const { hostname: urlHostname = null } =
            url !== null && isValidUrl(url) ? new URL(url) : {};
        return urlHostname;
    }, [url]);

    useEffect(() => {
        if (url !== null && isValidUrl(url)) {
            getJSON(`${url}.json`, { mode: 'cors' }).then((art) => {
                setArticle(art || null);
            });
        }
    }, [url, setArticle]);

    const values = useMemo(() => {
        const {
            articleType = null,
            title = {},
            overTitle = {},
            sponsor = {},
            author = null,
            image = {},
            footer = {},
        } = props || {};
        const { url: imageUrl = null } = image || {};
        const { callToAction = null } = footer || {};
        const { url: ctaUrl = null } = callToAction || {};

        // Straight from article
        const {
            type = null,
            title: articleTitle = null,
            image: articleImage = null,
            metadata = {},
        } = article || {};

        const hasArticle = article !== null;

        const {
            authors = [],
            sponsors = [],
            site = null,
            canonical = null,
            readerUrl = null,
        } = metadata || {};
        const { sizes = {} } = articleImage || {};
        const { medium, large } = sizes || {};
        const articleAuthor = (authors || []).length > 0 ? authors[0] : null;
        const { name: authorName = null, avatar: authorImage = null } = articleAuthor || {};
        const finalArticleAuthor = {
            ...(authorName !== null ? { name: { body: `<p>${authorName}</p>` } } : null),
            ...(authorImage !== null ? { image: authorImage } : null),
        };

        // Type
        const defaultType = articleType || type;

        // Sponsors
        const defaultSponsor =
            (sponsors || []).length > 0
                ? (sponsors || [])
                      .map(({ name = null }) => name)
                      .filter((name) => name !== null)
                      .join(', ')
                      .trim()
                : null;

        // Content
        const hasTitle = isTextFilled(title);
        const hasOverTitle = isTextFilled(overTitle);
        const hasSponsorProps = isTextFilled(sponsor);

        const sponsorPrefix =
            !hasSponsorProps && defaultSponsor !== null ? (
                <FormattedMessage defaultMessage="Presented by" description="Sponsor label" />
            ) : null;
        console.log(ctaUrl);

        return {
            type: defaultType,
            title: hasTitle ? title : { ...title, body: articleTitle },
            overTitle: hasOverTitle ? overTitle : { ...overTitle, body: 'En vedette' },
            author: { ...finalArticleAuthor, ...author },
            sponsors:
                defaultSponsor !== null && !hasSponsorProps
                    ? [{ ...sponsor, body: `<strong>${defaultSponsor}</strong>` }]
                    : [sponsor],
            sponsorPrefix,
            site,
            image:
                imageUrl !== null
                    ? image
                    : { type: 'image', ...articleImage, sizes: { medium, large } },
            footer: {
                ...footer,
                callToAction: {
                    type: 'swipe-up',
                    label: defaultType === 'video' ? { body: 'Regarder' } : { body: 'Lire' },
                    // icon: defaultType === 'video' ? { id: 'play' } : null,
                    inWebView: true,
                    ...callToAction,
                    ...(hasArticle ? { active: true } : null),
                    url: ctaUrl || readerUrl || canonical,
                },
            },
        };
    }, [article, url, hostname, props]);

    return <UrbaniaArticle {...props} {...values} hasArticle={url !== null} />;
};

UrbaniaLoader.defaultProps = defaultProps;

export default React.memo(UrbaniaLoader);
