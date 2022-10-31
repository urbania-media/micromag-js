/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label } from '@micromag/core/components';
import { isMessage } from '@micromag/core/utils';

import Field from './Field';
import Fields from './Fields';

import styles from '../styles/field-with-form.module.scss';

const propTypes = {
    value: PropTypes.any, // eslint-disable-line
    isForm: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.node, MicromagPropTypes.message]),
    thumbnail: PropTypes.node,
    labelPath: PropTypes.string,
    thumbnailPath: PropTypes.string,
    noValueLabel: MicromagPropTypes.label,
    isHorizontal: PropTypes.bool,
    children: PropTypes.node,
    field: MicromagPropTypes.formField,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    label: null,
    thumbnail: null,
    labelPath: 'label',
    thumbnailPath: 'thumbnail',
    noValueLabel: null,
    isHorizontal: false,
    children: null,
    field: null,
    className: null,
    onChange: null,
    closeForm: null,
};

const FieldWithForm = ({
    value,
    isForm,
    noValueLabel,
    label,
    labelPath,
    thumbnail,
    thumbnailPath,
    isHorizontal,
    className,
    onChange,
    closeForm,
    children,
    field,
    ...props
}) => {
    if (isForm) {
        if (children !== null) {
            return children;
        }
        return field !== null ? (
            <Field
                className="p-2"
                {...field}
                {...props}
                value={value}
                onChange={onChange}
                buttonTheme="primary"
            />
        ) : (
            <Fields className="p-2" {...props} value={value} onChange={onChange} />
        );
    }

    const labelValue = label !== null ? label : get(value, labelPath, null);

    let labelElement = null;
    let labelString = null;

    if (labelValue !== null && isMessage(labelValue)) {
        labelElement = <FormattedMessage {...labelValue} />;
    } else {
        labelString =
            labelValue !== null && isObject(labelValue)
                ? labelValue.name || labelValue.id || ''
                : labelValue;

        // Strip html
        labelElement =
            labelString !== null && isString(labelString)
                ? labelString.replace(/(<([^>]+)>)/gi, '')
                : null;

        labelElement = React.isValidElement(labelValue) ? labelValue : labelElement;
    }

    let thumbnailElement = null;
    const thumbnailSrc = get(value, thumbnailPath, null);
    if (thumbnail !== null) {
        thumbnailElement = thumbnail;
    } else if (thumbnailSrc !== null) {
        thumbnailElement = <img src={thumbnailSrc} className={styles.thumbnail} alt={label} />;
    }

    return (
        <span
            className={classNames([
                'row',
                'align-items-center',
                'flex-nowrap',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {thumbnailElement !== null || labelElement !== null ? (
                <>
                    {!isHorizontal && thumbnailElement !== null ? (
                        <span className="col-auto">{thumbnailElement}</span>
                    ) : null}
                    <span
                        className={classNames([
                            styles.label,
                            'col',
                            'text-monospace',
                            'text-start',
                            'text-truncate',
                            {
                                'text-start': !isHorizontal,
                                'text-end': isHorizontal,
                            },
                        ])}
                    >
                        {labelElement}
                    </span>
                    {isHorizontal && thumbnailElement !== null ? (
                        <span className="col-auto">{thumbnailElement}</span>
                    ) : null}
                </>
            ) : (
                <span
                    className={classNames([
                        'col',
                        'text-muted',
                        {
                            'text-start': !isHorizontal,
                            'text-end': isHorizontal,
                            'text-truncate': isHorizontal,
                        },
                    ])}
                >
                    <Label>
                        {noValueLabel || (
                            <FormattedMessage
                                defaultMessage="Edit content..."
                                description="Label when no value is provided to Field with form"
                            />
                        )}
                    </Label>
                </span>
            )}
        </span>
    );
};

FieldWithForm.propTypes = propTypes;
FieldWithForm.defaultProps = defaultProps;
FieldWithForm.withForm = true;

export default FieldWithForm;
