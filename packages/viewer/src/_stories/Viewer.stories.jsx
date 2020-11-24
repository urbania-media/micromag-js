/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { basic } from '../../../../.storybook/data/screens';
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
const faceAFaceProps = {
    screenId: faceAFace.components[0].id,
    story: faceAFace,
    fullscreen: true,
};

export default {
    component: Viewer,
    decorators: [
        withGoogleMaps,
        (Story) => (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                <Story />
            </div>
        ),
    ],
    title: 'Viewer/Viewer',
    parameters: {
        intl: true,
    },
};

export const Default = () => <Viewer {...props} />;
export const FaceAFace = () => <Viewer {...faceAFaceProps} />;
