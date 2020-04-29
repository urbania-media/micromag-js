/* eslint-disable react/no-array-index-key */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Route } from 'react-router';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useRoutes, useRoutePush, useUrlGenerator } from '@micromag/core/contexts';
import { Label } from '@micromag/core/components';
import { useSchemasRepository, SCREENS_NAMESPACE } from '@micromag/schemas';

import createScreenFromType from '../utils/createScreenFromType';
import Screens from './menus/Screens';
import PlusButton from './buttons/Plus';
import ScreenTypesModal from './modals/ScreenTypes';

import messages from '../messages';
import styles from '../styles/screens.module.scss';

const propTypes = {
    story: MicromagPropTypes.story,
    isVertical: PropTypes.bool,
    onClickScreen: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    story: null,
    isVertical: false,
    onClickScreen: null,
    onChange: null,
    className: null,
};

const EditorScreens = ({ story, isVertical, onClickScreen, onChange, className }) => {
    const { components: screens = [] } = story || {};

    const [createModalOpened, setCreateModalOpened] = useState(false);
    const routes = useRoutes();
    const push = useRoutePush();
    const url = useUrlGenerator();
    const repository = useSchemasRepository();

    const createScreen = useCallback(
        (type, layout = null) => {
            const defaultValues = repository.getDefaultValuesFromSchema(
                `${SCREENS_NAMESPACE}/${type}`,
            );
            const newScreen = {
                ...createScreenFromType(type, defaultValues),
                layout,
            };
            const { components = [], ...currentValue } = story || {};
            const newValue = {
                ...currentValue,
                components: [...components, newScreen],
            };
            if (onChange !== null) {
                onChange(newValue);
            }
            push('screen', {
                screen: newScreen.id,
            });
            setCreateModalOpened(false);
        },
        [story, onChange, push, setCreateModalOpened],
    );

    const onOrderChange = useCallback(
        listItems => {
            const ids = listItems.map(({ id }) => id);
            const { components = [], ...currentValue } = story || {};
            const newValue = {
                ...currentValue,
                components: [...components].sort(({ id: idA }, { id: idB }) => {
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
        },
        [story, onChange],
    );

    const onClickScreenType = useCallback((e, item) => createScreen(item.type), [createScreen]);
    const onClickAdd = useCallback(() => setCreateModalOpened(true), [setCreateModalOpened]);
    const onCreateModalRequestClose = useCallback(() => setCreateModalOpened(false), [
        setCreateModalOpened,
    ]);

    // console.log(routes.home, routes.screen);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <div className={styles.top}>
                <h4 className={styles.title}>
                    <Label>{messages.screens}</Label>
                </h4>
                <PlusButton className={styles.button} onClick={onClickAdd} />
            </div>
            <Route
                path={[routes.screen, routes.home]}
                render={({
                    match: {
                        params: { screen: screenId = null },
                    },
                }) => (
                    <Screens
                        items={screens.map(it => ({
                            ...it,
                            href: url('screen', {
                                screen: it.id,
                            }),
                            active: it.id === screenId,
                        }))}
                        isVertical={isVertical}
                        withPreview
                        sortable
                        className={styles.screens}
                        onClickItem={onClickScreen}
                        onOrderChange={onOrderChange}
                    />
                )}
            />
            {createModalOpened ? (
                <ScreenTypesModal
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
