import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { TextElement } from '@micromag/core';

import TitleScreen from './Title';

interface TitleSubtitleCreditsScreenProps {
    credits?: TextElement | null;
}

function TitleSubtitleCreditsScreen({ credits = null, ...props }: TitleSubtitleCreditsScreenProps) {
    return (
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
}

export default TitleSubtitleCreditsScreen;
