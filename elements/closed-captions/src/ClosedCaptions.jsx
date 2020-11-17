/* eslint-disable react/no-danger */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import parseSRT from 'parse-srt';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getSecondsFromTime } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.subtitlesMedia,
    currentTime: PropTypes.number, // in seconds
    timeOffset: PropTypes.string, // in srt time format (10:00:01,034)
    className: PropTypes.string,
};

const defaultProps = {
    media: null,
    currentTime: 0,
    timeOffset: null,
    className: null,
};

const ClosedCaptions = ({ currentTime, timeOffset, media, className }) => {
    const { url = null } = media || {};
    const [lines, setLines] = useState([]);
    const [lineIndex, setLineIndex] = useState(-1);

    const startOffset = timeOffset !== null ? timeOffset.split(/[\t ]*-->[\t ]*/) : null;
    const startSeconds = startOffset !== null && startOffset.length ? getSecondsFromTime(startOffset[0]) : 0;

    useEffect(() => {
        if (url === null) {
            return;
        }
        fetch(url)
            .then((response) => response.text())
            .then((srt) => parseSRT(srt))
            .then((parsed) => {
                setLines(parsed);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [url, fetch, setLines]);

    const getLineIndexFromTime = useCallback(
        (t) => {
            const currentLineIndex = lines.findIndex(
                (line) => t >= line.start - startSeconds && t <= line.end - startSeconds,
            );
            return currentLineIndex;
        },
        [lines, startSeconds],
    );

    useEffect(() => {
        if (lines.length > 0) {
            const nextLineIndex = getLineIndexFromTime(currentTime);
            if (nextLineIndex !== lineIndex) {
                setLineIndex(nextLineIndex);
            }
        }
    }, [currentTime, lines, getLineIndexFromTime, setLineIndex]);

    const line = lineIndex !== -1 ? lines[lineIndex] : null;
    const active = line !== null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            { active ? <div className={styles.captions} dangerouslySetInnerHTML={active? { __html: line.text } : null} /> : null }
        </div>
    );
};

ClosedCaptions.propTypes = propTypes;
ClosedCaptions.defaultProps = defaultProps;

export default ClosedCaptions;
