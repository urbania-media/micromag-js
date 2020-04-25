/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRouteMatch } from 'react-router';
import TransitionGroup from 'react-addons-css-transition-group';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { slug } from '@micromag/core/utils';
import { usePanels, useHistoryPush, useRoutes } from '@micromag/core/contexts';
import { Empty, Panels } from '@micromag/core/components';

import { updateScreen, duplicateScreen, deleteScreen } from '../utils';
import useFormTransition from '../hooks/useFormTransition';
import SettingsButton from './buttons/Settings';
import Breadcrumb from './menus/Breadcrumb';
import ScreenForm from './forms/Screen';
import FieldForm from './forms/Field';

import styles from '../styles/form.module.scss';

const propTypes = {
    story: MicromagPropTypes.story,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    story: null,
    className: null,
    onChange: null,
};

const EditForm = ({ story, className, onChange }) => {
    // Match routes
    const push = useHistoryPush();
    const routes = useRoutes();
    const {
        url,
        params: { screen: screenId = null, field: fieldParams = null, form: formParams = null },
    } = useRouteMatch({
        path: [routes['screen.field.form'], routes['screen.field'], routes.screen, '*'],
    });
    console.log(url, screenId, fieldParams, formParams);

    // Get screen
    const { components: screens = [] } = story || {};
    const screenIndex = screens.findIndex(it => it.id === screenId);
    const screen = screenIndex !== -1 ? screens[screenIndex] : null;

    const { panels } = usePanels();

    // Get transition value
    const { name: transitionName, timeout: transitionTimeout } = useFormTransition(
        url,
        screenIndex,
        styles,
    );

    // Callbacks
    const triggerOnChange = useCallback(
        newValue => {
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [onChange],
    );

    const onScreenFormChange = useCallback(
        newScreenValue => triggerOnChange(updateScreen(story, newScreenValue)),
        [story, triggerOnChange],
    );

    const onClickScreenDelete = useCallback(
        ({ id: deleteScreenId }) => triggerOnChange(deleteScreen(story, deleteScreenId)),
        [story, triggerOnChange],
    );

    const onClickDuplicate = useCallback(() => triggerOnChange(duplicateScreen(story, screenId)), [
        story,
        screenId,
        triggerOnChange,
    ]);

    const onClickDelete = useCallback(() => {
        // eslint-disable-next-line no-alert
        if (window.confirm('Êtes-vous certain de vouloir supprimer cet écran?')) {
            triggerOnChange(deleteScreen(story, screenId));
        }
    }, [story, screenId, triggerOnChange]);

    const gotoFieldForm = useCallback(
        (field, formName = null) =>
            push(formName !== null ? 'screen.field.form' : 'screen.field', {
                screen: screenId,
                field: field.split('.'),
                form: formName !== null ? slug(formName) : null,
            }),
        [push, screenId],
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
                {screenId !== null ? (
                    <Breadcrumb
                        story={story}
                        url={url}
                        screenId={screenId}
                        field={fieldParams}
                        form={formParams}
                        panel={panels !== null && panels.length > 0 ? panels[0] : null}
                        className={styles.breadcrumb}
                    />
                ) : null}
                <SettingsButton
                    className={styles.settings}
                    onClickDuplicate={onClickDuplicate}
                    onClickDelete={onClickDelete}
                />
            </div>
            <div
                className={classNames([
                    styles.content,
                    {
                        [styles.hasPanels]: panels !== null && panels.length > 0,
                    },
                ])}
            >
                {screen === null ? (
                    <Empty className={styles.empty}>Sélectionnez un écran...</Empty>
                ) : null}

                {screen !== null ? (
                    <>
                        <TransitionGroup
                            transitionName={transitionName}
                            transitionEnterTimeout={transitionTimeout}
                            transitionLeaveTimeout={transitionTimeout}
                        >
                            {fieldParams !== null ? (
                                <div
                                    className={styles.panel}
                                    key={`field-${fieldParams}-${formParams}`}
                                >
                                    <FieldForm
                                        value={screen}
                                        field={fieldParams.replace(/\//g, '.')}
                                        form={formParams}
                                        className={styles.form}
                                        gotoFieldForm={gotoFieldForm}
                                        onChange={onScreenFormChange}
                                    />
                                </div>
                            ) : (
                                <div className={styles.panel} key={`screen-${screen.id}`}>
                                    <ScreenForm
                                        value={screen}
                                        className={styles.form}
                                        onChange={onScreenFormChange}
                                        gotoFieldForm={gotoFieldForm}
                                        onClickDelete={onClickScreenDelete}
                                    />
                                </div>
                            )}
                        </TransitionGroup>
                        <Panels className={styles.panels} />
                    </>
                ) : null}
            </div>
        </div>
    );
};

EditForm.propTypes = propTypes;
EditForm.defaultProps = defaultProps;

export default EditForm;
