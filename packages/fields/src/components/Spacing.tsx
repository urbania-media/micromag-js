import Number, { NumberFieldProps } from './Number';

function Spacing(props: NumberFieldProps) {
    return <Number min={0} max={20} suffix="px" {...props} />;
}

export default Spacing;
