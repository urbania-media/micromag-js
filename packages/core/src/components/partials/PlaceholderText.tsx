import classNames from 'classnames';
import isNumber from 'lodash/isNumber';

export interface PlaceholderTextProps {
    lines?: number;
    lineMargin?: number | string;
    width?: number | string;
    height?: number | string | null;
    fontSize?: number;
    className?: string | null;
}

function PlaceholderText({
    lines = 1,
    lineMargin = '0.4em',
    width = '100%',
    height = null,
    fontSize = 16,
    className = null,
}: PlaceholderTextProps) {
    const lineHeight =
        height !== null && isNumber(height) ? `${Math.round(height * fontSize)}px` : height;

    const oddWidth = isNumber(width) ? width * 0.9 : '80%';

    return (
        <div
            className={classNames(['w-100', className])}
            style={
                {
                    // mixBlendMode: 'difference',
                }
            }
        >
            {[...Array(lines)].map((e, index) => (
                <div
                    key={`line-${index}`}
                    style={{
                        width: index % 2 === 0 ? width : oddWidth,
                        height: lineHeight,
                        marginTop: index > 0 ? lineMargin : null,
                        marginBottom: index < lines - 1 ? lineMargin : null,
                        backgroundColor: 'currentcolor',
                    }}
                />
            ))}
        </div>
    );
}

export default PlaceholderText;
