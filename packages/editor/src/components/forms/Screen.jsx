/* eslint-disable react/no-array-index-key, no-alert */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from /* useCallback */
'react';
// import { useIntl, FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenDefinition } from '@micromag/core/contexts';
// import { Button, CollapsablePanel } from '@micromag/core/components';
import { Fields } from '@micromag/fields';
import styles from '../../styles/forms/screen.module.scss';

const propTypes = {
    value: MicromagPropTypes.component,
    className: PropTypes.string,
    gotoFieldForm: PropTypes.func.isRequired,
    closeFieldForm: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    // onClickDelete: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
    // onClickDelete: null,
};

const ScreenForm = ({
    value,
    className,
    gotoFieldForm,
    closeFieldForm,
    onChange,
    // onClickDelete,
}) => {
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
};

ScreenForm.propTypes = propTypes;
ScreenForm.defaultProps = defaultProps;

export default ScreenForm;
