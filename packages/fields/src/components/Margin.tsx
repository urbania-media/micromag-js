import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import Slider from './Slider';

interface MarginFieldProps {
    value?: number | null;
    unit?: string;
    direction?: 'top' | 'bottom';
    min?: number;
    max?: number;
    marksStep?: number;
    disabled?: boolean;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function MarginField({
    value = null,
    unit = 'pt',
    direction = 'top',
    min = 0,
    max = 20,
    marksStep = 5,
    disabled = false,
    className = null,
    onChange = null,
}: MarginFieldProps) {
    return (
        <div
            className={classNames([
                'd-flex',
                'align-items-center',
                {
                    'text-muted': disabled,
                },
                className,
            ])}
        >
            <FontAwesomeIcon
                icon={direction === 'top' ? faArrowUp : faArrowDown}
                className="me-2"
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
                disabled={disabled}
                onChange={(newValue) =>
                    onChange !== null ? onChange(newValue !== 0 ? newValue : null) : null
                }
            />
        </div>
    );
}

MarginField.isHorizontal = true;

export default MarginField;
