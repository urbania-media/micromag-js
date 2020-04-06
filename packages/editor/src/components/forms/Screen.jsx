/* eslint-disable react/no-array-index-key, no-alert */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, CollapsablePanel } from '@micromag/core/components';
import { Fields } from '@micromag/fields';

import getFieldsFromScreenType from '../../utils/getFieldsFromScreenType';

import styles from '../../styles/forms/screen.module.scss';

const propTypes = {
    value: MicromagPropTypes.component,
    className: PropTypes.string,
    gotoFieldForm: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    onClickDelete: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
    onClickDelete: null,
};

const ScreenForm = ({ value, className, gotoFieldForm, onChange, onClickDelete }) => {
    const { type, layout } = value;
    const fields = useMemo(
        () =>
            getFieldsFromScreenType(type, {
                layout,
            }),
        [type, layout],
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
            <div className={styles.inner}>
                <Fields
                    fields={fields}
                    value={value}
                    onChange={onChange}
                    gotoFieldForm={gotoFieldForm}
                />
                <CollapsablePanel
                    title="Zone périlleuse"
                    className={styles.dangerZone}
                    contentClassName={styles.content}
                    openedClassName={styles.opened}
                >
                    <Button
                        className={styles.deleteButton}
                        theme="outline-danger"
                        onClick={() => {
                            if (
                                onClickDelete !== null &&
                                window.confirm('Êtes-vous certain de vouloir supprimer cet écran?')
                            ) {
                                onClickDelete(value);
                            }
                        }}
                    >
                        Effacer l’écran
                    </Button>
                </CollapsablePanel>
            </div>
        </div>
    );
};

ScreenForm.propTypes = propTypes;
ScreenForm.defaultProps = defaultProps;

export default ScreenForm;
