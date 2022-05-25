/* eslint-disable no-console */

/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import {
    audioMedia,
    imageMedia,
    video360Media,
    videoMedia,
    gifVideoMedia,
    webfont2Files,
    webfont3Files,
    webfontFiles,
} from '../../../../.storybook/data';
import allScreensStory from '../../../../.storybook/data/stories/allScreens';
import basic from '../../../../.storybook/data/stories/basic.json';
import faceAFace from '../../../../.storybook/data/stories/faceAFace';
import videoAudio from '../../../../.storybook/data/stories/videoAudio';
import treeTheme from '../../../../.storybook/data/themes/tree';
import viewerTheme from '../../../../.storybook/data/viewerTheme';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import Viewer from '../components/ViewerContainer';

const props = {
    screenId: allScreensStory.components[0].id,
    story: allScreensStory,
};

const faceAFaceProps = {
    screenId: faceAFace.components[0].id,
    story: faceAFace,
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

const customScreen = () => <div>Custom</div>;

export const Custom = () => (
    <Viewer
        story={{ components: [{ id: '1324', type: 'custom' }] }}
        screenComponents={{ custom: customScreen }}
    />
);

export const Basic = () => <Viewer story={basic} ç />;

export const Integrated = () => {
    const [fullscreen, setFullscreen] = useState(false);
    const [viewMode, setViewMode] = useState(null);
    const { landscape = false } = viewMode || {};

    const onClose = useCallback(() => {
        setFullscreen(false);
    }, [setFullscreen]);

    const onInteraction = useCallback(() => {
        setFullscreen(true);
    }, [setFullscreen]);

    const onEnd = useCallback(() => {
        setFullscreen(false);
    }, [setFullscreen]);

    return (
        <Viewer
            {...faceAFaceProps}
            closeable={fullscreen && !landscape}
            onClose={onClose}
            onInteraction={onInteraction}
            onEnd={onEnd}
            onViewModeChange={setViewMode}
        />
    );
};

export const Tree = () => <Viewer story={treeTheme} withNavigationHint />;

export const VideoAudio = () => <Viewer story={videoAudio} />;

export const WithScroll = () => (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'scroll' }}>
        <div style={{ position: 'relative', width: '100%', height: 2000 }}>
            <div style={{ position: 'relative', width: '100%', height: 560 }}>
                <Viewer
                    {...faceAFaceProps}
                    closeable
                    onClose={() => console.log('close')}
                    onStart={() => console.log('start')}
                    onEnd={() => console.log('end')}
                    onViewModeChange={(viewMode) => {
                        console.log(viewMode);
                    }}
                />
            </div>
        </div>
    </div>
);

export const AllScreens = () => <Viewer {...props} />;
export const FaceAFace = () => <Viewer {...faceAFaceProps} withNavigationHint />;
export const Empty = () => <Viewer basePath="/story-path" />;
export const TwoScreens = () => <Viewer {...twoScreensProps} />;
export const MultipleAudios = () => (
    <Viewer
        screenId="1"
        story={{
            components: [
                {
                    id: '1',
                    type: 'audio',
                    audio: {
                        media: audioMedia(),
                    },
                },
                {
                    id: '2',
                    type: 'audio',
                    audio: {
                        media: audioMedia(),
                    },
                },
                {
                    id: '3',
                    type: 'audio',
                    audio: {
                        media: audioMedia(),
                    },
                },
            ],
        }}
    />
);
export const MultipleVideos = () => (
    <Viewer
        screenId="1"
        story={{
            components: [
                {
                    id: '1',
                    type: 'video',
                    video: {
                        media: videoMedia(),
                        withSeekBar: true,
                        withControls: true,
                        autoPlay: true,
                        color: { alpha: 1, color: '#000000' },
                        progressColor: { alpha: 1, color: '#FF0000' },
                    },
                    background: {
                        color: { alpha: 1, color: '#FFFF00' },
                    },
                    gotoNextScreenOnEnd: true,
                },
                {
                    id: '2',
                    type: 'video',
                    layout: 'full',
                    video: {
                        withSeekBar: true,
                        withControls: true,
                        media: gifVideoMedia(),
                        autoPlay: true,
                        muted: true,
                    },
                    gotoNextScreenOnEnd: true,
                },
                {
                    id: '3',
                    type: 'video',
                    layout: 'full',
                    video: {
                        media: video360Media(),
                    },
                    background: {
                        color: { alpha: 1, color: '#00FFFF' },
                        video: videoMedia({ big: true }),
                    },
                },
                {
                    id: '4',
                    type: 'video',
                    video: {
                        media: videoMedia({ big: true }),
                        withSeekBar: true,
                        withControls: true,
                        autoPlay: true,
                        color: { alpha: 1, color: '#000000' },
                        progressColor: { alpha: 1, color: '#0000FF' },
                    },
                    background: {
                        color: { alpha: 1, color: '#00FF00' },
                        video: videoMedia({ big: true }),
                    },
                    gotoNextScreenOnEnd: false,
                },
                {
                    id: '5',
                    type: 'video',
                    video: {
                        media: videoMedia({ big: true }),
                        withSeekBar: true,
                        withControls: true,
                        autoPlay: true,
                        color: { alpha: 1, color: '#000000' },
                        progressColor: { alpha: 1, color: '#FF0000' },
                    },
                    background: {
                        color: { alpha: 1, color: '#FFFF00' },
                    },
                    gotoNextScreenOnEnd: false,
                },
                {
                    id: '6',
                    type: 'video',
                    video: {
                        media: videoMedia({ big: true }),
                        withSeekBar: true,
                        withControls: true,
                        autoPlay: true,
                        color: { alpha: 1, color: '#000000' },
                        progressColor: { alpha: 1, color: '#00FF00' },
                    },
                    background: {
                        color: { alpha: 1, color: '#FF00FF' },
                        video: videoMedia({ big: true }),
                    },
                    gotoNextScreenOnEnd: false,
                },
            ],
        }}
        withNavigationHint
    />
);
export const MultipleVideos360 = () => (
    <Viewer
        screenId="1"
        story={{
            components: [
                {
                    id: '1',
                    type: 'video-360',
                    video: {
                        media: video360Media(),
                    },
                },
                {
                    id: '2',
                    type: 'video-360',
                    video: {
                        media: video360Media(),
                    },
                },
                {
                    id: '3',
                    type: 'video-360',
                    video: {
                        media: video360Media(),
                    },
                },
            ],
        }}
    />
);
export const CustomFonts = () => (
    <Viewer
        story={{
            components: [
                {
                    id: '1',
                    type: 'title-subtitle-credits',
                    layout: 'middle',
                    title: {
                        body: 'Monument Extended <strong>Black</strong>',
                        textStyle: {
                            align: 'center',
                            fontStyle: { bold: false, italic: false },
                            fontSize: 26,
                            lineHeight: 2,
                            fontFamily: {
                                type: 'custom',
                                name: 'MonumentExtended Black',
                                media: 'media://1',
                                variants: [
                                    {
                                        weight: 700,
                                        style: 'normal',
                                        media: 'media://2',
                                    },
                                ],
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
                        body: 'Heebo',
                        textStyle: {
                            align: 'center',
                            fontStyle: { bold: true, italic: false, underline: true },
                            fontFamily: {
                                type: 'google',
                                name: 'Heebo',
                            },
                            fontSize: 32,
                        },
                    },
                },
                {
                    id: '2,',
                    type: 'image-text',
                    layout: 'card-reverse',
                    image: imageMedia(600, 800),
                    text: {
                        body: 'Monument Extended Black',
                        textStyle: {
                            align: 'center',
                            fontStyle: { bold: true, italic: true },
                            fontSize: 32,
                            lineHeight: 1,
                            // fontFamily: {
                            //     type: 'custom',
                            //     name: 'MonumentExtended Black',
                            //     media: 'media://1',
                            // },
                        },
                    },
                    background: {
                        color: {
                            alpha: 1,
                            color: '#F00',
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
    />
);

export const WithTheme = () => <Viewer {...twoScreensProps} theme={viewerTheme} />;

export const WithMenuTheme = () => (
    <Viewer
        {...twoScreensProps}
        theme={{ ...viewerTheme, menuTheme: { colors: { primary: '#F00', secondary: '#00F' } } }}
    />
);
