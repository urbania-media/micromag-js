/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from '../../styles/partials/slideshow.module.css';

interface SlideshowProps {
    items?: React.ReactNode[];
    auto?: boolean;
    delay?: number;
    width?: string | number | null;
    height?: string | number | null;
    className?: string | null;
    children?: React.ReactNode | null;
}

function Slideshow({
    items = [],
    auto = true,
    delay = 5000,
    width = null,
    height = null,
    className = null,
    children = null,
}: SlideshowProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let id = null;
        if (auto) {
            id = setTimeout(() => {
                if (index < items.length - 1) {
                    setIndex((i) => i + 1);
                } else {
                    setIndex(0);
                }
            }, delay);
        }
        return () => {
            clearTimeout(id);
        };
    }, [index, items, auto, delay]);

    const style = { width, height };

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
            style={style}
        >
            <div className={styles.items}>
                {items.map((it, i) => (
                    <div
                        key={`slide-${i + 1}`}
                        className={classNames([
                            styles.item,
                            {
                                [styles.prev]: i < index,
                                [styles.current]: i === index,
                                [styles.next]: i > index,
                            },
                        ])}
                    >
                        {it}
                    </div>
                ))}
            </div>
            {children}
        </div>
    );
}

export default Slideshow;
