import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

// import { defaultTheme } from '../../../../.storybook/data/themes/micromag-default';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import { StoryProvider } from '../../../core/src/contexts';
import ScreensProvider from '../../../screens/src/ScreensProvider';
import ScreensMenu from '../components/menus/ScreensMenu';

import AllScreensStory from '../../../../.storybook/data/stories/all-screens.json';

export default {
    component: ScreensMenu,
    title: 'Editor/ScreensMenu',
    decorators: [withGoogleMaps],
    parameters: {
        intl: true,
    },
};

const ScreensMenuContainer = ({ story }) => {
    const [value] = useState(story);
    return (
        <StoryProvider story={value}>
            <ScreensProvider>
                <ScreensMenu items={value.components} />
            </ScreensProvider>
        </StoryProvider>
    );
};

ScreensMenuContainer.propTypes = {
    story: PropTypes.shape({
        title: PropTypes.string,
        components: MicromagPropTypes.screenComponents,
    }),
};
ScreensMenuContainer.defaultProps = {
    story: null,
};

export const TestUrbania = () => (
    <div style={{ backgroundColor: '#FFF' }}>
        <ScreensMenuContainer story={AllScreensStory} />
    </div>
);
