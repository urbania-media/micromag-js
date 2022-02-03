/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import { faBars, faCheck, faList, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button, Empty, Label } from '@micromag/core/components';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactSortable } from 'react-sortablejs';
import { v4 as uuid } from 'uuid';
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
    withoutSort: PropTypes.bool,
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
    withoutSort: false,
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
    withoutSort,
    onChange,
    isFieldForm,
    gotoFieldForm,
    closeFieldForm,
    ...props
}) => {
    // const finalIsFieldForm =
    //     isFieldForm || (itemComponent !== null ? itemComponent.withForm || false : false);

    const [editing, setEditing] = useState(false);
    const idMap = useRef((value || []).map(() => uuid()));

    const onClickAdd = useCallback(() => {
        const newDefaultValue = getDefaultValue !== null ? getDefaultValue() : null;
        const newValue = [...(value || []), newDefaultValue];

        idMap.current = [...idMap.current, uuid()];

        if (onChange !== null) {
            onChange(newValue);
        }
        if (gotoFieldForm !== null) {
            gotoFieldForm(`${name}.${newValue.length - 1}`);
        }
    }, [value, onChange, getDefaultValue, gotoFieldForm, name /* gotoFieldForm */]);

    const onClickEdit = useCallback(() => {
        setEditing((old) => !old);
    }, [setEditing]);

    const onClickDelete = useCallback(
        (index) => {
            if (onChange !== null) {
                const newValues = [...value];
                newValues.splice(index, 1);
                idMap.current = idMap.current.filter((_, idIndex) => idIndex !== index);
                onChange(newValues);

                if (newValues.length === 0) {
                    setEditing(false);
                }
            }
        },
        [value, onChange, setEditing],
    );

    const onItemChange = useCallback(
        (index, newValue) => {
            if (onChange !== null) {
                const newValues = [...value];
                newValues[index] = newValue;
                onChange(newValues);
            }
        },
        [value, onChange],
    );

    const onOrderChange = useCallback(
        (newItems) => {
            const orderChanged = newItems.reduce(
                (changed, { index: newIndex }, prevIndex) => changed || prevIndex !== newIndex,
                false,
            );
            if (orderChanged && onChange !== null) {
                const newIdMap = newItems.map(({ index }) => idMap.current[index]);
                idMap.current = newIdMap;
                onChange(newItems.map(({ it }) => it));
            }
        },
        [onChange],
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

    const items = value || [];
    const { length: itemsLength = 0 } = items;
    const hasItems = itemsLength > 0;
    const sortableItems = items.map((it, index) => ({ id: idMap.current[index], it, index }));
    const finalWithoutSort = withoutSort || !editing;

    return (
        <div className={className}>
            {hasItems ? (
                <div>
                    <ReactSortable
                        list={sortableItems}
                        setList={onOrderChange}
                        disabled={finalWithoutSort}
                        key={finalWithoutSort}
                    >
                        {items.map((itemValue, index) => (
                            <div className="p-0 d-flex">
                                {!finalWithoutSort ? (
                                    <div
                                        className={classNames([
                                            'btn',
                                            'pl-2',
                                            'pr-1',
                                            'border',
                                            'border-dark',
                                            'border-right-0',
                                            'rounded-0',
                                            'text-dark',
                                            {
                                                'border-top-0': index > 0,
                                            },
                                        ])}
                                    >
                                        <FontAwesomeIcon icon={faBars} />
                                    </div>
                                ) : null}
                                <Field
                                    className={classNames([
                                        'flex-grow-1',
                                        {
                                            'border-top-0': index > 0,
                                            'border-left-0': editing && !finalWithoutSort,
                                        },
                                    ])}
                                    component={itemComponent}
                                    {...itemsField}
                                    {...props}
                                    key={`item-${index}`}
                                    label={
                                        isFunction(itemFieldLabel) ? (
                                            itemFieldLabel({ item: itemValue, index: index + 1 })
                                        ) : (
                                            <Label values={{ index: index + 1 }}>
                                                {itemFieldLabel}
                                            </Label>
                                        )
                                    }
                                    isListItem
                                    name={`${name}.${index}`}
                                    value={itemValue}
                                    onChange={(newValue) => onItemChange(index, newValue)}
                                    closeForm={closeForms[index]}
                                    gotoForm={gotoForms[index]}
                                    gotoFieldForm={gotoFieldForm}
                                    closeFieldForm={closeFieldForm}
                                />
                                {editing ? (
                                    <button
                                        type="button"
                                        className="btn pl-2 pr-0 py-0 text-danger"
                                        onClick={() => {
                                            onClickDelete(index);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                ) : null}
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            ) : (
                <Empty className="p-4">
                    <Label>{noItemLabel}</Label>
                </Empty>
            )}
            <div className="d-flex mt-1">
                <Button
                    theme="primary"
                    size="sm"
                    disabled={editing}
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={onClickAdd}
                >
                    <Label>{addItemLabel}</Label>
                </Button>
                {hasItems ? (
                    <Button
                        className={classNames([
                            'ml-auto',
                            {
                                'pr-0': !editing,
                                'text-reset': !editing,
                            },
                        ])}
                        theme={editing ? 'primary' : 'link'}
                        size="sm"
                        icon={<FontAwesomeIcon icon={editing ? faCheck : faList} />}
                        onClick={onClickEdit}
                    >
                        {!editing ? (
                            <FormattedMessage
                                defaultMessage="Edit"
                                description="Items edit button label"
                            />
                        ) : (
                            <FormattedMessage
                                defaultMessage="OK"
                                description="Items finish edit button label"
                            />
                        )}
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

ItemsField.propTypes = propTypes;
ItemsField.defaultProps = defaultProps;

export default ItemsField;
