/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Route } from 'react-router';
import { ScreensProvider } from '@micromag/screens';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import Viewer from './Viewer';

const propTypes = {
    screen: PropTypes.string,
    renderFormat: MicromagPropTypes.renderFormat,
    children: PropTypes.func,
};

const defaultProps = {
    screen: null,
    renderFormat: 'view',
    children: null,
};

const ViewerContainer = ({ screen: defaultId, ...otherProps }) => {
    const history = useHistory();
    const onScreenChange = useCallback(
        it => {
            history.push(`/${it.id}`);
        },
        [history],
    );

    return (
        <ScreensProvider>
            <Route
                path="/:screen?"
                render={({
                    match: {
                        params: { screen: screenId = defaultId || null },
                    },
                }) => <Viewer screen={screenId} onScreenChange={onScreenChange} {...otherProps} />}
            />
        </ScreensProvider>
    );
};

ViewerContainer.propTypes = propTypes;
ViewerContainer.defaultProps = defaultProps;

export default ViewerContainer;
