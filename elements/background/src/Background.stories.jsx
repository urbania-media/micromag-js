import React from 'react';
import { image as imageCreator, videoFile } from '../../../.storybook/data';
import Background from './Background';

export default {
    component: Background,
    title: 'Elements/Background',
};

export const color = () => (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Background width={400} height={200} color={{ color: '#ff02cc', alpha: 0.5 }} />
        <Background width={200} height={200} color={{ color: '#FF9100', alpha: 1 }} />
        <Background width={200} height={200} color={{ color: '#FFFF00', alpha: 0.8 }} />
    </div>
);

export const image = () => (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
            <h4>Position center</h4>
            <Background
                width={200}
                height={200}
                image={imageCreator()}
                cover
                horizontalPosition="left"
            />
        </div>

        <div>
            <h4>Position right bottom</h4>
            <Background
                width={200}
                height={200}
                image={imageCreator()}
                horizontalPosition="right"
                verticalPosition="bottom"
            />
        </div>

        <div>
            <h4>Position top left</h4>
            <Background
                width={200}
                height={200}
                image={imageCreator()}
                horizontalPosition="left"
                verticalPosition="top"
            />
        </div>
    </div>
);

export const imageWithColor = () => (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
            <h4>Position center</h4>
            <Background
                width={350}
                height={600}
                image={imageCreator()}
                color={{ color: '#FFFF00', alpha: 0.8 }}
            />
        </div>
    </div>
);

export const video = () => (
    <Background width={200} height={200} video={videoFile()} playing={false} />
);
