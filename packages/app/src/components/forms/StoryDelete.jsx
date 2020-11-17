/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Text } from '@micromag/fields';
import { Button } from '@micromag/core/components';
import { useStoryDelete } from '@micromag/data';
import { slug } from '@micromag/core/utils';

const propTypes = {
    story: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
    onComplete: PropTypes.func,
};

const defaultProps = {
    className: null,
    onComplete: null,
};

const StoryDeleteForm = ({ story, className, onComplete }) => {
    const { id, title } = story || {};
    const validation = slug(title || story.id, '-');
    const [confirmation, setConfirmation] = useState('');
    const [error, setError] = useState('');

    const { deleteStory } = useStoryDelete(id);
    const postForm = useCallback(() => {
        if (confirmation === validation) {
            deleteStory(id)
                .then(() => {
                    if (onComplete !== null) {
                        onComplete();
                    }
                })
                .catch((e) => {
                    setError(e.message || 'Error');
                });
        }
    }, [id, confirmation, validation, setError, deleteStory, onComplete]);

    const onChange = useCallback(
        (value) => {
            setConfirmation(value);
        },
        [setConfirmation],
    );

    return (
        <div
            className={classNames([
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="form-group">
                <label htmlFor="confirmation" className="label">
                    <FormattedMessage
                        defaultMessage="Type in the name of the story ({name}) to confirm."
                        description="Field label"
                        values={{ name: validation }}
                    />
                </label>
                <Text id="confirmation" value={confirmation} onChange={onChange} />
                {error ? <p className="text-danger my-1">{error}</p> : null}
            </div>
            <div className="form-group">
                <Button
                    theme="primary"
                    size="md"
                    outline
                    onClick={postForm}
                    disabled={confirmation !== validation}
                    className={classNames({
                        active: true,
                    })}
                >
                    <FormattedMessage
                        defaultMessage="Delete story"
                        description="Delete story button label"
                    />
                </Button>
            </div>
        </div>
    );
};

StoryDeleteForm.propTypes = propTypes;
StoryDeleteForm.defaultProps = defaultProps;

export default StoryDeleteForm;
