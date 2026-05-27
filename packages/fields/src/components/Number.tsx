import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { HTMLAttributes, ReactNode, useState } from 'react';

import { ClearButton } from '@micromag/core/components';

import styles from '../styles/number.module.css';

export interface NumberFieldProps extends Omit<
    HTMLAttributes<HTMLInputElement>,
    'prefix' | 'onChange'
> {
    inputId?: string | null;
    name?: string | null;
    value?: number | null;
    min?: number | null;
    max?: number | null;
    step?: number;
    floatStep?: number;
    float?: boolean;
    dataList?: number[] | null;
    prefix?: ReactNode | null;
    suffix?: ReactNode | null;
    autoComplete?: boolean;
    disabled?: boolean;
    className?: string | null;
    onChange?: ((newValue: number | null) => void) | null;
}

function NumberField({
    inputId = null,
    name = null,
    value = null,
    min = null,
    max = null,
    step = 1,
    floatStep = 0.1,
    float = false,
    dataList = null,
    prefix = null,
    suffix = null,
    autoComplete = false,
    disabled = false,
    className = null,
    onChange = null,
    ...props
}: NumberFieldProps) {
    const parseValue = (newValue) => (float ? parseFloat(newValue) : parseInt(newValue, 10));
    const onInputChange = (e) => {
        if (onChange !== null) {
            const val = e.currentTarget.value;
            onChange(val.length > 0 ? parseValue(val) : null);
        }
    };

    const hasDataList = dataList !== null;
    const [dataListActive, setDataListActive] = useState(false);

    const onInputFocus = () => {
        if (hasDataList) {
            setDataListActive(true);
        }
    };

    const onInputBlur = () => {
        if (hasDataList && dataListActive) {
            setDataListActive(false);
        }
    };

    const onDataListClick = (dataListValue) => {
        if (onChange !== null) {
            onChange(parseValue(dataListValue));
            setDataListActive(false);
        }
    };

    const onClear = () => {
        if (onChange !== null) {
            onChange(null);
        }
    };

    return (
        <div
            className={classNames(
                {
                    'input-group': prefix !== null || suffix !== null,
                    dropdown: hasDataList,
                },
                className,
            )}
        >
            {prefix !== null ? <span className="input-group-text">{prefix}</span> : null}
            <input
                id={inputId}
                type="number"
                className={classNames(['form-control', styles.input])}
                name={name}
                value={value !== null ? value : ''}
                min={min}
                max={max}
                step={float ? floatStep : step}
                autoComplete={autoComplete ? 'on' : 'off'}
                disabled={disabled}
                onChange={onInputChange}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                {...props}
            />
            {value === null && hasDataList ? (
                <div className="position-absolute top-0 end-0 d-flex h-100 p-2 align-items-center pe-none">
                    <FontAwesomeIcon className="m-auto" icon={faChevronDown} />
                </div>
            ) : null}
            {value !== null ? (
                <ClearButton
                    onClick={onClear}
                    className="position-absolute top-0 end-0 h-100 align-items-center justify-content-center p-2"
                />
            ) : null}
            {suffix !== null ? <span className="input-group-text">{suffix}</span> : null}
            {hasDataList ? (
                <ul
                    className={classNames([
                        'dropdown-menu mt-2 dropdown-menu-end small',
                        {
                            show: dataListActive,
                        },
                    ])}
                >
                    {dataList.map((dataListValue) => (
                        <li key={`data-list-${dataListValue}`}>
                            <button
                                className="dropdown-item"
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
