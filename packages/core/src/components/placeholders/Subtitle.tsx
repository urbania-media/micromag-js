import PlaceholderText, { PlaceholderTextProps } from '../partials/PlaceholderText';

export function Subtitle({ height = 1.25, lines = 1, ...props }: PlaceholderTextProps) {
    return <PlaceholderText height={height} lines={lines} {...props} />;
}

export default Subtitle;
