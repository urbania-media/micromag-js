/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Empty } from '@micromag/core/components';

import FieldRow from './FieldRow';
import ImageField from './Image';

import styles from '../styles/images.module.scss';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    newDefaultValue: PropTypes.object, // eslint-disable-line
    className: PropTypes.string,
    gotoFieldForm: PropTypes.func,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    newDefaultValue: {},
    className: null,
    gotoFieldForm: null,
    onChange: null,
};

const ImagesField = ({ name, value, newDefaultValue, className, onChange, gotoFieldForm }) => {
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
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {value !== null ? (
                <div className={styles.items}>
                    {value.map((itemValue, index) => (
                        <FieldRow
                            key={`item-${index}`}
                            label={`#${index + 1}`}
                            className={styles.item}
                            isHorizontal
                            withCaret
                        >
                            <ImageField
                                form="image-component"
                                value={itemValue}
                                onChange={newValue => onItemChange(index, newValue)}
                                gotoForm={form => gotoFieldForm(`${name}.${index}`, form)}
                            />
                        </FieldRow>
                    ))}
                </div>
            ) : (
                <Empty className={styles.placeholder}>Aucune image...</Empty>
            )}
            <div className={styles.top}>
                <Button
                    size="sm"
                    icon={<FontAwesomeIcon icon={faPlus} className={styles.icon} />}
                    onClick={onClickAdd}
                >
                    Ajouter une image
                </Button>
            </div>
        </div>
    );
};

ImagesField.propTypes = propTypes;
ImagesField.defaultProps = defaultProps;

export default ImagesField;
