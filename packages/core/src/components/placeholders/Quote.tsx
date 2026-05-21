import PlaceholderText, { PlaceholderTextProps } from '../partials/PlaceholderText';

export function Quote({ height = 1.5, lines = 6, ...props }: PlaceholderTextProps) {
    return <PlaceholderText height={height} lines={lines} {...props} />;
}

export default Quote;
