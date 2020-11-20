/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import * as AppPropTypes from '../../../lib/PropTypes';
import Label from '../../partials/Label';
import Button from '../buttons/Button';
import FormGroup from './FormGroup';

const messages = defineMessages({
    noItem: {
        id: 'forms.no_item',
        defaultMessage: 'No item.',
    },
    addItem: {
        id: 'forms.add_item_button',
        defaultMessage: 'Add item',
    },
});

const propTypes = {
    label: AppPropTypes.text,
    value: PropTypes.arrayOf(PropTypes.object),
    renderItem: PropTypes.func,
    addItemLabel: AppPropTypes.label,
    noItemLabel: AppPropTypes.label,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    label: null,
    value: null,
    renderItem: null,
    addItemLabel: messages.addItem,
    noItemLabel: messages.noItem,
    className: null,
    onChange: null,
};

const ItemsField = ({ label, value, onChange, renderItem, addItemLabel, noItemLabel, className }) => {
    const onClickAdd = useCallback(() => {
        const newValue = [...(value || []), {}];
        if (onChange !== null) {
            onChange(newValue);
        }
    }, [value, onChange]);
    const onItemChange = useCallback(
        (it, index, newItemValue) => {
            const newValue = [
                ...value.slice(0, index),
                {
                    ...value[index],
                    ...newItemValue,
                },
                ...value.slice(index + 1),
            ];
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );
    const onClickRemove = useCallback(
        (it, index) => {
            const newValue = [...value.slice(0, index), ...value.slice(index + 1)];
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );
    return (
        <FormGroup
            label={
                <>
                    <Label>{label}</Label>
                    <Button
                        type="button"
                        theme="primary"
                        outline
                        onClick={onClickAdd}
                        className="ml-auto"
                    >
                        {addItemLabel}
                    </Button>
                </>
            }
            className={className}
            labelClassName="d-flex align-items-center"
        >
            <div className="d-flex flex-column">
                {value !== null && value.length > 0 ? (
                    <div
                        className={classNames([
                            'list-group',
                            {
                                [className]: className !== null,
                            },
                        ])}
                    >
                        {value.map((it, index) => (
                            <div className="list-group-item p-2" key={`item-${it.id}`}>
                                <div className="row mx-n1">
                                    <div className="col px-1">
                                        {renderItem !== null
                                            ? renderItem(it, index, {
                                                  onChange: (newValue) =>
                                                      onItemChange(it, index, newValue),
                                              })
                                            : null}
                                    </div>
                                    <div className="col-auto px-1">
                                        <Button
                                            onClick={() => onClickRemove(it, index)}
                                            theme="secondary"
                                            size="sm"
                                            outline
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="card bg-light text-muted text-center">
                        <div className="card-body">
                            <Label>{noItemLabel}</Label>
                        </div>
                    </div>
                )}
            </div>
        </FormGroup>
    );
};

ItemsField.propTypes = propTypes;
ItemsField.defaultProps = defaultProps;

export default ItemsField;
