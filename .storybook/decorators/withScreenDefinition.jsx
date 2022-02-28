import React from 'react';
import LayoutGrid from '../components/LayoutGrid';
import LayoutSwitcher from '../components/LayoutSwitcher';
import Screen from '../components/Screen';

const withScreenDefinition = (
    Story,
    {
        story,
        parameters: {
            screenDefinition = null,
            defaultScreen = null,
            screenOptions: { gridWidth = 100, gridHeight = 150 } = {}
        },
        args,
    },
) => {
    if (screenDefinition === null) {
        return <Story />;
    }

    if (story === 'Definition') {
        return <Story args={{ ...args, definition: screenDefinition, defaultScreen, }} />;
    }

    const { layouts = null } = screenDefinition || {};

    if (story === 'Placeholder') {
        return (
            <LayoutGrid layouts={layouts}>
                {(layout) => (
                    <Screen
                        definition={screenDefinition}
                        width={gridWidth}
                        height={gridHeight}
                        withBorder
                        renderContext="placeholder"
                    >
                        <Story args={{ ...args, layout }} />
                    </Screen>
                )}
            </LayoutGrid>
        );
    }

    if (story === 'Preview' || story === 'Edit' || story === 'Static' || story === 'Capture') {
        return (
            <LayoutSwitcher layouts={layouts}>
                {(layout) => (
                    <Screen
                        definition={screenDefinition}
                        renderContext={story.toLowerCase()}
                    >
                        <Story args={{ ...args, layout }} />
                    </Screen>
                )}
            </LayoutSwitcher>
        );
    }

    return layouts !== null ? (
        <LayoutSwitcher layouts={layouts}>
            {(layout) => (
                <Screen definition={screenDefinition}>
                    <Story args={{ ...args, layout }} />
                </Screen>
            )}
        </LayoutSwitcher>
    ) : (
        <Screen definition={screenDefinition}>
            <Story />
        </Screen>
    );
};

export default withScreenDefinition;
