/* eslint-disable react/no-array-index-key, no-alert */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages, injectIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, CollapsablePanel } from '@micromag/core/components';
import { Fields } from '@micromag/fields';
import { useScreenFields } from '@micromag/core/contexts';

import styles from '../../styles/forms/screen.module.scss';

const messages = defineMessages({
    dangerZone: {
        id: 'forms.screen.danger_zone',
        defaultMessage: 'Danger zone',
    },
    confirmDelete: {
        id: 'forms.screen.confirm_delete',
        defaultMessage: 'Are you sure you want to delete this screen?',
    },
    deleteScreen: {
        id: 'forms.screen.delete_screen',
        defaultMessage: 'Delete screen',
    },
});

const propTypes = {
    intl: MicromagPropTypes.intl.isRequired,
    value: MicromagPropTypes.component,
    className: PropTypes.string,
    gotoFieldForm: PropTypes.func.isRequired,
    closeFieldForm: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onClickDelete: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
    onClickDelete: null,
};

const ScreenForm = ({
    intl,
    value,
    className,
    gotoFieldForm,
    closeFieldForm,
    onChange,
    onClickDelete,
}) => {
    const { type } = value;
    const fields = useScreenFields(type);
    const finalOnClickDelete = useCallback(() => {
        if (onClickDelete !== null && window.confirm(intl.formatMessage(messages.confirmDelete))) {
            onClickDelete(value);
        }
    }, [intl, messages, onClickDelete, value]);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <div className={styles.inner}>
                <Fields
                    fields={fields}
                    value={value}
                    onChange={onChange}
                    gotoFieldForm={gotoFieldForm}
                    closeFieldForm={closeFieldForm}
                />
                <CollapsablePanel
                    title={messages.dangerZone}
                    className={classNames(['mt-4', styles.dangerZone])}
                    contentClassName={styles.content}
                    openedClassName={styles.opened}
                >
                    <Button
                        className={styles.deleteButton}
                        theme="danger"
                        onClick={finalOnClickDelete}
                    >
                        {messages.deleteScreen}
                    </Button>
                </CollapsablePanel>
            </div>
        </div>
    );
};

ScreenForm.propTypes = propTypes;
ScreenForm.defaultProps = defaultProps;

export default injectIntl(ScreenForm);
