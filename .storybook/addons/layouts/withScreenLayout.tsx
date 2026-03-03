import React from 'react';
import { makeDecorator } from 'storybook/preview-api';
import { useAddonState } from 'storybook/manager-api';
import LayoutGrid from '../../components/LayoutGrid';
import { ADDON_ID, PARAM_KEY } from './register';

export default makeDecorator({
    name: 'withScreenLayout',
    parameterName: PARAM_KEY,
    skipIfNoParametersOrOptions: true,
    wrapper: (getStory, context, { parameters: layouts }) => {
        const [state, setState] = useAddonState(ADDON_ID, {
            layout: layouts.length > 0 ? layouts[0] : null,
        });
        return getStory({
            ...context,
            screenLayout: null,
        });
    },
});
