/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { imageMedia } from '../../../.storybook/data';
import Image from './Image';

export default {
    component: Image,
    title: 'Elements/Image',
};

export const normal = () => (
    <>
        <div style={{ marginBottom: 20 }}>
            <div>Width set to 100px</div>
            <Image media={imageMedia({ width: 200, height: 400 })} width={100} />
        </div>
        <div style={{ marginBottom: 20 }}>
            <div>Height set to 100px</div>
            <Image media={imageMedia({ width: 200, height: 400 })} height={100} />
        </div>
        <div style={{ marginBottom: 20 }}>
            <div>No size set (using metadata)</div>
            <Image media={imageMedia({ width: 200, height: 400 })} />
        </div>
    </>
);

export const fit = () => (
    <>
        <div style={{ marginBottom: 20 }}>
            <div>Fit contain</div>
            <Image
                media={imageMedia({ width: 200, height: 400 })}
                width={200}
                height={200}
                objectFit={{ fit: 'contain' }}
            />
        </div>
        <div style={{ marginBottom: 20 }}>
            <div>Fit cover</div>
            <Image
                media={imageMedia({ width: 200, height: 400 })}
                width={200}
                height={200}
                objectFit={{ fit: 'cover' }}
            />
        </div>
        <div style={{ marginBottom: 20 }}>
            <div>No fit (stretch)</div>
            <Image media={imageMedia({ width: 200, height: 400 })} width={200} height={200} />
        </div>
    </>
);
