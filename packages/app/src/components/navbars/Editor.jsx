/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import { Navbar, Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useStory } from '../../contexts/StoryContext';

const messages = defineMessages({
    close: {
        id: 'navbars.editor.close',
        defaultMessage: 'Close',
    },
    save: {
        id: 'navbars.editor.save',
        defaultMessage: 'Save',
    },
});

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const EditorNavbar = ({ className }) => {
    const url = useUrlGenerator();
    const story = useStory();
    return (
        <Navbar brand="Micromag" brandLink={url('home')} className={className}>
            {story !== null ? (
                <>
                    <span className="navbar-text">{story.title}</span>
                    <form className="form-inline ml-auto">
                        <Button href={url('stories')} theme="secondary" className="mr-1">
                            {messages.close}
                        </Button>
                        <Button theme="primary">{messages.save}</Button>
                    </form>
                </>
            ) : null}
        </Navbar>
    );
};

EditorNavbar.propTypes = propTypes;
EditorNavbar.defaultProps = defaultProps;

export default EditorNavbar;
