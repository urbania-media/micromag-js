import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons/faDotCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import isString from 'lodash/isString';
import { Fragment, useId } from 'react';

interface PositionValue {
    horizontal?: string;
    vertical?: string;
}
interface PositionProps {
    name?: string;
    value?: string | PositionValue | null;
    className?: string;
    disabled?: boolean;
    buttonClassName?: string;
    onChange?: (newValue: PositionValue | null) => void;
}

const icons = {
    'top-left': faArrowUp,
    'top-center': faArrowUp,
    'top-right': faArrowUp,
    'center-left': faArrowLeft,
    'center-center': faDotCircle,
    'center-right': faArrowRight,
    'bottom-left': faArrowDown,
    'bottom-center': faArrowDown,
    'bottom-right': faArrowDown,
};

function Position({
    name = null,
    value = null,
    className = null,
    buttonClassName = null,
    disabled = false,
    onChange = null,
}: PositionProps) {
    const horizontalValue = isString(value) ? value.split(' ')?.[0] : value?.horizontal;
    const verticalValue = isString(value) ? value.split(' ')?.[1] : value?.vertical;
    const onInputChange = (e) => {
        const newValue = e.currentTarget.checked
            ? e.currentTarget.value.split(' ').reduce(
                  (map, val, index) => ({
                      ...map,
                      [index === 0 ? 'horizontal' : 'vertical']: val,
                  }),
                  {},
              )
            : null;
        if (onChange !== null) {
            onChange(newValue);
        }
    };
    const id = useId();
    return (
        <div
            className={classNames(['d-flex', 'flex-column', 'flex-wrap', className])}
            data-toggle="buttons"
        >
            {['top', 'center', 'bottom'].map((verticalOption, verticalIndex) => (
                <div className="btn-group btn-group-toggle" key={`option-${verticalOption}`}>
                    {['left', 'center', 'right'].map((horizontalOption) => (
                        <Fragment key={`option-${verticalOption}-${horizontalOption}`}>
                            <input
                                type="radio"
                                name={name}
                                className="btn-check"
                                autoComplete="off"
                                id={`${id}-${verticalOption}-${horizontalOption}`}
                                value={`${horizontalOption} ${verticalOption}`}
                                onChange={onInputChange}
                                disabled={disabled}
                                checked={
                                    verticalOption === verticalValue &&
                                    horizontalOption === horizontalValue
                                }
                            />
                            <label
                                className={classNames([
                                    'btn',
                                    'btn-outline-secondary',
                                    buttonClassName,
                                    {
                                        disabled,
                                        'rounded-top-0': verticalIndex > 0,
                                        'rounded-bottom-0': verticalIndex <= 1,
                                        'border-top-0': verticalIndex > 0,
                                        active:
                                            verticalOption === verticalValue &&
                                            horizontalOption === horizontalValue,
                                    },
                                ])}
                                htmlFor={`${id}-${verticalOption}-${horizontalOption}`}
                            >
                                <FontAwesomeIcon
                                    icon={icons[`${verticalOption}-${horizontalOption}`]}
                                    style={{
                                        transform:
                                            (verticalOption === 'top' &&
                                                horizontalOption === 'right') ||
                                            (verticalOption === 'bottom' &&
                                                horizontalOption === 'left')
                                                ? 'rotate(45deg)'
                                                : (verticalOption === 'top' &&
                                                        horizontalOption === 'left') ||
                                                    (verticalOption === 'bottom' &&
                                                        horizontalOption === 'right')
                                                  ? 'rotate(-45deg)'
                                                  : 'none',
                                    }}
                                />
                            </label>
                        </Fragment>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Position;
