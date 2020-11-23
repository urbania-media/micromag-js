import React from 'react';
import HStack from '@micromag/element-stack';
import { imageMedia, videoMedia } from '../../../.storybook/data';
import Background from './Background';

export default {
    component: Background,
    title: 'Elements/Background',
};

export const color = () => (
    <HStack spacing="around">
        <Background width={400} height={200} color={{ color: '#ff02cc', alpha: 0.5 }} />
        <Background width={200} height={350} color={{ color: '#FF9100', alpha: 1 }} />
        <Background width={350} height={200} color={{ color: '#FFFF00', alpha: 0.8 }} />
    </HStack>
);

export const image = () => (
    <HStack spacing="around">
        <div>
            <h4>Position center</h4>
            <Background
                width={200}
                height={200}
                image={imageMedia()}
                fit
                horizontalAlign="left"
            />
        </div>

        <div>
            <h4>Position right bottom</h4>
            <Background
                width={200}
                height={200}
                image={imageMedia()}
                noResize
                horizontalAlign="right"
                verticalAlign="bottom"
            />
        </div>

        <div>
            <h4>Position top left</h4>
            <Background
                width={200}
                height={200}
                image={imageMedia()}
                noResize
                horizontalAlign="left"
                verticalAlign="top"
            />
        </div>
    </HStack>
);

export const imageWithColor = () => (
    <Background
        width={350}
        height={600}
        image={imageMedia()}
        color={{ color: '#FFFF00', alpha: 0.8 }}
    />
);

export const videoUploaded = () => (
    <Background width={200} height={200} video={videoMedia()} playing={false} />
);
