/* eslint-disable react/jsx-props-no-spreading */
import LayoutGrid from '#.storybook/components/LayoutGrid';
import preview from '#.storybook/preview';
import React from 'react';

import Layout from './Layout';

const meta = preview.meta({
    component: Layout,
    title: 'Elements/Layout',
});

const layouts = [
    {
        name: 'Top',
        verticalAlign: 'top',
    },
    {
        name: 'Middle',
        verticalAlign: 'middle',
    },
    {
        name: 'Bottom',
        verticalAlign: 'bottom',
    },
    {
        name: 'Top/Right',
        verticalAlign: 'top',
        horizontalAlign: 'right',
    },
];

export const normal = meta.story(() => (
    <LayoutGrid layouts={layouts}>
        {(layout) => (
            <div
                style={{
                    width: 100,
                    height: 200,
                    border: 'solid 1px #000',
                }}
            >
                <Layout width={100} height={200} {...layout}>
                    Bonjour
                </Layout>
            </div>
        )}
    </LayoutGrid>
));
