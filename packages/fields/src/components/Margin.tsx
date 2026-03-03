import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';

import Slider from './Slider';
// import Number from './Number';

import styles from '../styles/margin.module.css';

interface MarginFieldProps {
    value?: number;
    unit?: string;
    direction?: 'top' | 'bottom';
    min?: number;
    max?: number;
    marksStep?: number;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function MarginField(
    { value = null, unit = 'pt', direction = 'top', min = 0, max = 20, marksStep = 5, className = null, onChange = null },
) {
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <FontAwesomeIcon
                icon={direction === 'top' ? faArrowUp : faArrowDown}
                className={styles.icon}
            />
            <Slider
                value={value}
                min={min}
                max={max}
                marksStep={marksStep}
                marksStyle={{
                    top: -2,
                    fontSize: 8,
                }}
                withInput
                unit={unit}
                onChange={newValue =>
                    onChange !== null ? onChange(newValue !== 0 ? newValue : null) : null
                }
                className={styles.slider}
            />
        </div>
    );
}

MarginField.isHorizontal = true;

export default MarginField;
