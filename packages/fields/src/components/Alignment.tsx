import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons/faDotCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Radios from './Radios';

const icons = {
    horizontal: {
        left: faArrowLeft,
        middle: faDotCircle,
        right: faArrowRight,
    },
    vertical: {
        top: faArrowUp,
        middle: faDotCircle,
        bottom: faArrowDown,
    },
};

interface AlignmentProps {
    value?: {
        horizontal?: 'left' | 'right' | 'middle';
        vertical?: 'top' | 'bottom' | 'middle';
    } | null;
    className?: string | null;
    disabled?: boolean;
    onChange?: ((...args: unknown[]) => void) | null;
}

function Alignment({
    value = null,
    disabled = false,
    className = null,
    onChange = null,
}: AlignmentProps) {
    const onAlignmentChange = (key, newValue) => {
        const currentValue = value?.[key] || null;
        if (onChange !== null) {
            const newKeyValue = currentValue !== newValue ? newValue : null;
            onChange(
                newKeyValue !== null || value !== null
                    ? {
                          ...value,
                          [key]: newKeyValue,
                      }
                    : null,
            );
        }
    };

    return (
        <div className={className}>
            {['horizontal', 'vertical'].map((axis, index) => (
                <div
                    key={axis}
                    className={classNames([
                        'row',
                        'align-items-center',
                        'g-1',
                        {
                            'mb-2': index === 0,
                        },
                    ])}
                >
                    <label
                        className={classNames([
                            'col ms-auto',
                            {
                                'text-muted': disabled,
                            },
                        ])}
                    >
                        {axis === 'horizontal' ? (
                            <FormattedMessage
                                defaultMessage="Horizontal"
                                description="Field label"
                            />
                        ) : (
                            <FormattedMessage defaultMessage="Vertical" description="Field label" />
                        )}
                    </label>
                    <Radios
                        options={(axis === 'horizontal'
                            ? ['left', 'middle', 'right']
                            : ['top', 'middle', 'bottom']
                        ).map((type) => {
                            const icon = icons[axis][type];
                            return {
                                value: type,
                                label: <FontAwesomeIcon icon={icon} />,
                            };
                        })}
                        className="col-auto me-auto"
                        value={value?.[axis] || null}
                        onChange={(newValue) => onAlignmentChange(axis, newValue)}
                        disabled={disabled}
                    />
                </div>
            ))}
        </div>
    );
}

export default Alignment;
