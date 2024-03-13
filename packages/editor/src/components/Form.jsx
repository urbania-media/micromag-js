/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from 'wouter';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Empty, Navbar, DropdownMenu } from '@micromag/core/components';
import { useRoutePush, ScreenProvider, useScreensManager } from '@micromag/core/contexts';
import { slug } from '@micromag/core/utils';

import useFormTransition from '../hooks/useFormTransition';
import useRouteParams from '../hooks/useRouteParams';
import { updateScreen, duplicateScreen, deleteScreen } from '../utils';
import getScreenFieldsWithStates from '../utils/getScreenFieldsWithStates';

import SettingsButton from './buttons/Settings';
import FieldWithContexts from './forms/FieldWithContexts';
import ScreenForm from './forms/Screen';
import Breadcrumb from './menus/Breadcrumb';
import DeleteScreenModal from './modals/DeleteScreen';

import styles from '../styles/form.module.scss';

const propTypes = {
    value: PropTypes.oneOfType([MicromagPropTypes.story, MicromagPropTypes.theme]),
    isTheme: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    isTheme: false,
    className: null,
    onChange: null,
};

const EditForm = ({ value, isTheme, className, onChange }) => {
    // Match routes
    const [, setLocation] = useLocation();
    const routePush = useRoutePush();
    const {
        url,
        screen: screenId = null,
        field: fieldParams = null,
        form: formParams = null,
    } = useRouteParams();

    // Get screen
    const { components: screens = [] } = value || {};
    const screenIndex = screens.findIndex((it) => it.id === screenId);
    const screen = screenIndex !== -1 ? screens[screenIndex] : null;
    const screensManager = useScreensManager();
    const screenFields = useMemo(() => {
        const { type } = screen || {};
        const definition = type !== null ? screensManager.getDefinition(type) : null;
        return definition != null ? getScreenFieldsWithStates(definition) : [];
    }, [screensManager, screen]);

    // Get transition value
    const { classNames: transitionClassNames, timeout: transitionTimeout } = useFormTransition(
        url,
        screenIndex,
        styles,
    );

    const [screenSettingsOpened, setScreenSettingsOpened] = useState(false);
    const [deleteScreenModalOpened, setDeleteScreenModalOpened] = useState(false);
    const [fieldForms, setFieldForms] = useState({});
    const [fieldContext, setFieldContext] = useState(null);

    // Callbacks
    const gotoFieldForm = useCallback(
        (field = null, formName = null, context = null) => {
            const hasField = field !== null;
            const fieldRoute = formName !== null ? 'screen.field.form' : 'screen.field';
            const [rootFieldName = null] = field !== null ? field.split('.') : [];
            const [currentStateId = null] = fieldParams !== null ? fieldParams.split('/') : [];
            const { stateId = null } =
                (rootFieldName !== null
                    ? screenFields.find(
                          ({ name, stateId: fieldStateId }) =>
                              name === rootFieldName && currentStateId === fieldStateId,
                      ) || null
                    : null) || {};

            routePush(hasField ? fieldRoute : 'screen', {
                screen: screenId,
                field:
                    field !== null
                        ? [stateId, ...field.split('.')].filter((it) => it !== null)
                        : null,
                form: formName !== null ? slug(formName) : null,
            });

            const nextFieldForms = {
                ...fieldForms,
                [`${field}${formName !== null ? `:${formName}` : ''}`]: url,
            };
            setFieldForms(nextFieldForms);
            setFieldContext(context);
        },
        [
            routePush,
            screenId,
            screenFields,
            fieldParams,
            url,
            fieldForms,
            setFieldForms,
            fieldContext,
            setFieldContext,
        ],
    );

    const closeFieldForm = useCallback(
        (field, formName = null) => {
            const fieldKey = `${field}${formName !== null ? `:${formName}` : ''}`;
            const pastUrl = fieldForms[fieldKey] || null;
            if (pastUrl !== null) {
                setLocation(pastUrl);
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
        [setLocation, screenId, fieldForms, setFieldForms],
    );

    const triggerOnChange = useCallback(
        (newValue) => {
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [onChange],
    );

    const onScreenFormChange = useCallback(
        (newScreenValue) => {
            triggerOnChange(updateScreen(value, newScreenValue));
        },
        [value, triggerOnChange],
    );

    const onClickDuplicate = useCallback(() => {
        triggerOnChange(duplicateScreen(value, screenId, screenIndex));
        setScreenSettingsOpened(false);
    }, [value, screenId, screenIndex, triggerOnChange, setScreenSettingsOpened]);

    const onClickDelete = useCallback(() => {
        setDeleteScreenModalOpened(true);
        setScreenSettingsOpened(false);
    }, [setScreenSettingsOpened, setDeleteScreenModalOpened]);

    const onSettingsClick = useCallback(() => {
        setScreenSettingsOpened(!screenSettingsOpened);
    }, [screenSettingsOpened, setScreenSettingsOpened]);

    const onDropdownClickOutside = useCallback(() => {
        setScreenSettingsOpened(false);
    }, [setScreenSettingsOpened]);

    const onDeleteScreenConfirm = useCallback(() => {
        const current = screens.findIndex(({ id: scrId = null }) => scrId === screenId) || 0;
        const previous =
            screens.find(
                ({ id: scrId = null }, i) =>
                    scrId !== screenId && (i === current - 1 || current === 0),
            ) || null;
        if (previous !== null) {
            const { id: firstScreenId = null } = previous || {};
            routePush('screen', { screen: firstScreenId });
        }
        triggerOnChange(deleteScreen(value, screenId));
        setDeleteScreenModalOpened(false);
    }, [value, triggerOnChange, screenId, setScreenSettingsOpened, routePush, screens]);

    const onDeleteScreenCancel = useCallback(() => {
        setDeleteScreenModalOpened(false);
    }, [setDeleteScreenModalOpened]);

    const dropdownItems = [
        !isTheme
            ? {
                  id: 'duplicate',
                  type: 'button',
                  label: (
                      <FormattedMessage
                          defaultMessage="Duplicate screen"
                          description="Duplicate screen item"
                      />
                  ),
                  onClick: onClickDuplicate,
              }
            : null,
        {
            id: 'delete',
            type: 'button',
            label: (
                <FormattedMessage defaultMessage="Delete screen" description="Delete screen item" />
            ),
            onClick: onClickDelete,
        },
    ].filter((it) => it !== null);

    return (
        <div className={classNames(['d-flex', 'flex-column', className])}>
            {screenId !== null ? (
                <Navbar
                    compact
                    noWrap
                    withoutCollapse
                    className={classNames([
                        'sticky-top',
                        'border-bottom',
                        'border-dark',
                        styles.navbar,
                    ])}
                >
                    <Breadcrumb
                        story={value}
                        url={url}
                        screenId={screenId}
                        field={fieldParams}
                        form={formParams}
                        className="me-auto"
                    />
                    {fieldParams === null ? (
                        <div className="dropdown">
                            <SettingsButton
                                onClick={onSettingsClick}
                                dots
                                className="py-0"
                                theme="default"
                            />
                            <DropdownMenu
                                align="end"
                                items={dropdownItems}
                                visible={screenSettingsOpened}
                                onClickOutside={onDropdownClickOutside}
                            />
                        </div>
                    ) : null}
                </Navbar>
            ) : null}
            <div className={classNames(['flex-grow-1', 'd-flex', 'w-100', styles.content])}>
                {screen !== null ? (
                    <TransitionGroup
                        className="w-100 flex-grow-1"
                        childFactory={(child) =>
                            React.cloneElement(child, {
                                classNames: transitionClassNames,
                            })
                        }
                    >
                        {fieldParams !== null ? (
                            <CSSTransition
                                timeout={transitionTimeout}
                                key={`field-${fieldParams}-${formParams}`}
                            >
                                <div className={classNames(['w-100', styles.panel])}>
                                    <ScreenProvider data={screen}>
                                        <FieldWithContexts
                                            name={fieldParams.replace(/\//g, '.')}
                                            value={screen}
                                            form={formParams}
                                            className={styles.form}
                                            gotoFieldForm={gotoFieldForm}
                                            closeFieldForm={closeFieldForm}
                                            fieldContext={fieldContext}
                                            onChange={onScreenFormChange}
                                        />
                                    </ScreenProvider>
                                </div>
                            </CSSTransition>
                        ) : (
                            <CSSTransition
                                classNames={transitionClassNames}
                                timeout={transitionTimeout}
                                key={`screen-${screen.id}`}
                            >
                                <div
                                    className={classNames(['w-100', styles.panel])}
                                    key={`screen-${screen.id}`}
                                >
                                    <ScreenProvider data={screen}>
                                        <ScreenForm
                                            value={screen}
                                            className={styles.form}
                                            onChange={onScreenFormChange}
                                            gotoFieldForm={gotoFieldForm}
                                            closeFieldForm={closeFieldForm}
                                        />
                                    </ScreenProvider>
                                </div>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
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
