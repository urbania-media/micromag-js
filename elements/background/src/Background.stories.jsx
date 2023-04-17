import React from 'react';

import { gifVideoMedia, imageMedia, videoMedia } from '../../../.storybook/data';
import Background from './Background';
import BackgroundLayers from './BackgroundLayers';

export default {
    component: Background,
    title: 'Elements/Background',
};

export const layers = () => (
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
);

export const color = () => (
    <Background width={200} height={350} color={{ color: '#ff0000', alpha: 0.5 }} />
);

export const image = () => (
    <Background
        width={200}
        height={350}
        media={imageMedia({ width: 400, height: 200 })}
        fit="cover"
        color={{ color: 'black' }}
    />
);

export const video = () => (
    <Background width={200} height={350} color={{ color: 'black' }} media={videoMedia()} playing />
);
