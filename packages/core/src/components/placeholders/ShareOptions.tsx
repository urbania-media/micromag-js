import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

interface ShareOptionsProps {
    className?: string | null;
}

export function ShareOptions({ className }: ShareOptionsProps) {
    return (
        <div className={classNames(['d-flex', 'flex-column', 'gap-1', className])}>
            {[0, 1, 2].map((idx) => (
                <div
                    key={`item-${idx}`}
                    className="d-flex w-100 p-1 bg-secondary bg-opacity-25"
                >
                    <FontAwesomeIcon
                        icon={faCircle}
                        style={{ width: '10px', height: 'auto' }}
                    />
                </div>
            ))}
        </div>
    );
}

export default ShareOptions;
