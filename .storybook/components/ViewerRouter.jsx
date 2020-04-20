import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { useHistory, Route } from 'react-router';
import { getDeviceScreens } from '../../packages/core/src/utils';
import { useScreenSizeFromElement } from '../../packages/core/src/hooks';
import { ScreenSizeProvider } from '../../packages/core/src/contexts';

import styles from './styles/screen.module.scss';

const ViewerRouter = ({
    width = null,
    height = null,
    className = null,
    screenClassName = null,
    withBorder = false,
    children,
}) => {
    const history = useHistory();
    const onScreenChange = useCallback(
        it => {
            history.push(`/${it.id}`);
        },
        [history],
    );
    return (
        <Route
            path="/:screen?"
            render={({
                match: {
                    params: { screen: screenId = 1 },
                },
            }) => {
                return children({ screenId, onScreenChange });
            }}
        />
    );
};

export default ViewerRouter;
