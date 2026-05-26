import classNames from 'classnames';

import Slider, { SliderFieldProps } from './Slider';

import styles from '../styles/border-width.module.css';

interface BorderRadiusProps extends SliderFieldProps {
    value?: string | null;
    sizes?: number[];
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultSizes = [0, 2, 6, 10, 20, 30];

function BorderRadius({
    value = null,
    sizes = defaultSizes,
    className = null,
    onChange = null,
    ...props
}: BorderRadiusProps) {
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

export default BorderRadius;
