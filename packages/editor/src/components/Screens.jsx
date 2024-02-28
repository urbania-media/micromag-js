/* eslint-disable react/no-array-index-key */
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Route, Switch } from 'wouter';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Empty, Navbar } from '@micromag/core/components';
import { useRoutePush, useRoutes, useUrlGenerator } from '@micromag/core/contexts';
import { useParsedStory } from '@micromag/core/hooks';

import useRouteParams from '../hooks/useRouteParams';
import useThemeValue from '../hooks/useThemeValue';
import createScreen from '../utils/createScreen';

import ScreensMenu from './menus/ScreensMenu';
import ScreenTypesModal from './modals/ScreenTypes';

import styles from '../styles/screens.module.scss';

const propTypes = {
    value: PropTypes.oneOfType([MicromagPropTypes.story, MicromagPropTypes.theme]),
    isTheme: PropTypes.bool,
    isVertical: PropTypes.bool,
    isCreateOpened: PropTypes.bool,
    isParsed: PropTypes.bool,
    isTree: PropTypes.bool,
    onClickScreen: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    isTheme: false,
    isVertical: false,
    isCreateOpened: false,
    isParsed: false,
    isTree: false,
    onClickScreen: null,
    onChange: null,
    className: null,
};

const EditorScreens = ({
    value: unparsedValue,
    isTheme,
    isVertical,
    isCreateOpened,
    isParsed,
    isTree,
    onClickScreen,
    onChange,
    className,
}) => {
    const valueWithTheme = useThemeValue(unparsedValue, isTheme);
    const value = isParsed ? unparsedValue : useParsedStory(valueWithTheme, { withMedias: false });
    const { components: screens = [] } = value || {};

    const [createModalOpened, setCreateModalOpened] = useState(isCreateOpened);
    const routes = useRoutes();
    const push = useRoutePush();
    const url = useUrlGenerator();
    const { screen: currentScreenId = null } = useRouteParams({ screenOnly: true });

    const createScreenFromDefinition = useCallback(
        (definition) => {
            const { components: currentScreens = [], theme = {} } = value || {};
            const { id: newScreenType } = isString(definition) ? { id: definition } : definition;
            const { components: themeComponents = null } = theme || {};
            const themeScreen =
                themeComponents !== null
                    ? themeComponents.find((it) => it.type === newScreenType) || null
                    : null;

            const newScreen = createScreen(definition, themeScreen);

            const foundIndex = screens.findIndex(({ id }) => id === currentScreenId);
            const currentScreenIndex = !isTheme && foundIndex >= 0 ? foundIndex + 1 : null;

            const newValue = {
                ...value,
                components: [
                    ...currentScreens.slice(0, currentScreenIndex),
                    newScreen,
                    ...currentScreens.slice(currentScreenIndex),
                ],
            };

            if (onChange !== null) {
                onChange(newValue);
            }
            return newScreen;
        },
        [value, onChange, isTheme, screens, currentScreenId, setCreateModalOpened],
    );

    const onOrderChange = useCallback(
        (listItems) => {
            const ids = listItems.map(({ id }) => id);
            const screenProps = listItems.map(({ id, props = null }) => ({
                id,
                props,
            }));
            const hasScreenProps =
                (screenProps.filter(({ props }) => props !== null) || []).length > 0;
            const { components: currentScreens = [] } = value || {};

            const currentIds = currentScreens.map(({ id }) => id);
            const sameOrder = listItems.reduce(
                (same, { id }, index) => same && id === currentIds[index],
                true,
            );

            if (!sameOrder || hasScreenProps) {
                const newValue = {
                    ...value,
                    components: [...currentScreens]
                        .sort(({ id: idA }, { id: idB }) => {
                            const indexA = ids.indexOf(idA);
                            const indexB = ids.indexOf(idB);
                            if (indexA === indexB) {
                                return 0;
                            }
                            return indexA > indexB ? 1 : -1;
                        })
                        .map(({ id, ...props }) => ({
                            id,
                            ...props,
                            ...screenProps.find(({ id: propsId }) => propsId === id)?.props,
                        })),
                };
                if (onChange !== null) {
                    // console.log('og!', listItems, newValue);
                    onChange(newValue);
                }
            }
        },
        [value, onChange],
    );

    const onClickScreenType = useCallback(
        (definition) => {
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
    const onCreateModalRequestClose = useCallback(
        () => setCreateModalOpened(false),
        [setCreateModalOpened],
    );

    return (
        <div className={classNames(['d-flex', 'flex-column', styles.container, className])}>
            <Navbar
                compact
                noWrap
                withoutCollapse
                className={classNames(['sticky-top', styles.navbar])}
            >
                <strong className="mb-0 me-auto">
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
                <Switch>
                    <Route path={`${routes.screen}/(.*)?`}>
                        {({ screen: screenId = null }) =>
                            screens.length > 0 ? (
                                <ScreensMenu
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
                                    sortable={!isTree}
                                    className="w-100"
                                    onClickItem={onClickScreen}
                                    onOrderChange={onOrderChange}
                                    isTree={isTree}
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
                    </Route>
                    <Route>
                        {screens.length > 0 ? (
                            <ScreensMenu
                                items={screens.map((it) => ({
                                    id: it.id,
                                    screen: it,
                                    href: url('screen', {
                                        screen: it.id,
                                    }),
                                    active: false,
                                }))}
                                isVertical={isVertical}
                                withPreview
                                sortable={!isTree}
                                className="w-100"
                                onClickItem={onClickScreen}
                                onOrderChange={onOrderChange}
                                isTree={isTree}
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
                        )}
                    </Route>
                </Switch>
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
