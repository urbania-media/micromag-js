import { animated, easings, useTransition } from '@react-spring/web';
import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'wouter';

import type { Story } from '@micromag/core';
import { DropdownMenu, Empty, Navbar } from '@micromag/core/components';
import { ScreenProvider, useRoutePush, useScreensManager } from '@micromag/core/contexts';
import { getScreenFieldsWithStates, slug } from '@micromag/core/utils';

import useFormTransition from '../hooks/useFormTransition';
import useRouteParams from '../hooks/useRouteParams';
import { deleteScreen, duplicateScreen, updateScreen } from '../utils';

import SettingsButton from './buttons/Settings';
import FieldWithContexts from './forms/FieldWithContexts';
import ScreenForm from './forms/Screen';
import Breadcrumb from './menus/Breadcrumb';
import DeleteScreenModal from './modals/DeleteScreen';

import styles from '../styles/form.module.css';

interface EditFormProps {
    value?: Story | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function EditForm({ value = null, className = null, onChange = null }: EditFormProps) {
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

    // Get transition direction
    const { direction } = useFormTransition(url, screenIndex, styles);

    const [screenSettingsOpened, setScreenSettingsOpened] = useState(false);
    const [deleteScreenModalOpened, setDeleteScreenModalOpened] = useState(false);
    const [fieldForms, setFieldForms] = useState({});
    const [fieldContext, setFieldContext] = useState(null);

    // Compute panel transition
    const transitionItem = useMemo(
        () =>
            screen !== null
                ? {
                      key:
                          fieldParams !== null
                              ? `field-${fieldParams}-${formParams}`
                              : `screen-${screen.id}`,
                      isField: fieldParams !== null,
                      screen,
                      fieldParams,
                      formParams,
                  }
                : null,
        [screen, fieldParams, formParams],
    );

    const fromTransform = useMemo(() => {
        switch (direction) {
            case 'right':
                return 'translateX(100%)';
            case 'left':
                return 'translateX(-100%)';
            case 'top':
                return 'translateY(-100%)';
            case 'bottom':
                return 'translateY(100%)';
            default:
                return 'translateX(0%)';
        }
    }, [direction]);

    const leaveTransform = useMemo(() => {
        switch (direction) {
            case 'right':
                return 'translateX(-100%)';
            case 'left':
                return 'translateX(100%)';
            case 'top':
                return 'translateY(100%)';
            case 'bottom':
                return 'translateY(-100%)';
            default:
                return 'translateX(0%)';
        }
    }, [direction]);

    const isHorizontal = direction === 'left' || direction === 'right';
    const springConfig = useMemo(
        () =>
            direction !== null
                ? { duration: isHorizontal ? 200 : 500, easing: easings.easeOutSine }
                : { duration: 0 },
        [direction, isHorizontal],
    );

    const panelTransitions = useTransition(transitionItem, {
        keys: (item) => item?.key ?? 'none',
        from: { transform: fromTransform, opacity: direction !== null ? 0.5 : 1 },
        enter: { transform: 'translateX(0%)', opacity: 1 },
        leave: { transform: leaveTransform, opacity: direction !== null ? 0.5 : 0 },
        config: springConfig,
    });

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
    }, [value, triggerOnChange, screenId, routePush, screens]);

    const onDeleteModalClosed = useCallback(() => {
        setDeleteScreenModalOpened(false);
    }, [setDeleteScreenModalOpened]);

    const dropdownItems = [
        {
            id: 'duplicate',
            type: 'button',
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
                    className={classNames(['sticky-top', 'border-bottom', styles.navbar])}
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
                            <SettingsButton onClick={onSettingsClick} dots className="py-0" />
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
                    <div className="w-100 flex-grow-1" style={{ position: 'relative' }}>
                        {panelTransitions((springStyle, item) =>
                            item !== null ? (
                                <animated.div
                                    className={classNames(['w-100', styles.panel])}
                                    style={{
                                        ...springStyle,
                                        ...(item.key !== transitionItem?.key
                                            ? {
                                                  position: 'absolute' as const,
                                                  top: 0,
                                                  left: 0,
                                                  width: '100%',
                                                  zIndex: 0,
                                              }
                                            : {
                                                  position: 'relative' as const,
                                                  zIndex: 1,
                                              }),
                                    }}
                                >
                                    <ScreenProvider data={item.screen}>
                                        {item.isField ? (
                                            <FieldWithContexts
                                                name={item.fieldParams.replace(/\//g, '.')}
                                                value={item.screen}
                                                form={item.formParams}
                                                className="p-2"
                                                gotoFieldForm={gotoFieldForm}
                                                closeFieldForm={closeFieldForm}
                                                fieldContext={fieldContext}
                                                onChange={onScreenFormChange}
                                            />
                                        ) : (
                                            <ScreenForm
                                                value={item.screen}
                                                className="p-2"
                                                onChange={onScreenFormChange}
                                                gotoFieldForm={gotoFieldForm}
                                                closeFieldForm={closeFieldForm}
                                            />
                                        )}
                                    </ScreenProvider>
                                </animated.div>
                            ) : null,
                        )}
                    </div>
                ) : (
                    <Empty className="w-100 m-2">
                        <FormattedMessage
                            defaultMessage="Select a screen..."
                            description="Indication to select a screen to view the form"
                        />
                    </Empty>
                )}
            </div>
            {deleteScreenModalOpened ? (
                <DeleteScreenModal
                    onConfirm={onDeleteScreenConfirm}
                    onClosed={onDeleteModalClosed}
                />
            ) : null}
        </div>
    );
}

export default EditForm;
