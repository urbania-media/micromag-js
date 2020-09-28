import React from 'react';
import Stack from '@micromag/element-stack';
import { image as imageCreator, videoFile, video  } from '../../../.storybook/data';
import Background from './Background';

export default {
    component: Background,
    title: 'Elements/Background',
};

export const color = () => (
    <Stack axisAlign='around' direction='row' spacing={10}>
        <Background width={400} height={200} color={{ color: '#ff02cc', alpha: 0.5 }} />
        <Background width={200} height={350} color={{ color: '#FF9100', alpha: 1 }} />
        <Background width={350} height={200} color={{ color: '#FFFF00', alpha: 0.8 }} />
    </Stack>
);

export const image = () => (
    <Stack axisAlign='around' direction='row' spacing={10}>
        <div>
            <h4>Position center</h4>
            <Background
                width={200}
                height={200}
                image={imageCreator()}
                fit
                horizontalAlign="left"
            />
        </div>

        <div>
            <h4>Position right bottom</h4>
            <Background
                width={200}
                height={200}
                image={imageCreator()}
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
                image={imageCreator()}
                noResize
                horizontalAlign="left"
                verticalAlign="top"
            />
        </div>
    </Stack>
);

export const imageWithColor = () => (
    <Stack axisAlign='around' direction='row' spacing={10}>
        <div>
            <h4>Position center</h4>
            <Background
                width={350}
                height={600}
                image={imageCreator()}
                color={{ color: '#FFFF00', alpha: 0.8 }}
            />
        </div>
    </Stack>
);

export const videoUploaded = () => (
    <Background width={200} height={200} video={videoFile()} playing={false} />
);

export const videoYoutube = () => (
    <Background width={200} height={200} video={video()} playing={false} />
);
