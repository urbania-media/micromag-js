import React from 'react';
import Heading from './Heading';

export default {
    component: Heading,
    title: 'Elements/Heading',
};

export const normal = () => (
    <>
        <Heading body="Heading 1" size={1} /><br/>
        <Heading body="Heading 2" size={2} /><br/>
        <Heading body="Heading 3" size={3} /><br/>
        <Heading body="Heading 4" size={4} /><br/>
        <Heading body="Heading 5" size={5} /><br/>
        <Heading body="Heading 6" size={6} /><br/>
    </>
);
