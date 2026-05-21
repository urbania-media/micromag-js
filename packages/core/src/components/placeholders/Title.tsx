import PlaceholderText, { PlaceholderTextProps } from '../partials/PlaceholderText';

export function Title({ height = 1.5, lines = 2, ...props }: PlaceholderTextProps) {
    return <PlaceholderText height={height} lines={lines} {...props} />;
}

export default Title;
