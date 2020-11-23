import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

// import TeamMembers from '../partials/TeamMembers';
import SettingsButton from '../buttons/Settings';
import StoryMenu from '../menus/Story';
import Version from '../partials/Version';

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StorySettingsMenubar = ({ story, className }) => {
    return (
        <div
            className={classNames([
                'd-flex',
                'align-items-center',
                'justify-content-between',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Version />
            <SettingsButton>
                <StoryMenu story={story} asDropdown withoutDropdown withoutScreens />
            </SettingsButton>
        </div>
    );
};

StorySettingsMenubar.propTypes = propTypes;
StorySettingsMenubar.defaultProps = defaultProps;

export default StorySettingsMenubar;
