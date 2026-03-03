import preview from '#.storybook/preview';
import React from 'react';

import Link from './Link';

const meta = preview.meta({
    component: Link,
    title: 'Elements/Link',
});

export const external = meta.story(() => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link url="http://www.urbania.ca" external>
        Hello
    </Link>
));
