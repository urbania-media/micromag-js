/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

import { getDisplayName } from '../../utils';
import Portal from './Portal';

import styles from '../../styles/panels/panel.module.css';

const propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node,
};

const Panel = ({ id = null, children = null, title = null }) => {
    const finalId = useMemo(() => id || getDisplayName(children.type), [id, children.type]);
    const data = useMemo(
        () => ({
            title,
        }),
        [title],
    );
    return (
        <Portal id={finalId} data={data}>
            <div className={styles.container}>{children}</div>
        </Portal>
    );
};

Panel.propTypes = propTypes;

export default Panel;
