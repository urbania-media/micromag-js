/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading, jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';

import * as MicromagPropTypes from '../../PropTypes';
import Button from '../buttons/Button';
import Label from '../partials/Label';

import styles from '../../styles/fields/field-row.module.scss';

const propTypes = {
    label: MicromagPropTypes.label,
    children: PropTypes.node,
    isSection: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    withoutLabel: PropTypes.bool,
    withSettings: PropTypes.bool,
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
    gotoSettings,
    className,
}) => {
    const withLabel = !withoutLabel && label !== null;
    return (
        <div
            className={classNames([
                'form-group',
                styles.container,
                {
                    [styles.isHorizontal]: isHorizontal,
                    [styles.isSection]: isSection,
                    [className]: className !== null,
                },
            ])}
        >
            {isHorizontal && withLabel ? (
                <div className={classNames(['form-row', 'align-items-center'])}>
                    <label className={classNames(['col-auto', 'col-form-label', styles.label])}>
                        {withLabel ? <Label>{label}</Label> : null}
                    </label>
                    <div className="col">
                        <div className={styles.field}>{children}</div>
                    </div>
                </div>
            ) : (
                <>
                    {withLabel ? (
                        <>
                            {withSettings ? (
                                <div className={classNames(['form-row', 'align-items-center'])}>
                                    <label
                                        className={classNames([
                                            'col',
                                            'col-form-label',
                                            styles.label,
                                        ])}
                                    >
                                        {label}
                                    </label>
                                    <div className={classNames(['col-auto'])}>
                                        <Button withoutStyle onClick={gotoSettings}>
                                            <FontAwesomeIcon icon={faSlidersH} />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <label className={styles.label}>
                                    <Label>{label}</Label>
                                </label>
                            )}
                        </>
                    ) : null}
                    <div className={styles.field}>{children}</div>
                </>
            )}
        </div>
    );
};

FieldRow.propTypes = propTypes;
FieldRow.defaultProps = defaultProps;

export default FieldRow;
