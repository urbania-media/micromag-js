import classNames from 'classnames';
import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function InputText({ className, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock
            outline
            height="1em"
            className={classNames(['rounded', className])}
            {...props}
        />
    );
}

export default InputText;
