import React from 'react';
import Link from './Link';

export default {
    component: Link,
    title: 'Elements/Link',
};

export const external = () => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link url="http://www.urbania.ca" external>
        Hello
    </Link>
);
