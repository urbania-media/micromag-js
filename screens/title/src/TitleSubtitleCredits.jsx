/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import TitleScreen from './Title';

const propTypes = {
    credits: MicromagPropTypes.textElement,
};

const TitleSubtitleCreditsScreen = ({ credits = null, ...props }) => (
    <TitleScreen
        {...props}
        description={credits}
        withSubtitle
        withDescription
        descriptionEmptyLabel={
            <FormattedMessage defaultMessage="Credits" description="Credits placeholder" />
        }
    />
);

TitleSubtitleCreditsScreen.propTypes = propTypes;

export default TitleSubtitleCreditsScreen;
