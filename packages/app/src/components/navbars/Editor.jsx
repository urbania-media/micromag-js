/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Navbar, Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import logo from '../../assets/logo-beta.svg';

const propTypes = {
    story: MicromagPropTypes.story,
    saving: PropTypes.bool,
    className: PropTypes.string,
    onClickSave: PropTypes.func,
};

const defaultProps = {
    story: null,
    saving: false,
    className: null,
    onClickSave: null,
};

const EditorNavbar = ({ story, saving, onClickSave, className }) => {
    const url = useUrlGenerator();
    const link =
        story !== null
            ? url('stories.show', {
                  story: story.id,
              })
            : url('home');
    return (
        <Navbar
            brand={<img src={logo} height="30" alt="Micromag" />}
            brandLink={link}
            theme="primary"
            withoutCollapse
            noWrap
            className={className}
        >
            <span className="navbar-text">{story !== null ? story.title : null}</span>
            <form className="form-inline ml-auto">
                <Button href={link} theme="secondary" className="mr-1">
                    <FormattedMessage defaultMessage="Close" description="Close button label" />
                </Button>
                <Button theme="light" disabled={story === null || saving} onClick={onClickSave}>
                    {saving ? (
                        <FormattedMessage
                            defaultMessage="Saving..."
                            description="Saving button label"
                        />
                    ) : (
                        <FormattedMessage defaultMessage="Save" description="Save button label" />
                    )}
                </Button>
            </form>
        </Navbar>
    );
};

EditorNavbar.propTypes = propTypes;
EditorNavbar.defaultProps = defaultProps;

export default EditorNavbar;
