/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRouteMatch, useHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import TransitionGroup from 'react-addons-css-transition-group';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { slug } from '@micromag/core/utils';
import { useRoutePush, useRoutes, ScreenProvider, MediasProvider } from '@micromag/core/contexts';
import { Empty, Navbar, DropdownMenu } from '@micromag/core/components';

import { updateScreen, duplicateScreen, deleteScreen } from '../utils';
import useFormTransition from '../hooks/useFormTransition';
import SettingsButton from './buttons/Settings';
import Breadcrumb from './menus/Breadcrumb';
import ScreenForm from './forms/Screen';
import FieldForm from './forms/Field';
import DeleteScreenModal from './modals/DeleteScreen';

import styles from '../styles/form.module.scss';

const propTypes = {
    value: PropTypes.oneOfType([MicromagPropTypes.story, MicromagPropTypes.theme]),
    // isTheme: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    // isTheme: false,
    className: null,
    onChange: null,
};

const EditForm = ({ value, className, onChange }) => {
    // Match routes
    const history = useHistory();
    const routePush = useRoutePush();
    const routes = useRoutes();
    const {
        url,
        params: { screen: screenId = null, field: fieldParams = null, form: formParams = null },
    } = useRouteMatch({
        path: [routes['screen.field.form'], routes['screen.field'], routes.screen, '*'],
    });

    // Get screen
    const { components: screens = [] } = value || {};
    const screenIndex = screens.findIndex((it) => it.id === screenId);
    const screen = screenIndex !== -1 ? screens[screenIndex] : null;

    // Medias
    const medias = value !== null ? value.medias || {} : null;
    const onMediasChange = useCallback((newMedias) => {
        const newValue = {
            ...value,
            medias: newMedias,
        };
        if (onChange !== null) {
            onChange(newValue);
        }
    }, [value, onChange]);

    // Get transition value
    const { name: transitionName, timeout: transitionTimeout } = useFormTransition(
        url,
        screenIndex,
        styles,
    );

    const [screenSettingsOpened, setScreenSettingsOpened] = useState(false);
    const [deleteScreenModalOpened, setDeleteScreenModalOpened] = useState(false);

    // Callbacks
    const triggerOnChange = useCallback(
        (newValue) => {
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [onChange],
    );

    const onScreenFormChange = useCallback(
        (newScreenValue) => triggerOnChange(updateScreen(value, newScreenValue)),
        [value, triggerOnChange],
    );

    const onClickDuplicate = useCallback(() => {
        triggerOnChange(duplicateScreen(value, screenId));
        setScreenSettingsOpened(false);
    }, [value, screenId, triggerOnChange, setScreenSettingsOpened]);

    const onDeleteScreenOpenModal = useCallback(() => {
        setScreenSettingsOpened(false);
        setDeleteScreenModalOpened(true);
    }, [setScreenSettingsOpened, setDeleteScreenModalOpened]);

    const onSettingsClick = useCallback(() => {
        setScreenSettingsOpened((opened) => !opened);
    }, [setScreenSettingsOpened]);

    const onDropdownClickOutside = useCallback(() => {
        setScreenSettingsOpened(false);
    }, [setScreenSettingsOpened]);

    const onDeleteScreenConfirm = useCallback(() => {
        triggerOnChange(deleteScreen(value, screenId));
        setDeleteScreenModalOpened(false);
    }, [triggerOnChange, value, screenId, setScreenSettingsOpened]);

    const onDeleteScreenCancel = useCallback(() => {
        setDeleteScreenModalOpened(false);
    }, [setDeleteScreenModalOpened]);

    const [fieldForms, setFieldForms] = useState({});

    const gotoFieldForm = useCallback(
        (field, formName = null) => {
            routePush(formName !== null ? 'screen.field.form' : 'screen.field', {
                screen: screenId,
                field: field.split('.'),
                form: formName !== null ? slug(formName) : null,
            });
            setFieldForms({
                ...fieldForms,
                [`${field}${formName !== null ? `:${formName}` : ''}`]: url,
            });
        },
        [routePush, screenId, url, fieldForms, setFieldForms],
    );

    const closeFieldForm = useCallback(
        (field, formName = null) => {
            const fieldKey = `${field}${formName !== null ? `:${formName}` : ''}`;
            const pastUrl = fieldForms[fieldKey] || null;
            if (pastUrl !== null) {
                history.push(pastUrl);
            }
            setFieldForms(
                Object.keys(fieldForms).reduce(
                    (map, key) =>
                        key !== fieldKey
                            ? {
                                  ...map,
                                  [key]: fieldForms[key],
                              }
                            : map,
                    {},
                ),
            );
        },
        [history, screenId, fieldForms, setFieldForms],
    );

    return (
        <div className={classNames(['d-flex', 'flex-column', className])}>
            {screenId !== null ? (
                <Navbar theme="dark" compact noWrap withoutCollapse>
                    <Breadcrumb
                        story={value}
                        url={url}
                        screenId={screenId}
                        field={fieldParams}
                        form={formParams}
                    />
                    {fieldParams === null && formParams === null ? (
                        <>
                            <SettingsButton className="ml-auto" onClick={onSettingsClick} />
                            <DropdownMenu
                                items={[
                                    {
                                        id: 'duplicate',
                                        type: 'button',
                                        className: 'text-left text-info',
                                        label: (
                                            <FormattedMessage
                                                defaultMessage="Duplicate screen"
                                                description="Duplicate screen item"
                                            />
                                        ),
                                        onClick: onClickDuplicate,
                                    },
                                    {
                                        id: 'delete',
                                        type: 'button',
                                        className: 'text-left text-danger',
                                        label: (
                                            <FormattedMessage
                                                defaultMessage="Delete screen"
                                                description="Delete screen item"
                                            />
                                        ),
                                        onClick: onDeleteScreenOpenModal,
                                    },
                                ]}
                                visible={screenSettingsOpened}
                                align="right"
                                onClickOutside={onDropdownClickOutside}
                            />
                        </>
                    ) : null}
                </Navbar>
            ) : null}
            <div className={classNames(['flex-grow-1', 'd-flex', 'w-100', styles.content])}>
                {screen !== null ? (
                    <ScreenProvider data={screen}>
                        <MediasProvider medias={medias} onChange={onMediasChange}>
                            <TransitionGroup
                                transitionName={transitionName}
                                transitionEnterTimeout={transitionTimeout}
                                transitionLeaveTimeout={transitionTimeout}
                                className="w-100 flex-grow-1"
                            >
                                {fieldParams !== null ? (
                                    <div
                                        className={classNames(['bg-dark', 'w-100', styles.panel])}
                                        key={`field-${fieldParams}-${formParams}`}
                                    >
                                        <FieldForm
                                            name={fieldParams.replace(/\//g, '.')}
                                            value={screen}
                                            form={formParams}
                                            className={styles.form}
                                            gotoFieldForm={gotoFieldForm}
                                            closeFieldForm={closeFieldForm}
                                            onChange={onScreenFormChange}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className={classNames(['bg-dark', 'w-100', styles.panel])}
                                        key={`screen-${screen.id}`}
                                    >
                                        <ScreenForm
                                            value={screen}
                                            className={styles.form}
                                            onChange={onScreenFormChange}
                                            gotoFieldForm={gotoFieldForm}
                                            closeFieldForm={closeFieldForm}
                                        />
                                    </div>
                                )}
                            </TransitionGroup>
                        </MediasProvider>
                    </ScreenProvider>
                ) : (
                    <Empty className="w-100 m-2">
                        <FormattedMessage
                            defaultMessage="Select a screen..."
                            decription="Indication to select a screen to view the form"
                        />
                    </Empty>
                )}
            </div>
            {deleteScreenModalOpened ? (
                <DeleteScreenModal
                    onConfirm={onDeleteScreenConfirm}
                    onCancel={onDeleteScreenCancel}
                />
            ) : null}
        </div>
    );
};

EditForm.propTypes = propTypes;
EditForm.defaultProps = defaultProps;

export default EditForm;
