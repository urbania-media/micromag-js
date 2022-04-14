/* eslint-disable react/jsx-props-no-spreading */
import { getJSON } from '@folklore/fetch';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import UrbaniaArticleText from './UrbaniaArticleText';
import UrbaniaArticleVideo from './UrbaniaArticleVideo';
import styles from './styles.module.scss';

const propTypes = {
    url: PropTypes.string,
    article: PropTypes.shape({}),
    video: MicromagPropTypes.videoElement,
};

const defaultProps = {
    url: null,
    article: null,
    video: null,
};

const UrbaniaArticle = ({ url, video, article: initialArticle, ...props }) => {
    const [article, setArticle] = useState(initialArticle);
    const { width, height } = useScreenSize();
    const { isPlaceholder } = useScreenRenderContext();

    // get resized video style props
    const { media: videoMedia = null } = video || {};

    useEffect(() => {
        if (url !== null) {
            // TODO: fix cors on urbania.ca
            getJSON(`${url}.json`, { mode: 'cors' }).then((art) => {
                setArticle(art);
            });
        }
    }, [url, setArticle]);

    const values = useMemo(() => {
        console.log(article);
        const { title = null, metadata = {} } = article || {};
        const { authors = [], sponsors = [], site = 'urbania' } = metadata || {};

        return {
            title,
            authors,
            sponsors,
            site,
        };
    }, [article]);

    console.log(article);

    return videoMedia !== null ? (
        <UrbaniaArticleVideo {...values} {...props} />
    ) : (
        <UrbaniaArticleText {...values} {...props} />
    );
};

UrbaniaArticle.propTypes = propTypes;
UrbaniaArticle.defaultProps = defaultProps;

export default React.memo(UrbaniaArticle);
