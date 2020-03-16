import React from 'react';
import Image from './Image';

export default {
    component: Image,
    title: 'Components/Image',
};

export const normal = () => <Image url="https://picsum.photos/200/300" />;

export const withSize = () => (
    <>
        <Image url="https://picsum.photos/200/300" width={200} height={200} />
        <Image
            url="https://picsum.photos/200/300"
            width={200}
            height={200}
            fit={{ size: 'cover' }}
        />
    </>
);
