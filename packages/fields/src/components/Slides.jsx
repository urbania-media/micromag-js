/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Empty } from '@micromag/core/components';

import FieldRow from './FieldRow';
import SlideField from './Slide';

const messages = defineMessages({
    noSlide: {
        id: 'slides.no_slide',
        defaultMessage: 'No slide...',
    },
    addSlide: {
        id: 'slides.add_slide',
        defaultMessage: 'Add a slide',
    },
    selectSlide: {
        id: 'slides.select_slide',
        defaultMessage: 'Select a slide',
    },
});

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    newDefaultValue: PropTypes.object, // eslint-disable-line
    className: PropTypes.string,
    gotoFieldForm: PropTypes.func,
    closeFieldForm: PropTypes.func,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    newDefaultValue: {},
    className: null,
    gotoFieldForm: null,
    closeFieldForm: null,
    onChange: null,
};

const SlidesField = ({
    name,
    value,
    newDefaultValue,
    className,
    onChange,
    gotoFieldForm,
    closeFieldForm,
}) => {
    const onClickAdd = useCallback(() => {
        if (onChange !== null) {
            onChange([...(value || []), newDefaultValue]);
        }
    }, [value, onChange, newDefaultValue]);

    const onItemChange = useCallback(
        (index, newValue) => {
            if (onChange !== null) {
                onChange(
                    newValue !== null
                        ? [...value.slice(0, index), newValue, ...value.slice(index + 1)]
                        : [...value.slice(0, index), ...value.slice(index + 1)],
                );
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
                        <div className="list-group-item py-2 px-2">
                            <FieldRow
                                key={`item-${index}`}
                                label={`#${index + 1}`}
                                withForm
                                gotoForm={gotoForms[index]}
                                closeForm={closeForms[index]}
                            >
                                <SlideField
                                    value={itemValue}
                                    onChange={newValue => onItemChange(index, newValue)}
                                    closeForm={closeForms[index]}
                                />
                            </FieldRow>
                        </div>
                    ))}
                </div>
            ) : (
                <Empty className="p-4">{messages.noSlide}</Empty>
            )}
            <div className="mt-2">
                <Button
                    theme="primary"
                    size="sm"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={onClickAdd}
                >
                    {messages.addSlide}
                </Button>
            </div>
        </div>
    );
};

SlidesField.propTypes = propTypes;
SlidesField.defaultProps = defaultProps;

export default SlidesField;
