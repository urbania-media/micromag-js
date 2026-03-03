/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import type { TextElement } from '@micromag/core';
import TitleScreen from './Title';

interface TitleSubtitleCreditsScreenProps {
    credits?: TextElement;
}

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

export default TitleSubtitleCreditsScreen;
