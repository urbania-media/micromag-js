/* eslint-disable react/no-array-index-key, no-alert */
import classNames from 'classnames';
import React from /* useCallback */
'react';

// import { useIntl, FormattedMessage } from 'react-intl';
import type { Component } from '@micromag/core';
import { useScreenDefinition } from '@micromag/core/contexts';
// import { Button, CollapsablePanel } from '@micromag/core/components';
import { Fields } from '@micromag/fields';

import styles from '../../styles/forms/screen.module.css';

interface ScreenFormProps {
    value?: Component;
    className?: string;
    gotoFieldForm: (...args: unknown[]) => void;
    closeFieldForm: (...args: unknown[]) => void;
    onChange?: (...args: unknown[]) => void;
}

function ScreenForm({
    value = null,
    className = null,
    gotoFieldForm,
    closeFieldForm,
    onChange = null,
    // onClickDelete,
}) {
    const { fields = [] } = useScreenDefinition();
    // const intl = useIntl();
    // const finalOnClickDelete = useCallback(() => {
    //     if (
    //         onClickDelete !== null &&
    //         window.confirm(
    //             intl.formatMessage({
    //                 defaultMessage: 'Are you sure you want to delete this screen?',
    //                 description: 'Confirm message when deleting a screen',
    //             }),
    //         )
    //     ) {
    //         onClickDelete(value);
    //     }
    // }, [intl, onClickDelete, value]);
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
                {fields !== null ? (
                    <Fields
                        fields={fields}
                        value={value}
                        onChange={onChange}
                        gotoFieldForm={gotoFieldForm}
                        closeFieldForm={closeFieldForm}
                    />
                ) : null}
                {/* <CollapsablePanel
                    title={
                        <FormattedMessage
                            defaultMessage="Danger zone"
                            description="Title of the danger zone panel"
                        />
                    }
                    className={classNames(['mt-4', styles.dangerZone])}
                    contentClassName={styles.content}
                    openedClassName={styles.opened}
                >
                    <Button
                        className={styles.deleteButton}
                        theme="danger"
                        onClick={finalOnClickDelete}
                    >
                        <FormattedMessage
                            defaultMessage="Delete screen"
                            description="Delete screen button"
                        />
                    </Button>
                </CollapsablePanel> */}
            </div>
        </div>
    );
}

export default ScreenForm;
