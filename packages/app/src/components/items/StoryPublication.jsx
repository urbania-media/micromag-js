/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label, Button } from '@micromag/core/components';

import * as AppPropTypes from '../../lib/PropTypes';

const messages = defineMessages({
    settings: {
        id: 'publish_result.details',
        defaultMessage: 'Details',
    },
});

const propTypes = {
    item: AppPropTypes.storyPublication.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const StoryPublication = ({ item, className }) => {
    const [detailsOpened, setDetailsOpened] = useState(false);
    const onClickDetails = useCallback(() => setDetailsOpened(!detailsOpened), [
        detailsOpened,
        setDetailsOpened,
    ]);
    return (
        <li
            className={classNames([
                'list-group-item',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="row align-items-center mx-n2">
                <div className="col px-2">
                    <Label>{item.label}</Label>
                </div>
                <div className="col-auto px-2">
                    <Button
                        theme="secondary"
                        outline
                        size="sm"
                        className={classNames({
                            active: detailsOpened,
                        })}
                        onClick={onClickDetails}
                    >
                        {messages.details}
                    </Button>
                </div>
            </div>
        </li>
    );
};

StoryPublication.propTypes = propTypes;
StoryPublication.defaultProps = defaultProps;

export default StoryPublication;
