import preview from '#.storybook/preview';

import InputGroup from '../components/InputGroup';

const meta = preview.meta({
    component: InputGroup,
    title: 'Fields/InputGroup',
});

export const normal = meta.story(() => (
    <div className="container mt-4">
        <InputGroup prepend="$" append=".00">
            <input type="text" className="form-control" />
        </InputGroup>
    </div>
));

export const disabled = meta.story(() => (
    <div className="container mt-4">
        <InputGroup prepend="$" append=".00">
            <input type="text" className="form-control" disabled />
        </InputGroup>
    </div>
));
