import preview from '#.storybook/preview';

import StaticField from '../components/StaticField';

const meta = preview.meta({
    component: StaticField,
    title: 'Fields/StaticField',
});

export const normal = meta.story(() => (
    <div className="container mt-4">
        <StaticField value="Some static value" />
    </div>
));

export const disabled = meta.story(() => (
    <div className="container mt-4">
        <StaticField value="Some static value" />
    </div>
));
