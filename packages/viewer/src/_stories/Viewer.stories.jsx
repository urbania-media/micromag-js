/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { webfontFiles, webfont2Files, webfont3Files } from '../../../../.storybook/data';

import basic from '../../../../.storybook/data/stories/basic.json';
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

export const Basic = () => <Viewer story={basic} />;

export const Integrated = () => {
    const [fullscreen, setFullscreen] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const { landscape = false } = viewMode || {};
    const closeable = fullscreen && !landscape;

    const onClose = useCallback( () => {
        setFullscreen(false);
    }, [setFullscreen]);

    const onStart = useCallback( () => {
        setFullscreen(true);
    }, [setFullscreen]);

    const onEnd = useCallback( () => {
        setFullscreen(false);
    }, [setFullscreen]);

    return (
        <Viewer
            {...faceAFaceProps}
            closeable={closeable}
            onClose={onClose}
            onStart={onStart}
            onEnd={onEnd}
            onViewModeChange={setViewMode}
        />
    )
};

export const AllScreens = () => <Viewer {...props} />;
export const FaceAFace = () => <Viewer {...faceAFaceProps} />;
export const Empty = () => <Viewer fullscreen basePath="/story-path" />;
export const TwoScreens = () => <Viewer {...twoScreensProps} />;
export const CustomFonts = () => (
    <Viewer
        story={{
            components: [
                {
                    id: '1',
                    type: 'title-subtitle-credits',
                    layout: 'middle',
                    title: {
                        body: 'MonumentExtended Black',
                        textStyle: {
                            align: 'center',
                            fontStyle: { bold: true, italic: true },
                            fontSize: 26,
                            lineHeight: 4,
                            fontFamily: {
                                type: 'custom',
                                name: 'MonumentExtended Black',
                                media: 'media://1',
                            },
                        },
                    },
                    subtitle: {
                        body: 'LibreFranklin Italic 600',
                        textStyle: {
                            align: 'center',
                            fontStyle: { bold: true, italic: true },
                            fontFamily: {
                                type: 'custom',
                                name: 'LibreFranklin Italic600',
                                media: 'media://2',
                            },
                        },
                    },
                    credits: {
                        body: 'Roboto',
                        textStyle: {
                            align: 'center',
                            fontStyle: { bold: true, italic: true, underline: true },
                            fontFamily: {
                                type: 'google',
                                name: 'Roboto',
                            },
                        },
                    },
                },
                {
                    id: '2,',
                    type: 'title',
                    layout: 'middle',
                    title: {
                        body: 'SourceCodePro-Regular',
                        textStyle: {
                            align: 'center',
                            fontStyle: {},
                            fontFamily: {
                                type: 'custom',
                                name: 'SourceCodePro-Regular',
                                media: 'media://3',
                            },
                        },
                    },
                },
            ],
            medias: {
                'media://1': {
                    type: 'font',
                    files: webfontFiles,
                },
                'media://2': {
                    type: 'font',
                    files: webfont2Files,
                },
                'media://3': {
                    type: 'font',
                    files: webfont3Files,
                },
            },
        }}
        screenId="1"
        fullscreen
    />
);
