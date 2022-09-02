/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';

import {
    audioMedia,
    callToAction,
    imageMedia,
    video360Media,
    videoMedia,
    bigVideoMediaWithSound,
    gifVideoMedia,
    webfont2Files,
    webfont3Files,
    webfontFiles,
} from '../../../../.storybook/data';
import allScreensStory from '../../../../.storybook/data/stories/allScreens';
import faceAFace from '../../../../.storybook/data/stories/faceAFace';
import shareScreensStory from '../../../../.storybook/data/stories/shareScreens';
import videoAudio from '../../../../.storybook/data/stories/videoAudio';
import treeTheme from '../../../../.storybook/data/themes/tree';
import viewerTheme from '../../../../.storybook/data/viewerTheme';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import Viewer from '../components/ViewerContainer';

import article2 from '../../../../.storybook/data/stories/article2.json';
import articleVideo from '../../../../.storybook/data/stories/article-video.json';
import article from '../../../../.storybook/data/stories/article.json';
import basic from '../../../../.storybook/data/stories/basic.json';
import planetsStory from '../../../../.storybook/data/stories/les-planetes.json';
import micromagExample2 from '../../../../.storybook/data/stories/micromagExample2.json';
import micromagExample from '../../../../.storybook/data/stories/micromagExample.json';

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

export const Basic = () => <Viewer story={basic} withNavigationHint />;
export const Empty = () => <Viewer basePath="/story-path" />;
export const TwoScreens = () => <Viewer {...twoScreensProps} />;
export const Tree = () => <Viewer story={treeTheme} withNavigationHint />;
export const Custom = () => (
    <Viewer
        story={{ components: [{ id: '1324', type: 'custom' }] }}
        screenComponents={{
            custom: (
                <div style={{ padding: '5rem 1rem', textAlign: 'center' }}>
                    <div>
                        <h1>Custom screen</h1>
                        <p>
                            This is a plain HTML component used as a <em>custom</em> type screen.
                        </p>
                    </div>
                </div>
            ),
        }}
    />
);

export const MicromagExample = () => <Viewer {...micromagExample} />;
export const MicromagExample2 = () => <Viewer {...micromagExample2} />;
export const LesPlanetes = () => <Viewer {...planetsStory} />;
export const FaceAFace = () => <Viewer {...faceAFaceProps} withNavigationHint />;

export const AllScreens = () => <Viewer {...props} withNeighborScreens />;

const shareScreenProps = {
    screenId: shareScreensStory.components[0].id,
    story: shareScreensStory,
};
export const VideoAudio = () => <Viewer story={videoAudio} />;

export const ShareScreens = () => <Viewer {...shareScreenProps} />;

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
                    layout: 'full',
                    video: {
                        media: bigVideoMediaWithSound(),
                        withSeekBar: true,
                        withControls: true,
                        loop: false,
                        autoPlay: true,
                    },
                    background: {
                        color: { alpha: 1, color: '#FFFF00' },
                    },
                    callToAction: callToAction(),
                },
                {
                    id: '2',
                    type: 'video',
                    video: {
                        withSeekBar: true,
                        withControls: false,
                        media: gifVideoMedia(),
                        autoPlay: true,
                        color: { alpha: 1, color: '#012400' },
                        progressColor: { alpha: 1, color: '#8891cc' },
                    },
                    background: {
                        color: { alpha: 1, color: '#123456' },
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
                        withSeekBar: false,
                        withControls: false,
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
                        color: { alpha: 1, color: '#00ffff' },
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
                        withSeekBar: false,
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
export const MultipleArticles = () => (
    <Viewer
        screenId="42"
        story={{
            components: [
                {
                    id: '1',
                    type: 'urbania-article',
                    article,
                    background: {
                        color: { alpha: 1, color: '#FF00FF' },
                    },
                },
                {
                    id: '2',
                    type: 'urbania-article',
                    article: article2,
                    overTitle: {
                        body: 'Guide des universités',
                        textStyle: {
                            color: { alpha: 1, color: '#ff0000' },
                        },
                    },
                    description: {
                        body: "Petite virée sur le campus de l'École de technologie supérieure (ÉTS)",
                        textStyle: {
                            fontStyle: {
                                italic: true,
                                bold: false,
                            },
                            fontSize: 13,
                            color: { alpha: 1, color: '#ff0000' },
                        },
                    },
                    background: {
                        color: { alpha: 1, color: '#ffffff' },
                    },
                },
                {
                    id: '3',
                    type: 'urbania-article',
                    article: articleVideo,
                    background: {
                        color: { alpha: 1, color: '#123456' },
                    },
                },
            ],
        }}
    />
);

export const WithCustomFonts = () => (
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
export const WithMenuTheme2 = () => (
    <Viewer
        {...faceAFaceProps}
        theme={{
            background: {
                color: {
                    color: '#5d6ffe',
                    alpha: 0.5,
                },
            },
            menuTheme: {
                colors: { primary: '#e4e4e1', secondary: { color: '#eaa2e2', alpha: 0.75 } },
            },
        }}
    />
);
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
export const WithNeighborScreens = () => <Viewer {...faceAFaceProps} withNeighborScreens />;
export const WithCustomNeighborScreens = () => (
    <Viewer
        {...faceAFaceProps}
        neighborScreensActive={3}
        neighborScreenOffset={75}
        neighborScreenScale={0.4}
        withNeighborScreens
        withoutScreensMenu
        withoutShareMenu
        withoutMenuShadow
    />
);

export const WithoutGestures = () => <Viewer story={faceAFace} withoutGestures />;
export const WithoutNavigationArrows = () => <Viewer story={faceAFace} withoutNavigationArrow />;
export const WithoutTransitions = () => <Viewer story={faceAFace} withoutTransitions />;
export const WithoutPlaybackControls = () => <Viewer story={videoAudio} withoutPlaybackControls />;
export const WithoutMenu = () => <Viewer story={videoAudio} withoutMenu />;
export const WithoutUserInterface = () => (
    <Viewer
        story={videoAudio}
        neighborScreensMounted={null}
        memoryRouter
        withoutMenu
        withoutPlaybackControls
        withoutNavigationArrow
    />
);
export const WithViewerEvents = () => {
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
