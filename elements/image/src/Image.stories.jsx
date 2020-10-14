import React from 'react';
import Image from './Image';

export default {
    component: Image,
    title: 'Elements/Image',
};

export const normal = () => (
    <Image
        media={{
            url: 'https://picsum.photos/200/300',
        }}
    />
);

export const withSize = () => (
    <>
        <Image
            media={{
                url: 'https://picsum.photos/200/300',
                width: 200,
                height: 200,
            }}
        />
        <Image
            media={{
                url: 'https://picsum.photos/200/300',
                width: 200,
                height: 200,
            }}
            fit={{ size: 'cover' }}
        />
    </>
);
