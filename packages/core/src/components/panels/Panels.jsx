/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '../../lib';
import { withPanels } from '../../contexts';

import styles from '../../styles/panels/panels.module.css';

const propTypes = {
    panels: MicromagPropTypes.panels,
    setPanelsContainer: PropTypes.func,
    className: PropTypes.string,
};

const PanelsContainer = ({ panels = [], setPanelsContainer = null, className = null }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        setPanelsContainer(containerRef.current);
    }, []);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <div
                className={classNames([
                    styles.panels,
                    {
                        [styles.hasPanels]: panels.length > 0,
                    },
                ])}
                ref={containerRef}
            />
        </div>
    );
};

PanelsContainer.propTypes = propTypes;

export default withPanels(PanelsContainer);
