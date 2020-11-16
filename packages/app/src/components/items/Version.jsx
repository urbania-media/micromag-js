/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useFormattedTime } from '@micromag/core/hooks';

import Avatar from '../partials/Avatar';

import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    item: AppPropTypes.version.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const VersionItem = ({ item, className }) => {
    const url = useUrlGenerator();
    const getTime = useFormattedTime();

    const {
        created_at: createdAt,
        number = 1,
        author = { name: 'Paul', color: '#ccc' },
        slug = 'test',
    } = item || {};

    const time = getTime(createdAt);

    return (
        <div
            className={classNames([
                'list-group-item',
                'd-flex',
                'align-items-center',
                'justify-content-between',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="mr-3">
                <span className="mr-3">{time}</span>
                <Button
                    href={url('stories.preview', {
                        story: slug,
                    })}
                    theme="primary"
                    className="btn"
                >
                    v{number}
                </Button>
            </div>
            <div className="ml-3">
                {author ? (
                    <div className="d-flex align-items-center">
                        <span className="mr-2">{author.name}</span>
                        <Avatar small color={author.color} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

VersionItem.propTypes = propTypes;
VersionItem.defaultProps = defaultProps;

export default VersionItem;
