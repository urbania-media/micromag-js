import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';

import { ClearButton } from '@micromag/core/components';

import styles from '../styles/number.module.css';

interface NumberFieldProps {
    name?: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    floatStep?: number;
    float?: boolean;
    dataList?: number[];
    autoComplete?: boolean;
    fullWidth?: boolean;
    placeholder?: string;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function NumberField(
    {
        name = null,
        value = null,
        min = null,
        max = null,
        step = 1,
        floatStep = 0.1,
        float = false,
        dataList = null,
        autoComplete = false,
        fullWidth = false,
        placeholder = null,
        className = null,
        onChange = null,
    },
) {
    const parseValue = useCallback((newValue) =>
        float ? parseFloat(newValue) : parseInt(newValue, 10),
    );
    const onInputChange = useCallback(
        (e) => {
            if (onChange !== null) {
                const val = e.currentTarget.value;
                onChange(val.length ? parseValue(val) : null);
            }
        },
        [onChange],
    );

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

    const onClear = useCallback(() => {
        if (onChange !== null) {
            onChange(null);
        }
    }, [onChange]);

    return (
        <div
            className={classNames([
                styles.container,
                { [className]: className !== null },
                { [styles.fullWidth]: fullWidth },
            ])}
        >
            <input
                type="number"
                className={classNames([styles.input, 'form-control', 'ms-auto'])}
                name={name}
                value={value !== null ? value : ''}
                min={min}
                max={max}
                step={float ? floatStep : step}
                autoComplete={autoComplete ? 'on' : 'off'}
                onChange={onInputChange}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                placeholder={placeholder}
            />
            {value === null && hasDataList ? (
                <div className={styles.arrow}>
                    <FontAwesomeIcon className={styles.arrowIcon} icon={faChevronDown} />
                </div>
            ) : null}
            {value !== null ? (
                <ClearButton className={styles.clearButton} onClick={onClear} />
            ) : null}
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
}

export default NumberField;
