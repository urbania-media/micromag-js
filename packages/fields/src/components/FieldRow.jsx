/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Label } from '@micromag/core/components';

import FieldErrors from './FieldErrors';

import styles from '../styles/field-row.module.scss';

const propTypes = {
    label: MicromagPropTypes.label,
    errors: MicromagPropTypes.errors,
    children: PropTypes.node,
    isSection: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    withoutLabel: PropTypes.bool,
    withSettings: PropTypes.bool,
    withForm: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    withPanel: PropTypes.bool,
    gotoSettings: PropTypes.func,
    gotoForm: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    label: null,
    errors: null,
    children: null,
    isSection: false,
    isHorizontal: false,
    withoutLabel: false,
    withSettings: false,
    withForm: false,
    withPanel: false,
    gotoSettings: null,
    gotoForm: null,
    className: null,
};

const FieldRow = ({
    label,
    errors,
    children,
    isSection,
    isHorizontal,
    withoutLabel,
    withSettings,
    withForm,
    withPanel,
    gotoForm,
    gotoSettings,
    className,
}) => {
    const [panelOpened, setPanelOpened] = useState(false);
    const withLabel = !withoutLabel && label !== null;

    const labelElement = <Label>{label}</Label>;

    const onClickRow = useCallback(() => {
        if (withPanel) {
            setPanelOpened(true);
        } else if (typeof withForm === 'string') {
            gotoForm(withForm);
        } else if (withForm) {
            gotoForm();
        }
    }, [withPanel, withForm, gotoForm, setPanelOpened]);
    const closePanel = useCallback(() => setPanelOpened(false), [setPanelOpened]);
    const openPanel = useCallback(() => setPanelOpened(true), [setPanelOpened]);

    if (isHorizontal) {
        const isClickable = withForm || withPanel;
        const rowInner = (
            <>
                <label className={classNames(['col-auto', 'col-form-label', styles.label])}>
                    {labelElement}
                </label>
                <span className="col">{children}</span>
                {isClickable ? (
                    <span className="col-auto">
                        <FontAwesomeIcon icon={faAngleRight} className={styles.icon} />
                    </span>
                ) : null}
                {errors !== null && errors.length > 0 ? (
                    <FieldErrors errors={errors} className={styles.errors} />
                ) : null}
            </>
        );

        return isClickable ? (
            <>
                <Button
                    withoutStyle
                    className={classNames([
                        'form-group',
                        'form-row',
                        'align-items-center',
                        styles.container,
                        styles.isHorizontal,
                        {
                            [styles.isSection]: isSection,
                            [className]: className !== null,
                        },
                    ])}
                    onClick={onClickRow}
                >
                    {rowInner}
                </Button>
                {panelOpened
                    ? React.cloneElement(children, {
                          panelOpened,
                          closePanel,
                          openPanel,
                      })
                    : null}
            </>
        ) : (
            <div
                className={classNames([
                    'form-group',
                    'form-row',
                    'align-items-center',
                    styles.container,
                    styles.isHorizontal,
                    {
                        [styles.isSection]: isSection,
                        [className]: className !== null,
                    },
                ])}
            >
                {rowInner}
            </div>
        );
    }
    return (
        <div
            className={classNames([
                'form-group',
                styles.container,
                {
                    [styles.isSection]: isSection,
                    [className]: className !== null,
                },
            ])}
        >
            {withLabel ? (
                <>
                    {withSettings ? (
                        <div className={classNames(['form-row', 'align-items-center'])}>
                            <label className={classNames(['col', 'col-form-label', styles.label])}>
                                {labelElement}
                            </label>
                            <div className={classNames(['col-auto'])}>
                                <Button withoutStyle onClick={gotoSettings}>
                                    <FontAwesomeIcon icon={faSlidersH} />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <label className={styles.label}>{labelElement}</label>
                    )}
                </>
            ) : null}
            <div className={styles.field}>{children}</div>
            {errors !== null && errors.length > 0 ? (
                <FieldErrors errors={errors} className={styles.errors} />
            ) : null}
        </div>
    );
};

FieldRow.propTypes = propTypes;
FieldRow.defaultProps = defaultProps;

export default FieldRow;
