/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Route, useHistory } from 'react-router';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useModals } from '@micromag/core/contexts';

import createScreenFromType from '../utils/createScreenFromType';
import Screens from './menus/Screens';
import PlusButton from './buttons/Plus';

import styles from '../styles/screens.module.scss';

const propTypes = {
    value: MicromagPropTypes.story,
    isVertical: PropTypes.bool,
    onClickScreen: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    isVertical: false,
    onClickScreen: null,
    onChange: null,
    className: null,
};

const EditorScreens = ({ value, isVertical, onClickScreen, onChange, className }) => {
    const { components: screens = [] } = value || {};

    const { openModal } = useModals();
    const history = useHistory();

    const createScreen = useCallback(
        (type, layout = null) => {
            const newScreen = {
                ...createScreenFromType(type),
                layout,
            };
            const { components = [], ...currentValue } = value || {};
            const newValue = {
                ...currentValue,
                components: [...components, newScreen],
            };
            if (onChange !== null) {
                onChange(newValue);
            }
            history.push(`/${newScreen.id}`);
        },
        [value, onChange, history],
    );

    const onOrderChange = useCallback(
        listItems => {
            const ids = listItems.map(({ id }) => id);
            const { components = [], ...currentValue } = value || {};
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
        [value, onChange],
    );

    const onClickAdd = useCallback(
        () =>
            openModal('ScreenTypes', {
                onClickScreen: (e, { type, layout }) => createScreen(type, layout),
                closeOnClickScreen: true,
            }),
        [createScreen],
    );

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
                <h4 className={styles.title}>Écrans</h4>
                <PlusButton className={styles.button} onClick={onClickAdd} />
            </div>
            <Route
                path="/:screen?"
                render={({
                    match: {
                        params: { screen: screenId = null },
                    },
                }) => (
                    <Screens
                        items={screens.map(it => ({
                            ...it,
                            href: `/${it.id}`,
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
        </div>
    );
};

EditorScreens.propTypes = propTypes;
EditorScreens.defaultProps = defaultProps;

export default EditorScreens;
