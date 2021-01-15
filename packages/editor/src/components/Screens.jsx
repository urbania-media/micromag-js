/* eslint-disable react/no-array-index-key */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Route } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useRoutes, useRoutePush, useUrlGenerator } from '@micromag/core/contexts';
import { Empty, Button, Navbar } from '@micromag/core/components';
import { useParsedStory } from '@micromag/core/hooks';

import useThemeValue from '../hooks/useThemeValue';
import createScreen from '../utils/createScreen';
import Screens from './menus/Screens';
import ScreenTypesModal from './modals/ScreenTypes';

const propTypes = {
    value: PropTypes.oneOfType([MicromagPropTypes.story, MicromagPropTypes.theme]),
    isTheme: PropTypes.bool,
    isVertical: PropTypes.bool,
    onClickScreen: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    isTheme: false,
    isVertical: false,
    onClickScreen: null,
    onChange: null,
    className: null,
};

const EditorScreens = ({ value: unparsedValue, isTheme, isVertical, onClickScreen, onChange, className }) => {
    const valueWithTheme = useThemeValue(unparsedValue, isTheme);
    const value = useParsedStory(valueWithTheme, { withMedias: false });
    const { components: screens = [] } = value || {};

    const [createModalOpened, setCreateModalOpened] = useState(false);
    const routes = useRoutes();
    const push = useRoutePush();
    const url = useUrlGenerator();

    const createScreenFromDefinition = useCallback(
        (definition) => {
            const newScreen = createScreen(definition);
            const { components: currentScreens = [] } = value || {};
            const newValue = {
                ...value,
                components: [...(currentScreens || []), newScreen],
            };
            if (onChange !== null) {
                onChange(newValue);
            }
            return newScreen;
        },
        [value, onChange, setCreateModalOpened],
    );

    const onOrderChange = useCallback(
        (listItems) => {
            const ids = listItems.map(({ id }) => id);
            const { components: currentScreens = [] } = value || {};

            const currentIds = currentScreens.map(({ id }) => id);
            const sameOrder = listItems.reduce((same, {id}, index) => same && id === currentIds[index], true);

            if (!sameOrder){
                const newValue = {
                    ...value,
                    components: [...currentScreens].sort(({ id: idA }, { id: idB }) => {
                        const indexA = ids.indexOf(idA);
                        const indexB = ids.indexOf(idB);
                        if (indexA === indexB) {
                            return 0;
                        }
                        return indexA > indexB ? 1 : -1;
                    }),
                };

                if (onChange !== null) {
                    onChange(newValue);
                }
            }
        },
        [value, onChange],
    );

    const onClickScreenType = useCallback(
        (e, definition) => {
            setCreateModalOpened(false);

            let currentScreen = isTheme
                ? screens.find(({ type }) => type === definition.id) || null
                : null;
            if (!isTheme || currentScreen === null) {
                currentScreen = createScreenFromDefinition(definition);
            }

            push('screen', {
                screen: currentScreen.id,
            });

            onClickScreen(currentScreen);
        },
        [screens, isTheme, createScreenFromDefinition, push, onClickScreen],
    );
    const onClickAdd = useCallback(() => setCreateModalOpened(true), [setCreateModalOpened]);
    const onCreateModalRequestClose = useCallback(() => setCreateModalOpened(false), [
        setCreateModalOpened,
    ]);

    // console.log(routes.home, routes.screen);

    return (
        <div className={classNames(['d-flex', 'flex-column', className])}>
            <Navbar theme="dark" compact noWrap withoutCollapse>
                <strong className="mb-0 mr-auto">
                    <FormattedMessage
                        defaultMessage="Screens"
                        description="Title of the screens section"
                    />
                </strong>
                <Button
                    theme="primary"
                    size="sm"
                    onClick={onClickAdd}
                    icon={<FontAwesomeIcon icon={faPlus} />}
                />
            </Navbar>
            <div className="flex-grow-1 d-flex w-100 p-2">
                <Route
                    path={[routes.screen, routes.home]}
                    render={({
                        match: {
                            params: { screen: screenId = null },
                        },
                    }) =>
                        screens.length > 0 ? (
                            <Screens
                                items={screens.map((it) => ({
                                    id: it.id,
                                    screen: it,
                                    href: url('screen', {
                                        screen: it.id,
                                    }),
                                    active: it.id === screenId,
                                }))}
                                isVertical={isVertical}
                                withPreview
                                sortable
                                className="w-100"
                                onClickItem={onClickScreen}
                                onOrderChange={onOrderChange}
                            />
                        ) : (
                            <Empty className="flex-grow-1 p-2">
                                <Button theme="primary" onClick={onClickAdd}>
                                    <FormattedMessage
                                        defaultMessage="Create your first screen"
                                        description="Button to create your first screen"
                                    />
                                </Button>
                            </Empty>
                        )
                    }
                />
            </div>
            {createModalOpened ? (
                <ScreenTypesModal
                    selectedTypes={isTheme ? screens.map(({ type }) => type) : []}
                    onClickScreenType={onClickScreenType}
                    onRequestClose={onCreateModalRequestClose}
                />
            ) : null}
        </div>
    );
};

EditorScreens.propTypes = propTypes;
EditorScreens.defaultProps = defaultProps;

export default EditorScreens;
