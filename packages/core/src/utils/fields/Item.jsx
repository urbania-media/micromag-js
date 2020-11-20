/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Autosuggest from 'react-autosuggest';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import * as AppPropTypes from '../../../lib/PropTypes';
import { isMessage } from '../../../lib/utils';
import { useApi } from '../../../contexts/ApiContext';
import Button from '../buttons/Button';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    errors: AppPropTypes.formErrors,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    ),
    maxItemsCount: PropTypes.number,
    loadItems: PropTypes.func,
    requestUrl: PropTypes.string,
    requestOptions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    requestQuery: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    requestSearchParamName: PropTypes.string,
    getItemLabel: PropTypes.func,
    getItemDescription: PropTypes.func,
    getItemImage: PropTypes.func,
    itemLabelPath: PropTypes.string,
    itemDescriptionPath: PropTypes.string,
    itemImagePath: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'lg']),
    placeholder: AppPropTypes.text,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    errors: null,
    items: null,
    maxItemsCount: 5,
    loadItems: null,
    requestUrl: null,
    requestOptions: null,
    requestQuery: null,
    requestSearchParamName: 'search',
    getItemLabel: (it, path) => get(it, path, null),
    getItemDescription: (it, path) => get(it, path, null),
    getItemImage: (it, path) => get(it, path, null),
    itemLabelPath: 'label',
    itemDescriptionPath: 'description',
    itemImagePath: 'image',
    size: null,
    placeholder: null,
    className: null,
    inputClassName: null,
    onChange: null,
};

const ItemField = ({
    name,
    value,
    errors,
    size,
    placeholder,
    items: initialItems,
    maxItemsCount,
    loadItems,
    requestUrl,
    requestQuery,
    requestOptions,
    requestSearchParamName,
    getItemLabel,
    getItemDescription,
    getItemImage,
    itemLabelPath,
    itemDescriptionPath,
    itemImagePath,
    onChange,
    className,
    inputClassName,
}) => {
    const intl = useIntl();
    const api = useApi();
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState(initialItems || []);
    const lastRequest = useRef(null);

    const onSuggestionsFetchRequested = useCallback(
        (request) => {
            if (loadItems !== null) {
                const currentRequest = loadItems(request);
                lastRequest.current = currentRequest;
                currentRequest.then((newItems) => {
                    if (currentRequest === lastRequest.current) {
                        setItems(newItems);
                    }
                });
            } else if (requestUrl !== null) {
                const currentRequest = api.requestGet(
                    requestUrl,
                    {
                        ...requestQuery,
                        [requestSearchParamName]: request.value,
                    },
                    requestOptions,
                );
                lastRequest.current = currentRequest;
                currentRequest.then((newItems) => {
                    if (currentRequest === lastRequest.current) {
                        setItems(
                            maxItemsCount !== null ? newItems.slice(0, maxItemsCount) : newItems,
                        );
                    }
                });
            } else if (initialItems !== null) {
                setItems(initialItems);
            }
        },
        [
            api,
            loadItems,
            initialItems,
            maxItemsCount,
            requestUrl,
            requestQuery,
            requestOptions,
            requestSearchParamName,
        ],
    );

    const onSuggestionsClearRequested = useCallback(() => {
        setItems([]);
    }, [setItems]);

    const onInputChange = useCallback(
        (e, { newValue }) => {
            setInputValue(newValue);
        },
        [setInputValue],
    );

    const onSuggestionSelected = useCallback(
        (e, { suggestion }) => {
            setInputValue('');
            if (onChange !== null) {
                onChange(suggestion);
            }
        },
        [setInputValue, onChange],
    );

    const onClickRemove = useCallback(() => {
        setInputValue('');
        if (onChange !== null) {
            onChange(null);
        }
    }, [setInputValue, onChange]);

    const renderSuggestion = useCallback(
        (suggestion, { isHighlighted }) => {
            const label = getItemLabel(suggestion, itemLabelPath);
            return (
                <button
                    type="button"
                    className={classNames([
                        'dropdown-item',
                        {
                            active: isHighlighted,
                        },
                    ])}
                >
                    {label}
                </button>
            );
        },
        [getItemLabel, itemLabelPath],
    );

    const renderSectionTitle = useCallback(
        (section) => <h6 className="dropdown-header">{section.title}</h6>,
        [],
    );

    const inputProps = {
        placeholder: isMessage(placeholder) ? intl.formatMessage(placeholder) : placeholder,
        value: inputValue || '',
        name,
        type: 'search',
        onChange: onInputChange,
    };

    const getSuggestionValue = useCallback(
        (suggestion) => getItemLabel(suggestion, itemLabelPath),
        [getItemLabel, itemLabelPath],
    );

    const itemLabel = value !== null ? getItemLabel(value, itemLabelPath) : null;
    const itemDescription = value !== null ? getItemDescription(value, itemDescriptionPath) : null;
    const itemImage = value !== null ? getItemImage(value, itemImagePath) : null;

    return (
        <div className={className}>
            {value !== null ? (
                <div className="card">
                    <div className="card-body p-1 pl-2">
                        <div className="media align-items-center">
                            {itemImage !== null ? (
                                <img src={itemImage} alt={itemLabel} className="mr-2" width="20" />
                            ) : null}
                            <div className="media-body">
                                <h6 className="m-0">{itemLabel}</h6>
                                {!isEmpty(itemDescription) ? (
                                    <p className="m-0">
                                        <small>{itemDescription}</small>
                                    </p>
                                ) : null}
                            </div>
                            <div className="ml-1">
                                <Button
                                    type="button"
                                    size="sm"
                                    theme="secondary"
                                    outline
                                    onClick={onClickRemove}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Autosuggest
                    suggestions={items}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    onSuggestionSelected={onSuggestionSelected}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    renderSectionTitle={renderSectionTitle}
                    inputProps={inputProps}
                    theme={{
                        container: 'position-relative',
                        containerOpen: 'show',
                        input: classNames([
                            'form-control',
                            {
                                'is-invalid': errors !== null,
                                [`form-control-${size}`]: size !== null,
                                [inputClassName]: inputClassName !== null,
                            },
                        ]),
                        suggestionsContainer: 'dropdown-menu',
                        suggestionsContainerOpen: 'show',
                        suggestionsList: 'list-unstyled m-0 p-0',
                        suggestion: 'm-0 p-0',
                    }}
                />
            )}
        </div>
    );
};

ItemField.propTypes = propTypes;
ItemField.defaultProps = defaultProps;

export default ItemField;
