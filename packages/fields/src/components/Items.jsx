/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isFunction from 'lodash/isFunction';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Empty, Label } from '@micromag/core/components';

import Field from './Field';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line
    getDefaultValue: PropTypes.func,
    noItemLabel: MicromagPropTypes.label,
    addItemLabel: MicromagPropTypes.label,
    itemFieldLabel: PropTypes.oneOfType([PropTypes.func, MicromagPropTypes.label]),
    itemComponent: PropTypes.elementType,
    itemsField: MicromagPropTypes.formField,
    className: PropTypes.string,
    isFieldForm: PropTypes.bool,
    gotoFieldForm: PropTypes.func,
    closeFieldForm: PropTypes.func,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    getDefaultValue: null,
    noItemLabel: (
        <FormattedMessage
            defaultMessage="No item..."
            description="Label when there is no item in items field"
        />
    ),
    addItemLabel: (
        <FormattedMessage defaultMessage="Add an item" description="Button label in items field" />
    ),
    // eslint-disable-next-line react/prop-types
    itemFieldLabel: ({ index }) => (
        <FormattedMessage
            defaultMessage="#{index}"
            description="Item label in items field"
            values={{ index }}
        />
    ),
    itemComponent: null,
    itemsField: null,
    className: null,
    isFieldForm: false,
    gotoFieldForm: null,
    closeFieldForm: null,
    onChange: null,
};

const ItemsField = ({
    name,
    value,
    getDefaultValue,
    noItemLabel,
    addItemLabel,
    itemFieldLabel,
    itemComponent,
    itemsField,
    className,
    onChange,
    isFieldForm,
    gotoFieldForm,
    closeFieldForm,
    ...props
}) => {
    const finalIsFieldForm =
        isFieldForm || (itemComponent !== null ? itemComponent.withForm || false : false);

    const onClickAdd = useCallback(() => {
        const newDefaultValue = getDefaultValue !== null ? getDefaultValue() : null;
        const newValue = [...(value || []), newDefaultValue];
        if (onChange !== null) {
            onChange(newValue);
        }
        if (finalIsFieldForm) {
            gotoFieldForm(`${name}.${newValue.length - 1}`);
        }
    }, [value, onChange, getDefaultValue, finalIsFieldForm, gotoFieldForm, name]);

    const onItemChange = useCallback(
        (index, newValue) => {
            if (onChange !== null) {
                const newValues = [...value];
                newValues[index] = newValue;
                onChange(newValues);
                // onChange([...value.slice(0, index), newValue, ...value.slice(index + 2)]);
            }
        },
        [value, onChange],
    );

    const gotoForms = useMemo(
        () =>
            value !== null
                ? value.map((val, index) => () => gotoFieldForm(`${name}.${index}`))
                : null,
        [value, gotoFieldForm],
    );
    const closeForms = useMemo(
        () =>
            value !== null
                ? value.map((val, index) => () => closeFieldForm(`${name}.${index}`))
                : null,
        [value, closeFieldForm],
    );

    return (
        <div className={className}>
            {value !== null ? (
                <div className="list-group">
                    {value.map((itemValue, index) => (
                        <Field
                            component={itemComponent}
                            {...itemsField}
                            {...props}
                            isListItem
                            key={`item-${index}`}
                            label={
                                isFunction(itemFieldLabel) ? (
                                    itemFieldLabel({ item: itemValue, index: index + 1 })
                                ) : (
                                    <Label values={{ index: index + 1 }}>{itemFieldLabel}</Label>
                                )
                            }
                            name={`${name}.${index}`}
                            value={itemValue}
                            onChange={(newValue) => onItemChange(index, newValue)}
                            closeForm={closeForms[index]}
                            gotoForm={gotoForms[index]}
                            gotoFieldForm={gotoFieldForm}
                            closeFieldForm={closeFieldForm}
                        />
                    ))}
                </div>
            ) : (
                <Empty className="p-4">
                    <Label>{noItemLabel}</Label>
                </Empty>
            )}
            <div className="mt-2">
                <Button
                    theme="primary"
                    size="sm"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={onClickAdd}
                >
                    <Label>{addItemLabel}</Label>
                </Button>
            </div>
        </div>
    );
};

ItemsField.propTypes = propTypes;
ItemsField.defaultProps = defaultProps;

export default ItemsField;
