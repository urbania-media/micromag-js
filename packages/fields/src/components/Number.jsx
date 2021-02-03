import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../styles/number.module.scss';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    size: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    floatStep: PropTypes.number,
    float: PropTypes.bool,
    dataList: PropTypes.arrayOf(PropTypes.number),
    isHorizontal: PropTypes.bool,
    autoComplete: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    size: null,
    min: null,
    max: null,
    step: 1,
    floatStep: 0.1,
    float: false,
    dataList: null,
    isHorizontal: false,
    autoComplete: false,
    className: null,
    onChange: null,
};

const NumberField = ({
    name,
    value,
    size,
    min,
    max,
    step,
    floatStep,
    float,
    dataList,
    isHorizontal,
    autoComplete,
    className,
    onChange,
}) => {
    const parseValue = useCallback((newValue) => {
        let parsedValue = null;
        if (typeof newValue === 'number' || newValue.length > 0) {
            parsedValue = float ? parseFloat(newValue) : parseInt(newValue, 10);
        }
        return parsedValue;
    });

    const onInputChange = useCallback(
        (e) => {
            if (onChange !== null) {
                onChange(parseValue(e.currentTarget.value));
            }
        },
        [onChange],
    );

    // Datalist

    const hasDataList = dataList !== null;
    const [dataListActive, setDataListActive] = useState(false);

    const onInputFocus = useCallback(() => {
        if (hasDataList) {
            setDataListActive(true);
        }
    }, [setDataListActive, hasDataList]);

    const onInputBlur = useCallback(() => {
        if (hasDataList && dataListActive) {
            setDataListActive(false);
        }
    }, [setDataListActive, hasDataList, dataListActive]);

    const onDataListClick = useCallback(
        (dataListValue) => {
            if (onChange !== null) {
                onChange(parseValue(dataListValue));
                setDataListActive(false);
            }
        },
        [onChange, setDataListActive],
    );

    return (
        <div className={styles.container}>
            <input
                type="number"
                className={classNames([
                    'form-control',
                    {
                        // 'w-auto': size !== null,
                        'ml-auto': isHorizontal,
                        [className]: className !== null,
                    },
                ])}
                name={name}
                value={value || ''}
                min={min}
                max={max}
                size={size}
                step={float ? floatStep : step}
                autoComplete={autoComplete ? 'on' : 'off'}
                onChange={onInputChange}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
            />
            {hasDataList && dataListActive ? (
                <ul className={styles.dataListItems}>
                    {dataList.map((dataListValue) => (
                        <li key={`data-list-${dataListValue}`} className={styles.dataListItem}>
                            <button
                                className={styles.dataListItemButton}
                                type="button"
                                onTouchStart={() => {
                                    onDataListClick(dataListValue);
                                }}
                                onMouseDown={() => {
                                    onDataListClick(dataListValue);
                                }}
                            >
                                {dataListValue}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

NumberField.propTypes = propTypes;
NumberField.defaultProps = defaultProps;

export default NumberField;
