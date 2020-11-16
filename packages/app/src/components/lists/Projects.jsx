/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ProjectItem from '../items/Project';

const propTypes = {
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const ProjectsList = ({ className }) => {
    return (
        <div
            className={classNames([
                'list-group',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <ProjectItem />
        </div>
    );
};

ProjectsList.propTypes = propTypes;
ProjectsList.defaultProps = defaultProps;

export default ProjectsList;
