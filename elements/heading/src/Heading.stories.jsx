import React from 'react';
import Heading from './Heading';

export default {
    component: Heading,
    title: 'Elements/Heading',
};

export const normal = () => (
    <>
        <Heading body="This is a heading 1" size={1} />
        <Heading body="This is a heading 2" size={2} />
        <Heading body="This is a heading 3" size={3} />
    </>
);
