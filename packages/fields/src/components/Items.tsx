import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactSortable } from 'react-sortablejs';
import { v4 as uuid } from 'uuid';

import type { Field as FieldType, Label as LabelType } from '@micromag/core';
import { Button, Empty, Label } from '@micromag/core/components';
import { useFieldContext } from '@micromag/core/contexts';

import Field from './Field';

interface ItemsFieldProps {
    name?: string | null;
    value?: Record<string, unknown>[] | null;
    getDefaultValue?: ((...args: unknown[]) => void) | null;
    noItemLabel?: LabelType;
    addItemLabel?: LabelType;
    itemFieldLabel?: (...args: unknown[]) => void | LabelType;
    itemComponent?: unknown | null;
    itemsField?: FieldType | null;
    itemsProps?: Record<string, unknown> | null;
    className?: string | null;
    withoutSort?: boolean;
    withoutAddItem?: boolean;
    withoutDeleteItem?: boolean;
    isFieldForm?: boolean;
    gotoFieldForm?: ((...args: unknown[]) => void) | null;
    closeFieldForm?: ((...args: unknown[]) => void) | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function ItemsField({
    name = null,
    value = null,
    getDefaultValue = null,
    noItemLabel = null,
    addItemLabel = null,
    itemFieldLabel: initialItemFieldLabel = null,
    itemComponent = null,
    itemsField = null,
    itemsProps = null,
    className = null,
    withoutSort = false,
    withoutAddItem = false,
    withoutDeleteItem = false,
    onChange = null,
    isFieldForm = false,
    gotoFieldForm = null,
    closeFieldForm = null,
    ...props
}: ItemsFieldProps) {
    const defaultIndexLabel = ({ index }) => (
        <FormattedMessage
            defaultMessage="#{index}"
            description="Item label in items field"
            values={{ index }}
        />
    );

    const itemFieldLabel = initialItemFieldLabel || defaultIndexLabel;

    // const finalIsFieldForm =
    //     isFieldForm || (itemComponent !== null ? itemComponent.withForm || false : false);
    const [editing, setEditing] = useState(false);
    const [idMaps, setIdMaps] = useState(() => (value || []).map(() => uuid()));
    const fieldContext = useFieldContext();

    const onClickAdd = () => {
        const newDefaultValue = getDefaultValue !== null ? getDefaultValue() : null;
        const newValue = [...(value || []), newDefaultValue];
        setIdMaps([...idMaps, uuid()]);

        if (onChange !== null) {
            onChange(newValue);
        }
        if (gotoFieldForm !== null) {
            gotoFieldForm(`${name}.${newValue.length - 1}`, null, fieldContext);
        }
    };

    const onClickEdit = () => {
        setEditing((old) => !old);
    };

    const onClickDelete = (index) => {
        if (onChange !== null) {
            const newValues = [...value];
            newValues.splice(index, 1);
            setIdMaps(idMaps.filter((_, idIndex) => idIndex !== index));
            onChange(newValues);

            if (newValues.length === 0) {
                setEditing(false);
            }
        }
    };

    const onItemChange = (index, newValue) => {
        if (onChange !== null) {
            const newValues = [...value];
            newValues[index] = newValue;
            onChange(newValues);
        }
    };

    const onOrderChange = (newItems) => {
        const orderChanged = newItems.reduce(
            (changed, { index: newIndex }, prevIndex) => changed || prevIndex !== newIndex,
            false,
        );
        if (orderChanged && onChange !== null) {
            const newIdMap = newItems.map(({ index }) => idMaps[index]);
            setIdMaps(newIdMap);
            onChange(newItems.map(({ it }) => it));
        }
    };

    const items = value || [];
    const { length: itemsLength = 0 } = items;
    const hasItems = itemsLength > 0;
    const sortableItems = items.map((it, index) => ({ id: idMaps[index], it, index }));
    const finalWithoutSort = withoutSort || !editing;

    return (
        <div className={className}>
            {hasItems ? (
                <div>
                    <ReactSortable
                        className="list-group"
                        list={sortableItems}
                        setList={onOrderChange}
                        disabled={finalWithoutSort}
                        key={finalWithoutSort}
                    >
                        {items.map((itemValue, index) => (
                            <div className="p-0 d-flex" key={`item-${index}`}>
                                {!finalWithoutSort ? (
                                    <div
                                        className={classNames([
                                            'btn',
                                            'px-2',
                                            'border',
                                            'border-dark',
                                            'border-right-0',
                                            'rounded-0',
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
                                        'overflow-hidden',
                                        {
                                            'border-top-0': index > 0,
                                            'border-left-0': editing && !finalWithoutSort,
                                        },
                                    ])}
                                    component={itemComponent}
                                    {...itemsField}
                                    {...props}
                                    {...itemsProps}
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
                                    closeForm={() => closeFieldForm(`${name}.${index}`)}
                                    gotoForm={() =>
                                        gotoFieldForm(`${name}.${index}`, null, fieldContext)
                                    }
                                    gotoFieldForm={gotoFieldForm}
                                    closeFieldForm={closeFieldForm}
                                />
                                {editing ? (
                                    <button
                                        type="button"
                                        className="btn ps-2 pe-2 py-0 text-danger"
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
                    <Label>
                        {noItemLabel || (
                            <FormattedMessage
                                defaultMessage="No item..."
                                description="Label when there is no item in items field"
                            />
                        )}
                    </Label>
                </Empty>
            )}
            <div className="d-flex mt-1">
                {!withoutAddItem ? (
                    <Button
                        theme="primary"
                        size="sm"
                        disabled={editing}
                        icon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={onClickAdd}
                    >
                        <Label>
                            {addItemLabel || (
                                <FormattedMessage
                                    defaultMessage="Add an item"
                                    description="Button label in items field"
                                />
                            )}
                        </Label>
                    </Button>
                ) : null}
                {hasItems && !withoutDeleteItem ? (
                    <Button
                        className={classNames([
                            'ms-auto',
                            {
                                'pe-0': !editing,
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
}

export default ItemsField;
