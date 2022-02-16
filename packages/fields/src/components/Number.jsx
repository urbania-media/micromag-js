import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/number.module.scss';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    floatStep: PropTypes.number,
    float: PropTypes.bool,
    dataList: PropTypes.arrayOf(PropTypes.number),
    autoComplete: PropTypes.bool,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    min: null,
    max: null,
    step: 1,
    floatStep: 0.1,
    float: false,
    dataList: null,
    autoComplete: false,
    fullWidth: false,
    className: null,
    onChange: null,
};

const NumberField = ({
    name,
    value,
    min,
    max,
    step,
    floatStep,
    float,
    dataList,
    autoComplete,
    fullWidth,
    className,
    onChange,
}) => {
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
            />
            {hasDataList ? (
                <div className={styles.arrow}>
                    <FontAwesomeIcon className={styles.arrowIcon} icon={faChevronDown} />
                </div>
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
};

NumberField.propTypes = propTypes;
NumberField.defaultProps = defaultProps;

export default NumberField;
