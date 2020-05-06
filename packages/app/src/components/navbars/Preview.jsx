/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Navbar, Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import logo from '../../assets/logo-beta.svg';

const messages = defineMessages({
    close: {
        id: 'navbars.preview.close',
        defaultMessage: 'Close',
    },
});

const propTypes = {
    story: MicromagPropTypes.story,
    className: PropTypes.string,
};

const defaultProps = {
    story: null,
    className: null,
};

const PreviewNavbar = ({ story, className }) => {
    const url = useUrlGenerator();
    return (
        <Navbar
            brand={<img src={logo} height="20" alt="Micromag" />}
            brandLink={url('home')}
            theme="primary"
            withoutCollapse
            noWrap
            compact
            className={className}
        >
            <span className="navbar-text py-0">{story !== null ? story.title : null}</span>
            <form className="form-inline ml-auto">
                <Button
                    href={
                        story !== null
                            ? url('stories.show', {
                                  story: story.id,
                              })
                            : '#'
                    }
                    theme="secondary"
                    className="mr-1"
                    size="sm"
                    disabled={story === null}
                >
                    {messages.close}
                </Button>
            </form>
        </Navbar>
    );
};

PreviewNavbar.propTypes = propTypes;
PreviewNavbar.defaultProps = defaultProps;

export default PreviewNavbar;
