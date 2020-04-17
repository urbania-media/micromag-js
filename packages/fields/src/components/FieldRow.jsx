/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Label } from '@micromag/core/components';

import styles from '../styles/field-row.module.scss';

const propTypes = {
    label: MicromagPropTypes.label,
    children: PropTypes.node,
    isSection: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    withoutLabel: PropTypes.bool,
    withSettings: PropTypes.bool,
    withPanel: PropTypes.bool,
    gotoSettings: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    label: null,
    children: null,
    isSection: false,
    isHorizontal: false,
    withoutLabel: false,
    withSettings: false,
    withPanel: null,
    gotoSettings: null,
    className: null,
};

const FieldRow = ({
    label,
    children,
    isSection,
    isHorizontal,
    withoutLabel,
    withSettings,
    withPanel,
    gotoSettings,
    className,
}) => {
    const [panelOpened, setPanelOpened] = useState(false);
    const withLabel = !withoutLabel && label !== null;

    const labelElement = <Label>{label}</Label>;

    const openPanel = useCallback(() => setPanelOpened(true), []);
    const closePanel = useCallback(() => setPanelOpened(false), []);

    if (isHorizontal) {
        const rowInner = (
            <>
                {withLabel ? (
                    <label className={classNames(['col-auto', 'col-form-label', styles.label])}>
                        {labelElement}
                    </label>
                ) : null}
                <span className="col">
                    {withPanel
                        ? React.cloneElement(children, {
                              closePanel,
                              openPanel,
                              panelOpened,
                          })
                        : children}
                </span>
                {withPanel ? (
                    <span className="col-auto">
                        <FontAwesomeIcon icon={faAngleRight} className={styles.icon} />
                    </span>
                ) : null}
            </>
        );

        return withPanel ? (
            <Button
                withoutStyle
                className={classNames([
                    'form-group',
                    'form-row',
                    'align-items-center',
                    styles.container,
                    styles.isHorizontal,
                    styles.withPanel,
                    {
                        [styles.isSection]: isSection,
                        [className]: className !== null,
                    },
                ])}
                onClick={openPanel}
            >
                {rowInner}
            </Button>
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
        </div>
    );
};

FieldRow.propTypes = propTypes;
FieldRow.defaultProps = defaultProps;

export default FieldRow;
