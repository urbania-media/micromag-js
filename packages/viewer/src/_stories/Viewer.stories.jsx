/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { basic/* , medium */ } from '../../../../.storybook/data/screens';
import faceAFace from '../../../../.storybook/data/stories/faceAFace';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';

import Viewer from '../components/ViewerContainer';

const props = {
    screenId: basic[0].id,
    story: {
        components: basic,
    },
    fullscreen: true,
};

// const mediumProps = {
//     screenId: medium[0].id,
//     story: {
//         components: medium,
//     },
// };

const faceAFaceProps = {
    screenId: faceAFace[0].id,
    story: {
        components: faceAFace,
    },
    fullscreen: true,
};

export default {
    component: Viewer,
    decorators: [withGoogleMaps],
    title: 'Viewer/Viewer',
    parameters: {
        screenSize: true,
        intl: true,
    },
};

export const Default = () => <Viewer {...props} />;

export const FaceAFace = () => <Viewer {...faceAFaceProps} />;

export const Swipe = () => <Viewer {...props} interactions={['swipe']} />;

export const Tap = () => <Viewer {...props} interactions={['tap']} />;

export const Both = () => <Viewer {...props} interactions={['swipe', 'tap']} />;

// export const SwipeMedium = () => <Viewer {...mediumProps} interactions={['swipe']} />;
