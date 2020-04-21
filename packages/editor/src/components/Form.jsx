/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useHistory, useRouteMatch } from 'react-router';
import TransitionGroup from 'react-addons-css-transition-group';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { slug } from '@micromag/core/utils';
import { useFormsComponents, usePanels } from '@micromag/core/contexts';
import { Empty, Panels } from '@micromag/core/components';

import { updateScreen, duplicateScreen, deleteScreen } from '../utils';
import useFormTransition from '../hooks/useFormTransition';
import SettingsButton from './buttons/Settings';
import Breadcrumb from './menus/Breadcrumb';
import ScreenForm from './forms/Screen';
import FieldForm from './forms/Field';

import styles from '../styles/form.module.scss';

const propTypes = {
    value: MicromagPropTypes.story,
    className: PropTypes.string,
    onChange: PropTypes.func,
    formComponents: MicromagPropTypes.components,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
    formComponents: null,
};

const EditForm = ({ value, className, onChange, formComponents }) => {
    const contextFormComponents = useFormsComponents();
    const finalFormComponents = formComponents || contextFormComponents;
    const formRegEx = Object.keys(finalFormComponents)
        .map(name => slug(name))
        .join('|');

    // Match routes
    const history = useHistory();
    const {
        url,
        params: { screen: screenId = null, field: fieldParams = null, form: formParams = null },
    } = useRouteMatch({
        path: [`/:screen/:field+/:form(${formRegEx})`, `/:screen/:field+`, '/:screen', '*'],
    });

    // Get screen
    const { components: screens = [] } = value || {};
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
        newScreenValue => triggerOnChange(updateScreen(value, newScreenValue)),
        [value, triggerOnChange],
    );

    const onClickScreenDelete = useCallback(
        ({ id: deleteScreenId }) => triggerOnChange(deleteScreen(value, deleteScreenId)),
        [value, triggerOnChange],
    );

    const onClickDuplicate = useCallback(() => triggerOnChange(duplicateScreen(value, screenId)), [
        value,
        screenId,
        triggerOnChange,
    ]);

    const onClickDelete = useCallback(() => {
        // eslint-disable-next-line no-alert
        if (window.confirm('Êtes-vous certain de vouloir supprimer cet écran?')) {
            triggerOnChange(deleteScreen(value, screenId));
        }
    }, [value, screenId, triggerOnChange]);

    const gotoFieldForm = useCallback(
        (field, formName = null) =>
            history.push(
                `/${screenId}/${field.replace(/\./g, '/')}${
                    formName !== null ? `/${slug(formName)}` : ''
                }`,
            ),
        [history, screenId],
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
                        value={value}
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
