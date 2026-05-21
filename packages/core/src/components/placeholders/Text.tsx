import PlaceholderText, { PlaceholderTextProps } from '../partials/PlaceholderText';

function TextPlaceholder({ height = 1, lines = 4, ...props }: PlaceholderTextProps) {
    return <PlaceholderText height={height} lines={lines} {...props} />;
}

export default TextPlaceholder;
