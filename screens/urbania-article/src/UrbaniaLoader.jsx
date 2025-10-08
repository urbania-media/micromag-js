/* eslint-disable react/jsx-props-no-spreading */
import { getJSON } from '@folklore/fetch';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { isTextFilled, isValidUrl } from '@micromag/core/utils';

import UrbaniaBaseArticle from './UrbaniaBaseArticle';

const propTypes = {
    component: PropTypes.elementType,
    // theme: PropTypes.string,
    title: MicromagPropTypes.headingElement,
    articleType: PropTypes.string,
    overTitle: PropTypes.shape({
        body: PropTypes.string,
    }),
    sponsorLabel: PropTypes.shape({
        body: PropTypes.string,
    }),
    author: MicromagPropTypes.authorElement,
    image: MicromagPropTypes.image,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    url: PropTypes.string,
    article: PropTypes.shape({
        type: PropTypes.string,
    }),
};

const defaultProps = {
    component: UrbaniaBaseArticle,
    // theme: null,
    title: null,
    articleType: null,
    overTitle: null,
    sponsorLabel: null,
    author: null,
    image: null,
    header: null,
    footer: null,
    url: null,
    article: null,
};

const UrbaniaLoader = ({
    component: Component,
    // theme = null,
    title = null,
    articleType = null,
    overTitle = null,
    sponsorLabel = null,
    author = null,
    image = null,
    header = null,
    footer = null,
    url = null,
    article: initialArticle,
    ...props
}) => {
    const [article, setArticle] = useState(initialArticle);

    const finalUrl =
        url !== null && isValidUrl(url)
            ? url.replace(/^https?:\/\/([^.]+\.)?urbania\.(ca|ƒr)\//, 'https://urbania.$2/')
            : null;

    useEffect(() => {
        if (finalUrl !== null) {
            getJSON(`https://api.urbania.ca/documents?uri=${finalUrl}`, { mode: 'cors' })
                .then((art) => {
                    // console.log('art loaded', art);
                    setArticle(art || null);
                })
                .catch((e) => {
                    // console.log('art error', e);
                    setArticle(null);
                });
        }
    }, [url, finalUrl, setArticle]);

    const values = useMemo(() => {
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

        const { authors = [], sponsors = [], brands = [] } = metadata || {};

        const [creditAuthor = null] = authors || [];
        const [{ handle: site = null } = {}] = brands || [];

        const { sizes = {} } = articleImage || {};
        const { medium = {}, large = {} } = sizes || {};
        const { name: authorName = null, image: authorImage = null } = creditAuthor || {};

        const hasCreditAuthorName = authorName !== null && authorName !== '';

        const finalArticleAuthor = {
            ...(hasCreditAuthorName ? { name: { body: `<p>${authorName}</p>` } } : null),
            ...(authorImage !== null ? { image: authorImage } : null),
        };

        // Type
        const defaultType = articleType || type;

        // Sponsors
        const defaultSponsor =
            (sponsors || []).length > 0
                ? (sponsors || [])
                      .map(({ organisation: { name = null } = {} }) => name)
                      .filter((name) => name !== null)
                      .join(', ')
                      .trim()
                : null;

        // Content
        const hasTitle = isTextFilled(title);
        const hasOverTitle = isTextFilled(overTitle);
        const hasSponsorProps = isTextFilled(sponsorLabel);
        const hasAuthorProps = author !== null && author.name !== null && isTextFilled(author.name);

        const sponsorPrefix =
            !hasSponsorProps && defaultSponsor !== null ? (
                <FormattedMessage defaultMessage="Presented by" description="Sponsor label" />
            ) : null;

        return {
            type: defaultType,
            title: hasTitle ? title : { ...title, body: articleTitle },
            articleTitle,
            overTitle: hasOverTitle ? overTitle : { ...overTitle, body: 'En vedette' },
            author: { ...finalArticleAuthor, ...(hasAuthorProps ? author : null) },
            sponsors:
                defaultSponsor !== null && !hasSponsorProps
                    ? [{ ...sponsorLabel, body: `<strong>${defaultSponsor}</strong>` }]
                    : [sponsorLabel],
            sponsorPrefix,
            site,
            image:
                imageUrl !== null && image !== null
                    ? image
                    : { type: 'image', ...articleImage, sizes: { medium, large } },
            url: finalUrl,
            header,
            footer: {
                ...footer,
                callToAction: {
                    type: 'swipe-up',
                    label: defaultType === 'video' ? { body: 'Regarder' } : { body: 'Lire' },
                    inWebView: true,
                    ...callToAction,
                    ...(hasArticle ? { active: finalUrl !== null } : null),
                    url: ctaUrl || finalUrl,
                },
            },
        };
    }, [
        article,
        url,
        title,
        finalUrl,
        props,
        articleType,
        overTitle,
        sponsorLabel,
        author,
        image,
        header,
        footer,
    ]);

    const { title: articleTitle = null } = values || {};
    const { body: titleBody = null } = articleTitle || {};

    return <Component {...props} {...values} hasArticle={titleBody !== null} />;
};

UrbaniaLoader.propTypes = propTypes;
UrbaniaLoader.defaultProps = defaultProps;

export default UrbaniaLoader;
