// import { defaultTheme } from '#.storybook/data/themes/micromag-default';
import withGoogleMaps from '#.storybook/decorators/withGoogleMaps';
import preview from '#.storybook/preview';
import React, { useState } from 'react';

import { StoryProvider } from '../../../core/src/contexts';
import ScreensProvider from '../../../screens/src/ScreensProvider';
import ScreensMenu from '../components/menus/ScreensMenu';

import AllScreensStory from '#.storybook/data/stories/all-screens.json';

const meta = preview.meta({
    component: ScreensMenu,
    title: 'Editor/ScreensMenu',
    decorators: [withGoogleMaps],

    parameters: {
        intl: true,
    },
});

const ScreensMenuContainer = ({ story = null }) => {
    const [value] = useState(story);
    return (
        <StoryProvider story={value}>
            <ScreensProvider>
                <ScreensMenu items={value.components} />
            </ScreensProvider>
        </StoryProvider>
    );
};

export const TestUrbania = meta.story(() => (
    <div style={{ backgroundColor: '#FFF' }}>
        <ScreensMenuContainer story={AllScreensStory} />
    </div>
));
