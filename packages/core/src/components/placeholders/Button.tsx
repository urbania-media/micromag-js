import classNames from 'classnames';

import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';
import PlaceholderText from '../partials/PlaceholderText';

export function Button({ className, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock outline className={classNames(['rounded', className])} {...props}>
            <PlaceholderText height="0.5em" />
        </PlaceholderBlock>
    );
}

export default Button;
