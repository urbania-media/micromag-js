import classNames from 'classnames';
import React from 'react';

import type { CallToAction } from '@micromag/core';
import CallToAction from '@micromag/element-call-to-action';

import styles from './styles.module.css';

interface FooterProps {
    callToAction?: CallToAction | null;
    className?: string | null;
}

function Footer({ callToAction = null, className = null }: FooterProps) {
    if (callToAction === null) return null;

    return (
        <div className={classNames([styles.container, className])}>
            <CallToAction {...callToAction} />
        </div>
    );
}

export default Footer;
