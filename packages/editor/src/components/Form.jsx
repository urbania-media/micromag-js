/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { CSSTransitionGroup } from 'react-transition-group';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { slug } from '@micromag/core/utils';
import {
    useRoutePush,
    ScreenProvider,
} from '@micromag/core/contexts';
import { Empty, Navbar, DropdownMenu } from '@micromag/core/components';

import {
    updateScreen,
    duplicateScreen,
    deleteScreen,
} from '../utils';
import useRouteParams from '../hooks/useRouteParams';
import useFormTransition from '../hooks/useFormTransition';
import SettingsButton from './buttons/Settings';
import Breadcrumb from './menus/Breadcrumb';
import ScreenForm from './forms/Screen';
import FieldWithContexts from './forms/FieldWithContexts';
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
    const history = useHistory();
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


    // Get transition value
    const { name: transitionName, timeout: transitionTimeout } = useFormTransition(
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
            routePush(hasField ? fieldRoute : 'screen', {
                screen: screenId,
                field: field !== null ? field.split('.') : null,
                form: formName !== null ? slug(formName) : null,
            });
            setFieldForms({
                ...fieldForms,
                [`${field}${formName !== null ? `:${formName}` : ''}`]: url,
            });
            setFieldContext(context);
        },
        [routePush, screenId, url, fieldForms, setFieldForms, fieldContext, setFieldContext],
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
        triggerOnChange(duplicateScreen(value, screenId));
        setScreenSettingsOpened(false);
    }, [value, screenId, triggerOnChange, setScreenSettingsOpened]);

    const onClickDelete = useCallback(() => {
        setDeleteScreenModalOpened(true);
        setScreenSettingsOpened(false);
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
    }, [value, triggerOnChange, screenId, setScreenSettingsOpened]);

    const onDeleteScreenCancel = useCallback(() => {
        setDeleteScreenModalOpened(false);
    }, [setDeleteScreenModalOpened]);

    const dropdownItems = [
        !isTheme
            ? {
                  id: 'duplicate',
                  type: 'button',
                  className: 'text-start text-info',
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
            className: 'text-start text-danger',
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
                        <>
                            <SettingsButton onClick={onSettingsClick} />
                            <DropdownMenu
                                items={dropdownItems}
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
                    <CSSTransitionGroup
                        transitionName={transitionName}
                        transitionEnterTimeout={transitionTimeout}
                        transitionLeaveTimeout={transitionTimeout}
                        className="w-100 flex-grow-1"
                    >
                        {fieldParams !== null ? (
                            <div
                                className={classNames(['w-100', styles.panel])}
                                key={`field-${fieldParams}-${formParams}`}
                            >
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
                        ) : (
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
                        )}
                    </CSSTransitionGroup>
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
