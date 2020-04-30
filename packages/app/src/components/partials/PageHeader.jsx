/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label } from '@micromag/core/components';

const propTypes = {
    title: MicromagPropTypes.label,
    section: MicromagPropTypes.label,
    children: PropTypes.node,
    className: PropTypes.string,
    titleClassName: PropTypes.string,
    sectionClassName: PropTypes.string,
};

const defaultProps = {
    title: null,
    section: null,
    children: null,
    className: null,
    titleClassName: null,
    sectionClassName: null,
};

const PageHeader = ({ title, section, children, className, titleClassName, sectionClassName }) => (
    <header
        className={classNames([
            'py-4',
            {
                [className]: className !== null,
            },
        ])}
    >
        <h1 className={titleClassName}>
            <Label>{section !== null ? section : title}</Label>
            {section !== null ? (
                <>
                    {' / '}
                    <small
                        className={classNames([
                            'text-muted',
                            {
                                [sectionClassName]: sectionClassName !== null,
                            },
                        ])}
                    >
                        <Label>{title}</Label>
                    </small>
                </>
            ) : null}
        </h1>
        {children}
    </header>
);

PageHeader.propTypes = propTypes;
PageHeader.defaultProps = defaultProps;

export default PageHeader;
