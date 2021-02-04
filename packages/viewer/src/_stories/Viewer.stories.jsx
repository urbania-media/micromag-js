/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import allScreensStory from '../../../../.storybook/data/stories/allScreens';
import faceAFace from '../../../../.storybook/data/stories/faceAFace';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import Viewer from '../components/ViewerContainer';

const props = {
    screenId: allScreensStory.components[0].id,
    story: allScreensStory,
    fullscreen: true,
};
const faceAFaceProps = {
    screenId: faceAFace.components[0].id,
    story: faceAFace,
    fullscreen: true,
};

const twoScreensProps = {
    ...faceAFaceProps,
    story: { ...faceAFace.story, components: faceAFace.components.slice(0, 2) },
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

export const AllScreens = () => <Viewer {...props} />;
export const FaceAFace = () => <Viewer {...faceAFaceProps} />;
export const Empty = () => <Viewer fullscreen />;
export const TwoScreens = () => <Viewer {...twoScreensProps} />;
export const CustomFonts = () => (
    <Viewer
        story={{
            components: [
                {
                    id: '1',
                    type: 'title',
                    layout: 'middle',
                    title: {
                        body: 'Un titre',
                        textStyle: {
                            align: 'center',
                            fontStyle: { bold: true },
                            fontFamily: {
                                type: 'custom',
                                name: 'CustomFont1',
                                media: 'media://1',
                            },
                        },
                    },
                },
            ],
            medias: {
                'media://1': {
                    type: 'font',
                    url: 'lien/vers/font.ttf',
                    metadata: {
                        // ...
                    },
                    files: {
                        woff: {
                            url: 'lien/vers/font.woff',
                        },
                        otf: {
                            url: 'lien/vers/font.otf',
                        },
                    }
                },
            },
        }}
        screenId="1"
        fullscreen
    />
);
