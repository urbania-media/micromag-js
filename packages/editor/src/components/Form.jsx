/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRouteMatch } from 'react-router';
import TransitionGroup from 'react-addons-css-transition-group';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { slug } from '@micromag/core/utils';
import { useRoutePush, useRoutes } from '@micromag/core/contexts';
import { Empty, Navbar } from '@micromag/core/components';

import { updateScreen, duplicateScreen, deleteScreen } from '../utils';
import useFormTransition from '../hooks/useFormTransition';
import SettingsButton from './buttons/Settings';
import Breadcrumb from './menus/Breadcrumb';
import ScreenForm from './forms/Screen';
import FieldForm from './forms/Field';

import styles from '../styles/form.module.scss';
import messages from '../messages';

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
    const push = useRoutePush();
    const routes = useRoutes();
    const {
        url,
        params: { screen: screenId = null, field: fieldParams = null, form: formParams = null },
    } = useRouteMatch({
        path: [routes['screen.field.form'], routes['screen.field'], routes.screen, '*'],
    });
    // console.log(url, screenId, fieldParams, formParams);

    // Get screen
    const { components: screens = [] } = story || {};
    const screenIndex = screens.findIndex(it => it.id === screenId);
    const screen = screenIndex !== -1 ? screens[screenIndex] : null;

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
        <div className={classNames(['d-flex', 'flex-column', className])}>
            {screenId !== null ? (
                <Navbar theme="dark" compact noWrap>
                    <Breadcrumb
                        story={story}
                        url={url}
                        screenId={screenId}
                        field={fieldParams}
                        form={formParams}
                    />
                    <SettingsButton
                        className="ml-auto"
                        onClickDuplicate={onClickDuplicate}
                        onClickDelete={onClickDelete}
                    />
                </Navbar>
            ) : null}
            <div className={classNames(['flex-grow-1', 'd-flex', 'w-100', styles.content])}>
                {screen === null ? (
                    <Empty className={styles.empty}>{messages.selectScreen}</Empty>
                ) : null}

                {screen !== null ? (
                    <>
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
                                        value={screen}
                                        field={fieldParams.replace(/\//g, '.')}
                                        form={formParams}
                                        className={styles.form}
                                        gotoFieldForm={gotoFieldForm}
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
                                        onClickDelete={onClickScreenDelete}
                                    />
                                </div>
                            )}
                        </TransitionGroup>
                    </>
                ) : null}
            </div>
        </div>
    );
};

EditForm.propTypes = propTypes;
EditForm.defaultProps = defaultProps;

export default EditForm;
