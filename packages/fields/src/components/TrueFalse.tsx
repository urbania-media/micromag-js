import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';

import Radios, { RadiosProps } from './Radios';

interface TrueFalseProps extends Omit<RadiosProps, 'value'> {
    value: string | boolean | null;
    onChange?: ((boolean) => void) | null;
}

function TrueFalse({ value, onChange, ...props }: TrueFalseProps) {
    const finalValue = value === true ? 'true' : value === false ? 'false' : value;
    const onRadiosChange = (newValue) => {
        if (onChange !== null) {
            onChange(newValue === 'true' ? true : newValue === 'false' ? false : null);
        }
    };
    return (
        <Radios
            value={finalValue}
            onChange={onRadiosChange}
            options={[
                {
                    value: 'true',
                    label: (
                        <>
                            <FontAwesomeIcon className="me-1" icon={faCheck} />
                            <FormattedMessage defaultMessage="True" description="Field label" />
                        </>
                    ),
                },
                {
                    value: 'false',
                    label: (
                        <>
                            <FontAwesomeIcon className="me-1" icon={faTimes} />
                            <FormattedMessage defaultMessage="False" description="Field label" />
                        </>
                    ),
                },
                {
                    value: null,
                    label: (
                        <>
                            <FontAwesomeIcon className="me-1" icon={faCircle} />
                            <FormattedMessage defaultMessage="None" description="Field label" />
                        </>
                    ),
                },
            ]}
            {...props}
        />
    );
}

export default TrueFalse;
