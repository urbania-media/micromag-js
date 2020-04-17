/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useHistory, useRouteMatch } from 'react-router';
import TransitionGroup from 'react-addons-css-transition-group';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { slug } from '@micromag/core/utils';
import { useFormsComponents } from '@micromag/core/contexts';
import { Empty } from '@micromag/core/components';

import { updateScreen, duplicateScreen, deleteScreen } from '../utils';
import useFormTransition from '../hooks/useFormTransition';
import BackButton from './buttons/Back';
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
        params: { screen: screenId = null, field: fieldParams = null, form: formParams },
    } = useRouteMatch({
        path: [`/:screen/:field+/:form(${formRegEx})`, '/:screen', '*'],
    });

    // Get screen
    const { components: screens = [] } = value || {};
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

    const onClickBack = useCallback(() => history.goBack(), [history]);

    const gotoFieldForm = useCallback(
        (field, formName) => history.push(`/${screenId}/${field.replace(/\./g, '/')}/${slug(formName)}`),
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
                <BackButton className={styles.back} onClick={onClickBack} />
                {screenId !== null ? (
                    <Breadcrumb
                        value={value}
                        url={url}
                        screenId={screenId}
                        field={fieldParams}
                        className={styles.breadcrumb}
                    />
                ) : null}
                <SettingsButton
                    className={styles.settings}
                    onClickDuplicate={onClickDuplicate}
                    onClickDelete={onClickDelete}
                />
            </div>
            <div className={styles.content}>
                {screen !== null ? (
                    <TransitionGroup
                        transitionName={transitionName}
                        transitionEnterTimeout={transitionTimeout}
                        transitionLeaveTimeout={transitionTimeout}
                    >
                        {fieldParams !== null ? (
                            <FieldForm
                                key={`field-${fieldParams}-${formParams}`}
                                value={screen}
                                field={fieldParams.replace(/\//g, '.')}
                                form={formParams}
                                className={styles.form}
                                gotoFieldForm={gotoFieldForm}
                                onChange={onScreenFormChange}
                            />
                        ) : (
                            <ScreenForm
                                key={`screen-${screen.id}`}
                                value={screen}
                                className={styles.form}
                                onChange={onScreenFormChange}
                                gotoFieldForm={gotoFieldForm}
                                onClickDelete={onClickScreenDelete}
                            />
                        )}
                    </TransitionGroup>
                ) : (
                    <Empty className={styles.placeholder}>Ajoutez un écran</Empty>
                )}
            </div>
        </div>
    );
};

EditForm.propTypes = propTypes;
EditForm.defaultProps = defaultProps;

export default EditForm;
