/* eslint-disable react/jsx-props-no-spreading, no-console */
import React, { useCallback, useState } from 'react';

import {
    audioMedia,
    imageMedia,
    video360Media,
    webfont2Files,
    webfont3Files,
    webfontFiles,
} from '../../../../.storybook/data';
import allScreensStory from '../../../../.storybook/data/stories/allScreens';
import article from '../../../../.storybook/data/stories/article-generic';
import faceAFace from '../../../../.storybook/data/stories/faceAFace';
import multipleArticles from '../../../../.storybook/data/stories/multipleArticles';
import multipleKeypads from '../../../../.storybook/data/stories/multipleKeypads';
import multipleVideosStory from '../../../../.storybook/data/stories/multipleVideosStory';
import quiz from '../../../../.storybook/data/stories/quiz';
import shareScreensStory from '../../../../.storybook/data/stories/shareScreens';
import textQuoteBadges from '../../../../.storybook/data/stories/text-quote-badges';
import UrbaniaComponents from '../../../../.storybook/data/stories/urbania-components';
import videoAudio from '../../../../.storybook/data/stories/videoAudio';
import treeTheme from '../../../../.storybook/data/themes/tree';
import viewerTheme from '../../../../.storybook/data/viewerTheme';
import withGoogleMaps from '../../../../.storybook/decorators/withGoogleMaps';
import FieldsProvider from '../../../fields/src/FieldsProvider';
import Viewer from '../components/ViewerContainer';

import basic from '../../../../.storybook/data/stories/basic.json';
import cointreau from '../../../../.storybook/data/stories/cointreau.json';
import planetsStory from '../../../../.storybook/data/stories/les-planetes.json';
import lol from '../../../../.storybook/data/stories/lol.json';
import micromagExample2 from '../../../../.storybook/data/stories/micromagExample2.json';
import micromagExample from '../../../../.storybook/data/stories/micromagExample.json';
import micromagExampleEarly2024 from '../../../../.storybook/data/stories/micromagExampleEarly2024.json';
import testTheme from '../../../../.storybook/data/themes/new-theme.json';
import micromagAudio from '../../../../.storybook/examples/micromag-audio.json';

const props = {
    screenId: allScreensStory.components[0].id,
    story: allScreensStory,
};

const propsWithoutHeader = {
    screenId: allScreensStory.components[0].id,
    story: {
        ...allScreensStory,
        components: allScreensStory.components.map((it) => ({ ...it, header: null })),
    },
};

const propsWithoutFooter = {
    screenId: allScreensStory.components[0].id,
    story: {
        ...allScreensStory,
        components: allScreensStory.components.map((it) => ({ ...it, footer: null })),
    },
};

const faceAFaceProps = {
    screenId: faceAFace.components[0].id,
    story: faceAFace,
};

const twoScreensProps = {
    ...faceAFaceProps,
    story: {
        ...faceAFace.story,
        title: 'Two screens',
        components: faceAFace.components.slice(0, 2),
    },
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
        (Story) => (
            <FieldsProvider>
                <Story />
            </FieldsProvider>
        ),
    ],
    title: 'Viewer/Viewer',
    parameters: {
        intl: true,
    },
};

export const Basic = () => (
    <Viewer
        story={basic}
        withNavigationHint
        menuHeader={
            <div style={{ width: '100%', padding: '0 20 0 0', textAlign: 'center' }}>
                <div>Friend</div> MY KUSTOM TITLE
            </div>
        }
        memoryRouter
        onMenuChange={(state) => console.log(state)}
    />
);

export const Urbania = () => (
    <Viewer
        story={{ ...basic, background: null, components: UrbaniaComponents }}
        withNavigationHint
        menuHeader={
            <div style={{ width: '100%', padding: '0 20 0 0', textAlign: 'center' }}>
                <div>Friend</div> MY KUSTOM TITLE
            </div>
        }
        memoryRouter
        // onMenuChange={(state) => console.log(state)}
    />
);

export const Article = () => <Viewer story={article} memoryRouter />;

export const Single = () => <Viewer story={lol} memoryRouter />;

export const Cointreau = () => <Viewer story={cointreau} memoryRouter />;

export const Closeable = () => <Viewer story={lol} closeable memoryRouter />;

export const WithButtons = () => (
    <Viewer
        story={cointreau}
        memoryRouter
        menuDotsButtons={
            <button type="button" onClick={() => console.log('click')}>
                My button
            </button>
        }
    />
);

export const TextQuoteBadges = () => (
    <Viewer story={textQuoteBadges} withNavigationHint memoryRouter />
);
export const TextQuoteBadgesThemed = () => (
    <Viewer story={{ ...textQuoteBadges, theme: testTheme }} withNavigationHint memoryRouter />
);

export const QuizAndSurvey = () => <Viewer story={quiz} memoryRouter />;
export const Empty = () => <Viewer basePath="/story-path" memoryRouter />;
export const TwoScreens = () => <Viewer {...twoScreensProps} memoryRouter />;
export const Tree = () => <Viewer story={treeTheme} withNavigationHint memoryRouter />;
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
        memoryRouter
    />
);

export const MicromagExample = () => <Viewer {...micromagExample} memoryRouter />;
export const MicromagExample2 = () => <Viewer {...micromagExample2} memoryRouter />;
export const MicromagExampleEarly2024 = () => <Viewer {...micromagExampleEarly2024} memoryRouter />;
export const LesPlanetes = () => <Viewer {...planetsStory} memoryRouter />;
export const FaceAFace = () => <Viewer {...faceAFaceProps} withNavigationHint memoryRouter />;

export const AllScreens = () => <Viewer {...props} withNeighborScreens memoryRouter />;
export const AllScreensWithoutHeader = () => (
    <Viewer {...propsWithoutHeader} withNeighborScreens memoryRouter />
);
export const AllScreensWithoutFooter = () => (
    <Viewer {...propsWithoutFooter} withNeighborScreens memoryRouter />
);

const shareScreenProps = {
    screenId: shareScreensStory.components[0].id,
    story: shareScreensStory,
};
export const VideoAudio = () => <Viewer story={videoAudio} memoryRouter shareBasePath="https://micromag.ca" />;

export const AudioOnly = () => <Viewer story={micromagAudio} memoryRouter />;

export const ShareScreens = () => <Viewer {...shareScreenProps} memoryRouter />;

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
        memoryRouter
    />
);
export const MultipleVideos = () => (
    <Viewer screenId="1" story={multipleVideosStory} withNavigationHint memoryRouter />
);

export const MultipleVideosForcePaused = () => (
    <Viewer screenId="1" story={multipleVideosStory} withNavigationHint paused memoryRouter />
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
        memoryRouter
    />
);
export const MultipleArticles = () => (
    <Viewer screenId="42" story={multipleArticles} memoryRouter />
);

export const MultipleKeypads = () => <Viewer screenId="777" story={multipleKeypads} memoryRouter />;

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
        memoryRouter
    />
);
export const WithTheme = () => <Viewer {...twoScreensProps} theme={viewerTheme} memoryRouter />;

export const WithMenuTheme = () => (
    <Viewer
        {...twoScreensProps}
        theme={{ ...viewerTheme, menuTheme: { colors: { primary: '#F00', secondary: '#00F' } } }}
        memoryRouter
    />
);
export const WithMenuTheme2 = () => (
    <Viewer
        {...faceAFaceProps}
        theme={{
            background: {
                color: {
                    color: '#e4cdcf',
                    alpha: 0.75,
                },
            },
            menuTheme: {
                colors: { primary: '#5d73fe', secondary: { color: '#5d73fe', alpha: 0.8 } },
            },
        }}
        memoryRouter
    />
);
export const WithScroll = () => (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'scroll' }}>
        <div style={{ position: 'relative', width: '100%', height: 2000 }}>
            <div style={{ position: 'relative', width: '100%', height: 560 }}>
                <Viewer
                    {...faceAFaceProps}
                    closeable
                    // onClose={() => console.log('close')}
                    // onStart={() => console.log('start')}
                    // onEnd={() => console.log('end')}
                    onViewModeChange={() => {
                        // console.log(viewMode);
                    }}
                    memoryRouter
                />
            </div>
        </div>
    </div>
);
export const WithNeighborScreens = () => (
    <Viewer {...faceAFaceProps} withNeighborScreens memoryRouter />
);
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
        memoryRouter
    />
);

export const WithoutGestures = () => <Viewer story={faceAFace} withoutGestures memoryRouter />;
export const WithoutNavigationArrows = () => (
    <Viewer story={faceAFace} withoutNavigationArrow memoryRouter />
);
export const WithoutTransitions = () => (
    <Viewer story={faceAFace} withoutTransitions memoryRouter />
);
export const WithoutPlaybackControls = () => (
    <Viewer story={videoAudio} withoutPlaybackControls memoryRouter />
);
export const WithoutMenu = () => <Viewer story={videoAudio} withoutMenu memoryRouter />;
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
            memoryRouter
            onClose={onClose}
            onInteraction={onInteraction}
            onEnd={onEnd}
            onViewModeChange={setViewMode}
        />
    );
};
