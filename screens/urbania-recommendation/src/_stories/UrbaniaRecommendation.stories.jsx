/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ScreenDefinition from '../../../../.storybook/components/ScreenDefinition';
import {
    // text,
    // title,
    backgroundImage,
    backgroundVideo,
    imageMedia,
    transitions,
    headerFooter,
} from '../../../../.storybook/data';
import UrbaniaRecommendation from '../UrbaniaRecommendation';
import definition from '../definition';

const props = {
    // category: { body: title() },
    // date: text('short'),
    // title: { body: title() },
    // sponsor: text('short'),
    // description: text('medium'),
    category: { body: 'Pièce de théâtre' },
    date: { body: '<p>du <strong>14 FÉVRIER</strong> au <strong>5 MARS</strong></p>' },
    title: { body: 'Blackbird' },
    sponsor: { body: '<p>suggéré par <strong>banque national</strong></p>' },
    location: { body: '<p>suggéré par <strong>banque national</strong></p>' },
    description: {
        body: '<p><strong>LE PITCH</strong></p><p>Un festival hivernal de musique urbaine pour célébrer le nouvel an à Québec.</p><p><strong>Pourquoi on aime?</strong></p><p>Ambiance festive et programmation électro gratuite. Que demander de plus.',
    },
    visual: { image: imageMedia({ width: 309, height: 223 }), visualLayout: 'label-top' },

    background: backgroundImage({ width: 320, height: 480 }),
    transitions: transitions(),
};

const video = {
    image: {
        id: '2853',
        type: 'video',
        name: '10928-094407.mp4',
        url: 'https://cdn.microm.ag/video/2022-06-03/11316-070844.mp4',
        thumbnail_url: 'https://img.microm.ag/image/2022-06-03/filters/thumbnail/11317-070845.jpg',
        files: {
            original: {
                id: '11316',
                type: 'video',
                mime: 'video/mp4',
                handle: 'original',
                name: '10928-094407.mp4',
                url: 'https://cdn.microm.ag/video/2022-06-03/11316-070844.mp4',
            },
            'thumbnails.0': {
                id: '11317',
                type: 'image',
                mime: 'image/jpeg',
                handle: 'thumbnails.0',
                name: 'mediatheque_pipeline_jobi8pV7I-thumbnails-0.jpg',
                url: 'https://cdn.microm.ag/image/2022-06-03/11317-070845.jpg',
            },
            'thumbnails.1': {
                id: '11318',
                type: 'image',
                mime: 'image/jpeg',
                handle: 'thumbnails.1',
                name: 'mediatheque_pipeline_jobi8pV7I-thumbnails-1.jpg',
                url: 'https://cdn.microm.ag/image/2022-06-03/11318-070846.jpg',
            },
            'thumbnails.2': {
                id: '11319',
                type: 'image',
                mime: 'image/jpeg',
                handle: 'thumbnails.2',
                name: 'mediatheque_pipeline_jobi8pV7I-thumbnails-2.jpg',
                url: 'https://cdn.microm.ag/image/2022-06-03/11319-070846.jpg',
            },
            'thumbnails.3': {
                id: '11320',
                type: 'image',
                mime: 'image/jpeg',
                handle: 'thumbnails.3',
                name: 'mediatheque_pipeline_jobi8pV7I-thumbnails-3.jpg',
                url: 'https://cdn.microm.ag/image/2022-06-03/11320-070846.jpg',
            },
            'thumbnails.4': {
                id: '11321',
                type: 'image',
                mime: 'image/jpeg',
                handle: 'thumbnails.4',
                name: 'mediatheque_pipeline_jobi8pV7I-thumbnails-4.jpg',
                url: 'https://cdn.microm.ag/image/2022-06-03/11321-070847.jpg',
            },
            h264: {
                id: '11322',
                type: 'video',
                mime: 'video/mp4',
                handle: 'h264',
                name: 'mediatheque_pipeline_jobhRLAAT-h264.mp4',
                url: 'https://cdn.microm.ag/video/2022-06-03/11322-070855.mp4',
            },
            webm: {
                id: '11323',
                type: 'video',
                mime: 'video/webm',
                handle: 'webm',
                name: 'mediatheque_pipeline_jobJEN1LW-webm.webm',
                url: 'https://cdn.microm.ag/video/2022-06-03/11323-070923.webm',
            },
        },
        metadata: {
            filename: '10928-094407.mp4',
            size: 4802151,
            mime: 'video/mp4',
            description: null,
            duration: 10.0467,
            width: 720,
            height: 1280,
            has_audio: null,
        },
    },
    visualLayout: 'label-top',
};

export default {
    title: 'Urbania Screens/UrbaniaRecommendation',
    component: UrbaniaRecommendation,
    parameters: {
        intl: true,
        screenDefinition: definition.find((it) => it.component === UrbaniaRecommendation),
    },
};

export const Placeholder = (storyProps) => <UrbaniaRecommendation {...storyProps} />;

export const Preview = (storyProps) => <UrbaniaRecommendation {...storyProps} {...props} />;
export const Static = (storyProps) => <UrbaniaRecommendation {...storyProps} {...props} />;
export const Capture = (storyProps) => <UrbaniaRecommendation {...storyProps} {...props} />;

export const Edit = (storyProps) => <UrbaniaRecommendation {...storyProps} />;

export const Normal = (storyProps) => (
    <UrbaniaRecommendation
        {...storyProps}
        {...props}
        visual={{ image: imageMedia({ width: 1309, height: 1223 }), visualLayout: 'label-bottom' }}
    />
);

export const VisualBottom = (storyProps) => (
    <UrbaniaRecommendation
        {...storyProps}
        {...props}
        visual={{ image: imageMedia({ width: 309, height: 223 }), visualLayout: 'label-top' }}
    />
);

export const WithVideoVisual = (storyProps) => (
    <UrbaniaRecommendation {...storyProps} {...props} visual={video} />
);

export const WithoutVisual = (storyProps) => (
    <UrbaniaRecommendation {...storyProps} {...props} visual={{ visualLayout: 'label-top' }} />
);

export const WithVideoBackground = (storyProps) => (
    <UrbaniaRecommendation {...storyProps} {...props} background={backgroundVideo()} />
);

export const WithHeaderFooter = (storyProps) => (
    <UrbaniaRecommendation
        {...storyProps}
        {...props}
        // visual={{}}
        // category={{ body: 'Sports' }}
        // description={{
        //     body: '<p>Blblbl</p>',
        // }}
        {...headerFooter()}
    />
);

export const Definition = (storyProps) => <ScreenDefinition {...storyProps} />;
