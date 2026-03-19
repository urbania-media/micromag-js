import classNames from 'classnames';
import parseSRT from 'parse-srt';
import React, { useCallback, useEffect, useState } from 'react';

import type { BoxStyle, ClosedCaptionsMedia, TextStyle } from '@micromag/core';
import { getSecondsFromTime, getStyleFromBox } from '@micromag/core/utils';
import TextElement from '@micromag/element-text';

import styles from './styles.module.css';

interface ClosedCaptionsProps {
    media?: ClosedCaptionsMedia | null;
    currentTime?: number;
    timeOffset?: string | null;
    textStyle?: TextStyle | null;
    boxStyle?: BoxStyle | null;
    className?: string | null;
}

function ClosedCaptions({
    currentTime = 0,
    timeOffset = null,
    media = null,
    textStyle = null,
    boxStyle = null,
    className = null,
}: ClosedCaptionsProps) {
    const { url = null } = media || {};
    const [lines, setLines] = useState([]);
    const [lineIndex, setLineIndex] = useState(-1);

    const startOffset = timeOffset !== null ? timeOffset.split(/[\t ]*-->[\t ]*/) : null;
    const startSeconds =
        startOffset !== null && startOffset.length ? getSecondsFromTime(startOffset[0]) : 0;

    useEffect(() => {
        if (url === null) {
            return;
        }
        fetch(url, {
            mode: 'cors',
        })
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
    const finalBoxStyles = boxStyle !== null ? getStyleFromBox(boxStyle) : null;

    return (
        <div className={classNames([styles.container, className])}>
            {active ? (
                <div className={styles.captions} style={finalBoxStyles}>
                    <TextElement textStyle={textStyle} body={line.text} />
                </div>
            ) : null}
        </div>
    );
}

export default ClosedCaptions;
