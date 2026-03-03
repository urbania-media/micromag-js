/* eslint-disable react/jsx-props-no-spreading, no-console */
import {
    audioMedia,
    conversation,
    hexColor,
    imageMedia,
    video360Media,
    webfont2Files,
    webfont3Files,
    webfontFiles,
} from '#.storybook/data';
import allScreensStory from '#.storybook/data/stories/allScreens';
import article from '#.storybook/data/stories/article-generic';
import faceAFace from '#.storybook/data/stories/faceAFace';
import keypad from '#.storybook/data/stories/keypad';
import multipleArticles from '#.storybook/data/stories/multipleArticles';
import multipleKeypads from '#.storybook/data/stories/multipleKeypads';
import multipleVideosStory from '#.storybook/data/stories/multipleVideosStory';
import quiz from '#.storybook/data/stories/quiz';
import quizMultiple from '#.storybook/data/stories/quiz-multiple';
import quizMultipleSimple from '#.storybook/data/stories/quiz-multiple-simple';
import shareScreensStory from '#.storybook/data/stories/shareScreens';
import survey from '#.storybook/data/stories/survey';
import textQuoteBadges from '#.storybook/data/stories/text-quote-badges';
import timeline from '#.storybook/data/stories/timeline';
import UrbaniaComponents from '#.storybook/data/stories/urbania-components';
import videoAudio from '#.storybook/data/stories/videoAudio';
import treeTheme from '#.storybook/data/themes/tree';
import viewerTheme from '#.storybook/data/viewerTheme';
import withGoogleMaps from '#.storybook/decorators/withGoogleMaps';
import preview from '#.storybook/preview';
import React, { useCallback, useEffect, useState } from 'react';
import { v1 as uuid } from 'uuid';

import FieldsProvider from '../../../fields/src/FieldsProvider';
import Viewer from '../components/ViewerContainer';

import basic from '#.storybook/data/stories/basic.json';
import bayard from '#.storybook/data/stories/bayard.json';
import cannabis from '#.storybook/data/stories/cannabis-quebec-france.json';
import cointreau from '#.storybook/data/stories/cointreau.json';
import planetsStory from '#.storybook/data/stories/les-planetes.json';
import lol from '#.storybook/data/stories/lol.json';
import micromagExample2 from '#.storybook/data/stories/micromagExample2.json';
import micromagExample from '#.storybook/data/stories/micromagExample.json';
import micromagExampleEarly2024 from '#.storybook/data/stories/micromagExampleEarly2024.json';
import tnm from '#.storybook/data/stories/tnm.json';
import testTheme from '#.storybook/data/themes/new-theme.json';
import micromagAudio from '#.storybook/examples/micromag-audio.json';
import styles from './styles.module.css';

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

const meta = preview.meta({
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
});

export const Basic = meta.story(() => (
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
        withMicromagBranding
    />
));

export const BackgroundColor = meta.story(() => (
    <div style={{ width: '100%', height: '100%', backgroundColor: hexColor() }}>
        <Viewer
            story={allScreensStory}
            withNavigationHint
            withFullscreenWebView
            menuHeader={
                <div style={{ width: '100%', padding: '0 20 0 0', textAlign: 'center' }}>
                    <div>Friend</div> MY KUSTOM TITLE
                </div>
            }
            memoryRouter
            onMenuChange={(state) => console.log(state)}
            withoutMenuShadow
            className={styles.transparentViewer}
        />
    </div>
));

export const Urbania = meta.story(() => (
    <Viewer
        story={{ ...basic, background: null, components: UrbaniaComponents }}
        withNavigationHint
        menuHeader={
            <div style={{ width: '100%', padding: '0 20 0 0', textAlign: 'center' }}>
                <div>Friend</div> MY KUSTOM TITLE
            </div>
        }
        memoryRouter
        withMicromagBranding
        // onMenuChange={(state) => console.log(state)}
    />
));

export const Article = meta.story(() => <Viewer story={article} memoryRouter />);

export const Bayard = meta.story(() => (
    <Viewer story={bayard} memoryRouter backToFirstScreenTimeout={5000} />
));

export const Cannabis = meta.story(() => <Viewer story={cannabis} memoryRouter />);

export const TNM = meta.story(() => <Viewer story={tnm} memoryRouter muted={false} />);

export const Single = meta.story(() => <Viewer story={lol} memoryRouter />);

export const Cointreau = meta.story(() => <Viewer story={cointreau} memoryRouter />);

export const Closeable = meta.story(() => <Viewer story={lol} closeable memoryRouter />);

export const WithButtons = meta.story(() => (
    <Viewer
        story={cointreau}
        memoryRouter
        menuDotsButtons={
            <button type="button" onClick={() => console.log('click')}>
                My button
            </button>
        }
    />
));

export const TextQuoteBadges = meta.story(() => (
    <Viewer story={textQuoteBadges} withNavigationHint memoryRouter />
));
export const TextQuoteBadgesThemed = meta.story(() => (
    <Viewer story={{ ...textQuoteBadges, theme: testTheme }} withNavigationHint memoryRouter />
));

export const Keypad = meta.story(() => (
    <Viewer
        story={{
            id: 'KEYPAD',
            title: 'KEYPAD',
            theme: null,
            components: [
                {
                    ...keypad,
                    id: uuid(),
                    type: 'keypad',
                    title: {
                        body: 'Horoscope 1.0',
                    },
                },
                {
                    ...keypad,
                    id: uuid(),
                    type: 'keypad',
                    title: {
                        body: 'Horoscope 2.0',
                    },
                },
                {
                    ...keypad,
                    id: uuid(),
                    title: {
                        body: 'Horoscope 3.0',
                    },
                },
            ],
        }}
        memoryRouter
    />
));

export const Surveys = meta.story(() => <Viewer story={survey} memoryRouter />);

export const QuizAndSurvey = meta.story(() => <Viewer story={quiz} memoryRouter />);

export const QuizMultiple = meta.story(() => (
    <Viewer
        screenId="ABC"
        story={{
            id: 'ABC',
            title: 'ABC',
            theme: null,
            components: [{ id: 'ABC', ...quizMultipleSimple }],
        }}
        memoryRouter
    />
));

export const QuizMultipleResults = meta.story(() => (
    <Viewer
        screenId="123"
        story={{
            id: '123',
            title: '123',
            theme: null,
            components: [{ id: '123', ...quizMultiple }],
        }}
        memoryRouter
    />
));

export const Timeline = meta.story(() => (
    <Viewer
        screenId="123"
        story={{
            id: '123',
            title: '123',
            theme: null,
            components: [
                timeline,
                {
                    ...timeline,
                    id: '124',
                    alternatives: {
                        audio: {
                            ...timeline.alternatives.audio,
                            autoPlay: false,
                        },
                    },
                },
                ...videoAudio.components,
            ],
        }}
        memoryRouter
    />
));

export const Empty = meta.story(() => <Viewer basePath="/story-path" memoryRouter />);

export const TwoScreens = meta.story(() => <Viewer {...twoScreensProps} memoryRouter />);

export const Tree = meta.story(() => <Viewer story={treeTheme} withNavigationHint memoryRouter />);

export const Custom = meta.story(() => (
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
));

export const MicromagExample = meta.story(() => (
    <Viewer {...micromagExample} memoryRouter shareOptions={['linkedin', 'email']} />
));
export const MicromagExample2 = meta.story(() => <Viewer {...micromagExample2} memoryRouter />);

export const MicromagExampleEarly2024 = meta.story(() => (
    <Viewer {...micromagExampleEarly2024} memoryRouter />
));

export const LesPlanetes = meta.story(() => <Viewer {...planetsStory} memoryRouter />);

export const FaceAFace = meta.story(() => (
    <Viewer {...faceAFaceProps} withNavigationHint memoryRouter />
));

export const AllScreens = meta.story(() => (
    <Viewer {...props} withNeighborScreens memoryRouter withMicromagBranding />
));

export const AllScreensWithoutHeader = meta.story(() => (
    <Viewer {...propsWithoutHeader} withNeighborScreens memoryRouter />
));

export const AllScreensWithoutFooter = meta.story(() => (
    <Viewer {...propsWithoutFooter} withNeighborScreens memoryRouter />
));

const shareScreenProps = {
    screenId: shareScreensStory.components[0].id,
    story: shareScreensStory,
};
export const VideoAudio = meta.story(() => (
    <Viewer story={videoAudio} memoryRouter shareBasePath="https://micromag.ca" />
));

export const AudioOnly = meta.story(() => <Viewer story={micromagAudio} memoryRouter />);

export const ShareScreens = meta.story(() => <Viewer {...shareScreenProps} memoryRouter />);

export const MultipleAudios = meta.story(() => (
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
));

export const MultipleVideos = meta.story(() => (
    <Viewer screenId="1" story={multipleVideosStory} withNavigationHint memoryRouter />
));

export const MultipleVideosForcePaused = meta.story(() => (
    <Viewer screenId="1" story={multipleVideosStory} withNavigationHint paused memoryRouter />
));

export const MultipleVideos360 = meta.story(() => (
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
));
export const MultipleArticles = meta.story(() => (
    <Viewer screenId="42" story={multipleArticles} memoryRouter />
));

export const MultipleKeypads = meta.story(() => (
    <Viewer screenId="777" story={multipleKeypads} memoryRouter />
));

export const Conversation = meta.story(() => (
    <Viewer
        screenId="727"
        story={{
            title: 'With conversation',
            components: [
                {
                    id: '1',
                    type: 'conversation',
                    conversation: conversation(13, 4),
                    readingSpeed: 600,
                },
            ],
        }}
        memoryRouter
    />
));

export const GameSort = meta.story(() => (
    <Viewer
        story={{
            title: 'Game sort',
            components: [
                {
                    id: '1',
                    type: 'game-sort',
                    heading: {
                        body: 'Mettre dans le bon ordre',
                    },
                    items: [
                        {
                            id: '1',
                            label: 'Item 1',
                        },
                        {
                            id: '2',
                            label: 'Item 2 Item 2 Item 2 Item 2 Item 2 Item 2 Item 2',
                        },
                        {
                            id: '3',
                            label: 'Item 3',
                        },
                        {
                            id: '4',
                            label: 'Item 4',
                        },
                        {
                            id: '5',
                            label: 'Item 5 Item 5 Item 5 Item 5 Item 5 Item 5 Item 5',
                        },
                    ],
                },
                {
                    id: '2',
                    type: 'game-sort',
                    heading: {
                        body: 'Mettre dans le bon ordre',
                    },
                    items: [
                        {
                            id: '1',
                            label: 'Item 1.1',
                        },
                        {
                            id: '2',
                            label: 'Item 2.1',
                        },
                        {
                            id: '3',
                            label: 'Item 3.1',
                        },
                        {
                            id: '4',
                            label: 'Item 4.1',
                        },
                    ],
                },
            ],
        }}
        memoryRouter
    />
));

export const WithCustomFonts = meta.story(() => (
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
));
export const WithTheme = meta.story(() => (
    <Viewer {...twoScreensProps} theme={viewerTheme} memoryRouter />
));

export const WithMenuTheme = meta.story(() => (
    <Viewer
        {...twoScreensProps}
        theme={{ ...viewerTheme, menuTheme: { colors: { primary: '#F00', secondary: '#00F' } } }}
        memoryRouter
    />
));

export const WithMenuThemeAndMenuItems = meta.story(() => (
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
        menuItems={['main', 'share']}
        beforeScreensMenuButton={<div>Custom item before screens button blablabla</div>}
        afterShareMenuButton={<div>Custom item after share button lalalalala</div>}
    />
));

export const WithMenuItems = meta.story(() => (
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
        menuItems={[
            <div style={{ marginLeft: '10px' }}>Here Goes Logo and home screen</div>,
            'main',
            'share',
        ]}
        // menuHeader={<div style={{ padding: '10px' }}>Custom header content</div>}
        // menuFooter={<div style={{ padding: '10px' }}>Custom footer content</div>}
    />
));

export const WithScroll = meta.story(() => (
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
));
export const WithNeighborScreens = meta.story(() => (
    <Viewer {...faceAFaceProps} withNeighborScreens memoryRouter />
));
export const WithCustomNeighborScreens = meta.story(() => (
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
));

export const WithoutGestures = meta.story(() => (
    <Viewer story={faceAFace} withoutGestures memoryRouter />
));
export const WithoutNavigationArrows = meta.story(() => (
    <Viewer story={faceAFace} withoutNavigationArrow memoryRouter />
));
export const WithoutTransitions = meta.story(() => (
    <Viewer story={faceAFace} withoutTransitions memoryRouter />
));
export const WithoutPlaybackControls = meta.story(() => (
    <Viewer story={videoAudio} withoutPlaybackControls memoryRouter />
));
export const WithoutMenu = meta.story(() => <Viewer story={videoAudio} withoutMenu memoryRouter />);
export const WithoutUserInterface = meta.story(() => (
    <Viewer
        story={videoAudio}
        neighborScreensMounted={null}
        memoryRouter
        withoutMenu
        withoutPlaybackControls
        withoutNavigationArrow
    />
));
export const WithViewerEvents = meta.story(() => {
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
});

export const LoadExternal = meta.story(() => {
    const storySlug = 'une-soiree-avec-pier-luc-funk-mm93';
    const [story, setStory] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const url = `/api/proxyToProd/${storySlug}.json`;
        fetch(url, { mode: 'cors' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                setStory(data);
                setErrorMessage(null);
            })
            .catch((error) => setErrorMessage(error.message));
    }, [storySlug]);

    if (errorMessage !== null) {
        return <div>Error: {errorMessage}</div>;
    }

    if (story === null) {
        return <div>Loading...</div>;
    }

    return <Viewer story={story} withNavigationHint memoryRouter />;
});
