import preview from '#.storybook/preview';

import * as Placeholders from '../components/placeholders';

const meta = preview.meta({
    title: 'Core/Placeholders',

    parameters: {
        intl: true,
        router: true,
    },
});

export const Default = meta.story(() => (
    <div className="row gap-3">
        {Object.keys(Placeholders).map((key) => {
            const Component = Placeholders[key];
            return (
                <div className="col" key={key}>
                    <h6>{key}</h6>
                    <div>
                        <Component />
                    </div>
                </div>
            );
        })}
    </div>
));
