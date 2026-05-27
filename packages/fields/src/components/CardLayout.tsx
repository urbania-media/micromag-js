import classNames from 'classnames';

import { PlaceholderImage, PlaceholderText, PlaceholderTitle } from '@micromag/core/components';

import Radios, { RadiosProps } from './Radios';

interface CardLayoutProps extends RadiosProps {
    types?: string[];
    value?: string | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultTypes = ['content-top', 'content-bottom', 'content-split'];

function CardLayout({
    types = defaultTypes,
    value = null,
    className = null,
    ...props
}: CardLayoutProps) {
    const getLayoutPreviewByType = (type) => {
        switch (type) {
            case 'content-top':
                return (
                    <>
                        <PlaceholderTitle lines={1} lineMargin={1} height="0.3em" />
                        <PlaceholderText lines={2} lineMargin={1} height="0.3em" />
                        <PlaceholderImage width="100%" height="1.25em" />
                    </>
                );
            case 'content-bottom':
                return (
                    <>
                        <PlaceholderImage width="100%" height="1.25em" />
                        <PlaceholderTitle lines={1} lineMargin={1} height="0.3em" />
                        <PlaceholderText lines={2} lineMargin={1} height="0.3em" />
                    </>
                );
            case 'content-split':
                return (
                    <>
                        <PlaceholderTitle lines={1} lineMargin={1} height="0.3em" />
                        <PlaceholderImage width="100%" height="1.25em" />
                        <PlaceholderText lines={2} lineMargin={1} height="0.3em" />
                    </>
                );
            default:
                return <div />;
        }
    };

    return (
        <Radios
            options={types.map((type) => ({
                value: type,
                label: getLayoutPreviewByType(type),
            }))}
            value={value}
            className={classNames(['d-inline-flex', className])}
            buttonClassName="px-3"
            uncheckable
            {...props}
        />
    );
}

export default CardLayout;
