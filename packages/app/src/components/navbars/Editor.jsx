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
        id: 'navbars.editor.close',
        defaultMessage: 'Close',
    },
    saving: {
        id: 'navbars.editor.saving',
        defaultMessage: 'Saving...',
    },
    save: {
        id: 'navbars.editor.save',
        defaultMessage: 'Save',
    },
});

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
    return (
        <Navbar
            brand={<img src={logo} height="30" alt="Micromag" />}
            brandLink={url('home')}
            theme="light"
            className={className}
        >
            <span className="navbar-text">{story !== null ? story.title : null}</span>
            <form className="form-inline ml-auto">
                <Button href={url('stories')} theme="secondary" className="mr-1">
                    {messages.close}
                </Button>
                <Button theme="primary" disabled={story === null || saving} onClick={onClickSave}>
                    {saving ? messages.saving : messages.save}
                </Button>
            </form>
        </Navbar>
    );
};

EditorNavbar.propTypes = propTypes;
EditorNavbar.defaultProps = defaultProps;

export default EditorNavbar;
