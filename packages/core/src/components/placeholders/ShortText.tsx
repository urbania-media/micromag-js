import PlaceholderText, { PlaceholderTextProps } from '../partials/PlaceholderText';

export function ShortText({ height = 0.8, lines = 2, ...props }: PlaceholderTextProps) {
    return <PlaceholderText height={height} lines={lines} {...props} />;
}

export default ShortText;
