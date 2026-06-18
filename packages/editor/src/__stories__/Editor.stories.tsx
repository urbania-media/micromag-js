import { callToAction, conversation, hlsVideoMedia, sortItems, videoMedia } from '#.storybook/data';
import galleries from '#.storybook/data/galleries';
import allScreensStory from '#.storybook/data/stories/allScreens';
import article from '#.storybook/data/stories/article-generic';
import contribution from '#.storybook/data/stories/contribution';
import faceAFaceStory from '#.storybook/data/stories/faceAFace';
import keypad from '#.storybook/data/stories/keypad';
import multipleArticles from '#.storybook/data/stories/multipleArticles';
import multipleItems from '#.storybook/data/stories/multipleItems';
import multipleKeypads from '#.storybook/data/stories/multipleKeypads';
import quiz from '#.storybook/data/stories/quiz';
import quizMultiple from '#.storybook/data/stories/quiz-multiple';
import quizMultipleSimple from '#.storybook/data/stories/quiz-multiple-simple';
import shareScreensStory from '#.storybook/data/stories/shareScreens';
import survey from '#.storybook/data/stories/survey';
import textQuoteBadges from '#.storybook/data/stories/text-quote-badges';
import timeline from '#.storybook/data/stories/timeline';
import UrbaniaScreenComponents from '#.storybook/data/stories/urbania-components';
import videoAudio from '#.storybook/data/stories/videoAudio';
import { defaultTheme } from '#.storybook/data/themes/micromag-default';
import simpleTreeTheme from '#.storybook/data/themes/simpletree';
import treeTheme from '#.storybook/data/themes/tree';
import { theme as backgroundTheme } from '#.storybook/data/themes/with-background';
import withGoogleMaps from '#.storybook/decorators/withGoogleMaps';
// import withIntlProvider from '#.storybook/decorators/withIntlProvider';
import withUppy from '#.storybook/decorators/withUppy';
import preview from '#.storybook/preview';
import React, { useEffect, useState } from 'react';
import { v1 as uuid } from 'uuid';

import ActionsProvider from '@panneau/actions';
import { QueryProvider } from '@panneau/data';
import DisplaysProvider from '@panneau/displays';
import FieldsProvider from '@panneau/fields';
import FiltersProvider from '@panneau/filters';

import signs from '../../../../screens/urbania-horoscope/src/data/signs';
import DataProvider from '../../../data/src/DataProvider';
import Editor from '../components/EditorContainer';

import cointreau from '#.storybook/data/stories/cointreau.json';
import hebdo from '#.storybook/data/stories/hebdo.json';
import { getJSON } from '@folklore/fetch';

const meta = preview.meta({
    component: Editor,
    title: 'Editor/Editor',
    decorators: [withGoogleMaps, withUppy],

    parameters: {
        intl: true,
    },
});

const hasWindow = typeof window !== 'undefined';

const apiBaseUrl = hasWindow ? `${window.location.protocol}//${window.location.host}/api` : '/api';

const EditorContainer = ({ defaultValue = null, isTheme = false, viewerTheme = null }) => {
    const [value, setValue] = useState(defaultValue);
    return (
        <DataProvider apiBaseUrl={apiBaseUrl}>
            <QueryProvider>
                <FieldsProvider>
                    <DisplaysProvider>
                        <FiltersProvider>
                            <ActionsProvider>
                                <Editor
                                    value={value}
                                    isTheme={isTheme}
                                    fullscreen
                                    onChange={setValue}
                                    memoryRouter
                                    viewerTheme={viewerTheme}
                                    screenNamespaces={['urbania']}
                                    uppy={{
                                        transport: 'tus',
                                        xhr: { endpoint: `${apiBaseUrl}/xhr/upload` },
                                    }}
                                />
                            </ActionsProvider>
                        </FiltersProvider>
                    </DisplaysProvider>
                </FieldsProvider>
            </QueryProvider>
        </DataProvider>
    );
};

const viewerTheme = {
    logo: {
        id: '26',
        type: 'image',
        name: 'avatar.png',
        url: 'https://cdn.dev.microm.ag/image/2021-02-01/34-104427.png',
        thumbnail_url: 'https://cdn.dev.microm.ag/image/2021-02-01/34-104427.png',
        metadata: {
            filename: 'avatar.png',
            size: 65870,
            mime: 'image/png',
            width: 200,
            height: 200,
        },
    },
    colors: {
        primary: {
            color: '#2ebb2c',
            alpha: 1,
        },
        secondary: {
            color: '#f5a623',
            alpha: 1,
        },
    },
    background: {
        color: {
            color: '#4a90e2',
            alpha: 1,
        },
    },
    textStyles: {
        title: {
            fontFamily: {
                type: 'google',
                name: 'Lato',
                variants: [
                    '100',
                    '100italic',
                    '300',
                    '300italic',
                    'regular',
                    'italic',
                    '700',
                    '700italic',
                    '900',
                    '900italic',
                ],
            },
            color: {
                color: '#9b9b9b',
                alpha: 1,
            },
        },
    },
};

export const Loader = meta.story(() => {
    const [url, setUrl] = useState(() => localStorage.getItem('lastLoadedStory') || null);
    const [storyUrl, setStoryUrl] = useState(() =>
        url !== null ? url.replace(/(\.json)?$/, '.json') : null,
    );
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
        const newStoryUrl = url.replace(/(\.json)?$/, '.json');
        setStoryUrl(newStoryUrl);
        localStorage.setItem('lastLoadedStory', url);
    };
    useEffect(() => {
        setLoading(true);
        getJSON(storyUrl).then((data) => {
            setLoading(false);
            setStory(data);
        });
    }, [storyUrl]);

    return (
        <div className="d-flex flex-column" style={{ width: '100%', height: '100vh' }}>
            <form onSubmit={onSubmit} className="p-3">
                <div className="input-group">
                    <input
                        type="text"
                        value={url || ''}
                        onChange={(e) => setUrl(e.target.value)}
                        className="form-control"
                        placeholder="Enter a story URL (e.g. https://microm.ag)"
                    />
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Loading' : 'Load'}
                    </button>
                </div>
            </form>
            <div className="position-relative flex-grow-1">
                {story !== null ? <EditorContainer defaultValue={story} /> : null}
            </div>
        </div>
    );
});

export const TestHebdo = meta.story(() => <EditorContainer defaultValue={hebdo} />);

export const TestUrbania = meta.story(() => (
    <EditorContainer
        defaultValue={{ title: 'Test', theme: defaultTheme, components: UrbaniaScreenComponents }}
    />
));

export const TestCointreau = meta.story(() => <EditorContainer defaultValue={cointreau} />);

export const TestArticle = meta.story(() => <EditorContainer defaultValue={article} />);

export const TestQuoteBadges = meta.story(() => <EditorContainer defaultValue={textQuoteBadges} />);

export const TestContribution = meta.story(() => (
    <EditorContainer
        defaultValue={{ title: 'Test Contrib', theme: defaultTheme, components: [contribution] }}
    />
));

export const TestKeypad = meta.story(() => (
    <EditorContainer
        defaultValue={{ title: 'Test KEYPAD', theme: defaultTheme, components: [keypad] }}
    />
));

export const TestTimeline = meta.story(() => (
    <EditorContainer
        defaultValue={{ title: 'Test Timeline', theme: defaultTheme, components: [timeline] }}
    />
));

export const TestQuizzes = meta.story(() => <EditorContainer defaultValue={quiz} />);

export const TestArticleUrbania = meta.story(() => (
    <EditorContainer
        defaultValue={{
            title: 'Test',
            theme: defaultTheme,
            components: [
                {
                    id: '1cb8a4be-5c1a-11eb-985f-ad6fce99d848',
                    type: 'urbania-article-card',
                    url: 'https://urbania.ca/article/tous-les-dechets-sen-vont-a-la-meme-place-et-autres-mythes-sur-le-compostage',
                    title: {
                        body: null,
                        textStyle: {
                            // fontFamily: {
                            //     name: 'Garage Gothic',
                            //     fallback: 'Arial',
                            //     type: 'sans-serif',
                            // },
                            fontSize: 30,
                            fontStyle: {
                                bold: true,
                                // transform: 'uppercase',
                            },
                            // lineHeight: 0.2,
                            align: 'center',
                            color: '#ff4dff',
                        },
                    },
                    background: {
                        color: { color: '#00f', alpha: 1 },
                    },
                    callToAction: callToAction(),
                    description: {
                        body: '<p>HELLO MY NAME IS EARL I AM SOMETHING SOMETHING AND STUFF YOU KNOW THINGS</p>',
                    },
                },
            ],
        }}
    />
));

export const TestHoroscope = meta.story(() => (
    <EditorContainer
        defaultValue={{
            title: 'Test',
            // theme: defaultTheme,
            components: [
                {
                    id: '1cb8a4be-5c1a-11eb-985f-ad6fce99d848',
                    type: 'urbania-horoscope',
                    signs,
                },
            ],
        }}
    />
));

export const TestReco = meta.story(() => (
    <EditorContainer
        defaultValue={{
            title: 'Test',
            // theme: defaultTheme,
            components: [
                {
                    id: '1cb8a4be-5c1a-11eb-985f-ad6fce99d848',
                    type: 'urbania-recommendation',
                },
            ],
        }}
    />
));

export const Empty = meta.story(() => <EditorContainer defaultValue={{ title: 'Empty' }} />);

export const VideoAudio = meta.story(() => <EditorContainer defaultValue={videoAudio} />);

export const Galleries = meta.story(() => (
    <EditorContainer defaultValue={{ components: galleries }} />
));

export const IsTree = meta.story(() => <EditorContainer defaultValue={treeTheme} />);

export const IsSimpleTree = meta.story(() => (
    <EditorContainer
        defaultValue={simpleTreeTheme}
        // onChange={(newValue) => console.log(newValue)}
    />
));

export const Map = meta.story(() => (
    <EditorContainer defaultValue={{ components: [{ id: 'map', type: 'map' }] }} />
));

export const Survey = meta.story(() => (
    <EditorContainer defaultValue={{ components: [{ id: 'survey', type: 'survey' }] }} />
));

export const Surveys = meta.story(() => <EditorContainer defaultValue={survey} />);

export const Quiz = meta.story(() => (
    <EditorContainer defaultValue={{ components: [{ id: 'quiz', type: 'quiz' }] }} />
));

export const QuizMultiple = meta.story(() => (
    <EditorContainer
        defaultValue={{
            components: [{ id: 'quiz-multiple', type: 'quiz-multiple', ...quizMultiple }],
        }}
    />
));

export const QuizMultipleSimple = meta.story(() => (
    <EditorContainer
        defaultValue={{
            components: [{ id: 'quiz-multiple', type: 'quiz-multiple', ...quizMultipleSimple }],
        }}
    />
));

export const VideoCustom = meta.story(() => (
    <EditorContainer
        defaultValue={{ components: [{ id: 'video', type: 'video', video: videoMedia() }] }}
    />
));

export const IsTheme = meta.story(() => <EditorContainer defaultValue={defaultTheme} isTheme />);
export const AllScreens = meta.story(() => <EditorContainer defaultValue={allScreensStory} />);
export const ShareScreens = meta.story(() => <EditorContainer defaultValue={shareScreensStory} />);
export const FaceAFace = meta.story(() => <EditorContainer defaultValue={faceAFaceStory} />);
export const MultipleArticles = meta.story(() => (
    <EditorContainer defaultValue={multipleArticles} />
));
export const MultipleKeypads = meta.story(() => <EditorContainer defaultValue={multipleKeypads} />);
export const MultipleItems = meta.story(() => <EditorContainer defaultValue={multipleItems} />);

export const WithTheme = meta.story(() => (
    <EditorContainer
        defaultValue={{
            title: 'With theme',
            theme: defaultTheme,
        }}
    />
));

export const WithThemeCTABadge = meta.story(() => (
    <EditorContainer
        defaultValue={{
            ...textQuoteBadges,
            title: 'With theme Cta Badge',
            theme: defaultTheme,
            components: [textQuoteBadges.components[0]],
        }}
    />
));

export const WithThemeItems = meta.story(() => (
    <EditorContainer
        defaultValue={{
            ...textQuoteBadges,
            title: 'With theme items',
            theme: defaultTheme,
            components: allScreensStory.components.filter(
                ({ type = false }) => ['timeline'].indexOf(type) !== -1,
            ),
        }}
    />
));

export const IsBackgroundTheme = meta.story(() => (
    <EditorContainer isTheme defaultValue={backgroundTheme} />
));

export const WithBackgroundTheme = meta.story(() => (
    <EditorContainer
        defaultValue={{
            title: 'With background theme',
            theme: backgroundTheme,
        }}
    />
));

export const WithThemeAllScreens = meta.story(() => (
    <EditorContainer
        defaultValue={{
            title: 'With theme (all screens)',
            theme: defaultTheme,
            components: allScreensStory.components.map((c) => ({
                ...c,
            })),
        }}
    />
));

export const WithViewerTheme = meta.story(() => (
    <EditorContainer
        viewerTheme={viewerTheme}
        defaultValue={{
            title: 'With viewer theme',
            theme: defaultTheme,
            components: allScreensStory.components.map((c) => ({
                ...c,
            })),
        }}
    />
));

export const WithSomeScreens = meta.story(() => (
    <EditorContainer
        viewerTheme={viewerTheme}
        defaultValue={{
            title: 'With some screens',
            components: [
                { id: '1', type: 'audio' },
                { id: '2', type: 'contribution' },
                { id: '3', type: 'map-images', draggable: true },
            ],
        }}
    />
));

export const Conversation = meta.story(() => (
    <EditorContainer
        defaultValue={{
            title: 'With conversation',
            components: [{ id: '1', type: 'conversation', conversation: conversation(13, 4) }],
        }}
    />
));

export const GameSort = meta.story(() => (
    <EditorContainer
        defaultValue={{
            title: 'With game sort',
            components: [{ id: '1', type: 'game-sort', items: sortItems(5) }],
        }}
    />
));

export const QualityLevelInPlaybackContext = meta.story(() => (
    <EditorContainer
        defaultValue={{
            title: 'Quality level in PlaybackContext',
            components: [
                {
                    id: uuid(),
                    type: 'video',
                    layout: 'full',
                    video: {
                        media: hlsVideoMedia(),
                        autoPlay: true,
                        loop: true,
                        withSeekBar: true,
                        withControls: true,
                    },
                },
                {
                    id: uuid(),
                    type: 'video',
                    layout: 'full',
                    video: {
                        media: hlsVideoMedia(),
                        autoPlay: true,
                        loop: true,
                        withSeekBar: true,
                        withControls: true,
                    },
                },
            ],
        }}
    />
));

export const BugfixWithTheme = meta.story(() => (
    <EditorContainer
        defaultValue={{
            theme: {
                title: 'Default theme',
                colors: {
                    primary: {
                        color: '#FFF',
                        alpha: 1,
                    },
                    secondary: {
                        color: '#999',
                        alpha: 1,
                    },
                },
                background: {
                    color: {
                        color: '#000',
                        alpha: 1,
                    },
                    image: null,
                    video: null,
                },
                textStyles: {
                    heading1: {
                        color: {
                            color: '#FFF',
                            alpha: 1,
                        },
                        align: 'left',
                        fontFamily: 'Arial',
                        fontSize: 32,
                        fontStyle: {
                            bold: false,
                            italic: false,
                            underline: false,
                        },
                        lineHeight: 1,
                        letterSpacing: 0,
                    },
                    heading2: {
                        color: {
                            color: '#FFF',
                            alpha: 1,
                        },
                        align: 'left',
                        fontFamily: 'Arial',
                        fontSize: 24,
                        fontStyle: {
                            bold: false,
                            italic: false,
                            underline: false,
                        },
                        lineHeight: 1,
                        letterSpacing: 0,
                    },
                    heading3: {
                        color: {
                            color: '#FFF',
                            alpha: 1,
                        },
                        align: 'left',
                        fontFamily: 'Arial',
                        fontSize: 20,
                        fontStyle: {
                            bold: false,
                            italic: false,
                            underline: false,
                        },
                        lineHeight: 1,
                        letterSpacing: 0,
                    },
                    button: {
                        color: {
                            color: '#FFF',
                            alpha: 1,
                        },
                        align: 'left',
                        fontFamily: 'Arial',
                        fontSize: 16,
                        fontStyle: {
                            bold: true,
                            italic: false,
                            underline: false,
                        },
                        lineHeight: 1,
                        letterSpacing: 0,
                    },
                    text: {
                        color: {
                            color: '#FFF',
                            alpha: 1,
                        },
                        align: 'left',
                        fontFamily: 'Georgia',
                        fontSize: 16,
                        fontStyle: {
                            bold: false,
                            italic: false,
                            underline: false,
                        },
                        lineHeight: 1,
                        letterSpacing: 0,
                    },
                },
            },
            metadata: [],
            settings: [],
            components: [
                {
                    background: {
                        color: {
                            color: '#000',
                            alpha: 1,
                        },
                        image: null,
                    },
                    id: 'ff86a460-67de-11f0-928c-23fe9f2cc927',
                    type: 'quiz',
                    layout: 'top',
                    question: {
                        body: '<span>Question test</span>',
                        textStyle: {
                            color: {
                                color: '#FFF',
                                alpha: 1,
                            },
                            align: 'left',
                            fontFamily: 'Arial',
                            fontSize: 24,
                            fontStyle: {
                                bold: false,
                                italic: false,
                                underline: false,
                            },
                            lineHeight: 1,
                            letterSpacing: 0,
                        },
                    },
                    answers: [
                        {
                            label: {
                                body: 'Test 1',
                                textStyle: {
                                    color: {
                                        color: '#FFF',
                                        alpha: 1,
                                    },
                                    align: 'left',
                                    fontFamily: 'Arial',
                                    fontSize: 16,
                                    fontStyle: {
                                        bold: true,
                                        italic: false,
                                        underline: false,
                                    },
                                    lineHeight: 1,
                                    letterSpacing: 0,
                                },
                            },
                        },
                        {
                            label: {
                                body: 'Test 2',
                                textStyle: {
                                    color: {
                                        color: '#FFF',
                                        alpha: 1,
                                    },
                                    align: 'left',
                                    fontFamily: 'Arial',
                                    fontSize: 16,
                                    fontStyle: {
                                        bold: true,
                                        italic: false,
                                        underline: false,
                                    },
                                    lineHeight: 1,
                                    letterSpacing: 0,
                                },
                            },
                        },
                        {
                            label: {
                                body: 'Test 3',
                                textStyle: {
                                    color: {
                                        color: '#FFF',
                                        alpha: 1,
                                    },
                                    align: 'left',
                                    fontFamily: 'Arial',
                                    fontSize: 16,
                                    fontStyle: {
                                        bold: true,
                                        italic: false,
                                        underline: false,
                                    },
                                    lineHeight: 1,
                                    letterSpacing: 0,
                                },
                            },
                        },
                    ],
                    buttonsTextStyle: {
                        highlight: {
                            color: null,
                        },
                        fontFamily: {
                            name: 'Apercu_Bold',
                            media: 'media://62',
                            variants: [],
                            type: 'custom',
                        },
                        fontStyle: {
                            bold: false,
                            italic: false,
                            underline: false,
                        },
                        color: {
                            color: '#00ff11',
                            alpha: 1,
                        },
                        fontSize: 24,
                    },
                },
                {
                    background: {
                        color: {
                            color: '#000',
                            alpha: 1,
                        },
                        image: null,
                    },
                    id: '016bdf20-67df-11f0-928c-23fe9f2cc927',
                    type: 'quiz-multiple',
                    introLayout: 'middle',
                    layout: 'top',
                    questions: [
                        {
                            text: {
                                body: '<span>Ceci est une question test</span>',
                                textStyle: null,
                            },
                            answers: [
                                {
                                    label: {
                                        body: 'Test 1',
                                        textStyle: null,
                                    },
                                },
                                {
                                    label: {
                                        body: 'Test 2',
                                    },
                                },
                                {
                                    label: {
                                        body: 'Test 3',
                                        textStyle: {
                                            color: {
                                                color: '#FFF',
                                                alpha: 1,
                                            },
                                            align: 'left',
                                            fontFamily: 'Arial',
                                            fontSize: 16,
                                            fontStyle: {
                                                bold: true,
                                                italic: false,
                                                underline: false,
                                            },
                                            lineHeight: 1,
                                            letterSpacing: 0,
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                    questionsHeadingStyle: {
                        fontFamily: {
                            name: 'GarageGothic-Bold',
                            media: 'media://60',
                            variants: [],
                            type: 'custom',
                        },
                        color: {
                            color: '#00ff1f',
                            alpha: 1,
                        },
                    },
                    buttonsTextStyle: {
                        fontFamily: {
                            name: 'Agrandir Tight',
                            media: 'media://2452',
                            variants: [
                                {
                                    weight: '700',
                                    style: 'normal',
                                    fvd: 'n7',
                                    media: 'media://2519',
                                },
                                {
                                    weight: '900',
                                    style: 'normal',
                                    fvd: 'n9',
                                    media: 'media://2457',
                                },
                                {
                                    weight: '500',
                                    style: 'normal',
                                    fvd: 'n5',
                                    media: 'media://2522',
                                },
                            ],
                            type: 'custom',
                        },
                        fontStyle: {
                            bold: true,
                            italic: false,
                            underline: false,
                        },
                        color: {
                            color: '#e000ff',
                            alpha: 1,
                        },
                    },
                },
                {
                    background: {
                        color: {
                            color: '#000',
                            alpha: 1,
                        },
                        image: null,
                    },
                    id: '057dbde0-67df-11f0-928c-23fe9f2cc927',
                    type: 'survey',
                    layout: 'top',
                    customAnswer: false,
                    question: {
                        body: '<span>Question test</span>',
                        textStyle: {
                            color: {
                                color: '#FFF',
                                alpha: 1,
                            },
                            align: 'left',
                            fontFamily: 'Arial',
                            fontSize: 24,
                            fontStyle: {
                                bold: false,
                                italic: false,
                                underline: false,
                            },
                            lineHeight: 1,
                            letterSpacing: 0,
                        },
                    },
                    answers: [
                        {
                            label: {
                                body: 'Test sondage 1',
                                textStyle: {
                                    color: {
                                        color: '#FFF',
                                        alpha: 1,
                                    },
                                    align: 'left',
                                    fontFamily: 'Arial',
                                    fontSize: 16,
                                    fontStyle: {
                                        bold: true,
                                        italic: false,
                                        underline: false,
                                    },
                                    lineHeight: 1,
                                    letterSpacing: 0,
                                },
                            },
                        },
                        {
                            label: {
                                body: 'Test sondage 2',
                                textStyle: {
                                    color: {
                                        color: '#FFF',
                                        alpha: 1,
                                    },
                                    align: 'left',
                                    fontFamily: 'Arial',
                                    fontSize: 16,
                                    fontStyle: {
                                        bold: true,
                                        italic: false,
                                        underline: false,
                                    },
                                    lineHeight: 1,
                                    letterSpacing: 0,
                                },
                            },
                        },
                    ],
                },
            ],
        }}
    />
));
