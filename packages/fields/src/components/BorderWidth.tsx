import classNames from 'classnames';

import Slider, { SliderFieldProps } from './Slider';

import styles from '../styles/border-width.module.css';

interface BorderWidthProps extends SliderFieldProps {
    value?: string | null;
    sizes?: number[];
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultSizes = [1, 2, 4, 8, 10, 14, 20];

function BorderWidth({
    value = null,
    sizes = defaultSizes,
    className = null,
    onChange = null,
    ...props
}: BorderWidthProps) {
    return (
        <Slider
            value={value}
            min={sizes[0]}
            max={sizes[sizes.length - 1]}
            marks={sizes}
            withInput
            className={classNames([styles.container, className])}
            onChange={onChange}
            {...props}
        />
    );
}

export default BorderWidth;
