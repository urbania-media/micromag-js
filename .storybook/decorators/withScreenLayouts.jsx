import React from 'react';
import LayoutGrid from '../components/LayoutGrid';
import LayoutSwitcher from '../components/LayoutSwitcher';
import Screen from '../components/Screen';

const withScreenLayouts = (Story, { story, parameters: { screenLayouts = null }, args }) => {
    if (screenLayouts === null || story === 'Definition') {
        return <Story />;
    }

    if (story === 'Placeholder') {
        return (
            <LayoutGrid layouts={screenLayouts}>
                {(layout) => (
                    <Screen width={100} height={200} withBorder>
                        <Story args={{ ...args, layout, renderFormat: 'placeholder' }} />
                    </Screen>
                )}
            </LayoutGrid>
        );
    }

    if (story === 'Preview' || story === 'Edit') {
        return (
            <LayoutSwitcher layouts={screenLayouts}>
                {(layout) => (
                    <Screen>
                        <Story args={{ ...args, layout, renderFormat: story.toLowerCase() }} />
                    </Screen>
                )}
            </LayoutSwitcher>
        );
    }

    return (
        <LayoutSwitcher layouts={screenLayouts}>
            {(layout) => (
                <Screen>
                    <Story args={{ ...args, layout }} />
                </Screen>
            )}
        </LayoutSwitcher>
    );
};

export default withScreenLayouts;
