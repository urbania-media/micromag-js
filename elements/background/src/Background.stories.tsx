import { gifVideoMedia, imageMedia, videoMedia } from '#.storybook/data';
import preview from '#.storybook/preview';
import React from 'react';

import Background from './Background';
import BackgroundLayers from './BackgroundLayers';

const meta = preview.meta({
    component: Background,
    title: 'Elements/Background',
});

export const layers = meta.story(() => (
    <div>
        <h4>Multiple layers</h4>
        <div style={{ position: 'relative', width: 200, height: 350 }}>
            <BackgroundLayers
                background={[
                    { color: { color: '#ffcc00', alpha: 0.5 }, height: '50%' },
                    { media: imageMedia({ width: 200, height: 100 }), fit: 'contain' },
                    {
                        color: { color: '#ff0000', alpha: 0.5 },
                        height: '50%',
                        verticalAlign: 'bottom',
                    },
                ]}
            />
        </div>
        <hr />
        <h4>Legacy</h4>
        <div style={{ position: 'relative', width: 200, height: 350 }}>
            <BackgroundLayers
                background={{
                    image: imageMedia({ width: 200, height: 100 }),
                    color: { color: '#ffcc00', alpha: 0.5 },
                    fit: 'contain',
                }}
            />
        </div>
        <h4>Animated gif</h4>
        <div style={{ position: 'relative', width: 200, height: 350 }}>
            <BackgroundLayers
                width={200}
                height={350}
                background={{
                    media: gifVideoMedia(),
                }}
                playing
            />
        </div>
    </div>
));

export const color = meta.story(() => (
    <Background width={200} height={350} color={{ color: '#ff0000', alpha: 0.5 }} />
));

export const image = meta.story(() => (
    <Background
        width={200}
        height={350}
        media={imageMedia({ width: 400, height: 200 })}
        fit="cover"
        color={{ color: 'black' }}
    />
));

export const video = meta.story(() => (
    <Background width={200} height={350} color={{ color: 'black' }} media={videoMedia()} playing />
));
