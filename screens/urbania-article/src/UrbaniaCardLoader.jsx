/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import UrbaniaBaseArticleCard from './UrbaniaBaseArticleCard';
import UrbaniaLoader from './UrbaniaLoader';

function UrbaniaCardLoader(props) {
    const { cardCallToAction = {} } = props || {};

    return (
        <UrbaniaLoader
            component={UrbaniaBaseArticleCard}
            callToAction={cardCallToAction}
            {...props}
        />
    );
}

export default UrbaniaCardLoader;
