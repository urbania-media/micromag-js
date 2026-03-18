import preview from '#.storybook/preview';
import React from 'react';

import Link from './Link';

const meta = preview.meta({
    component: Link,
    title: 'Elements/Link',
});

export const external = meta.story(() => (
    <Link url="http://www.urbania.ca" external>
        Hello
    </Link>
));
