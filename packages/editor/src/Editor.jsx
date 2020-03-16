import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const propTypes = {
    test: PropTypes.string,
};

const defaultProps = {
    test: 'allo',
};

const Editor = () => (
    <div className={styles.container}>Editor</div>
);

Editor.propTypes = propTypes;
Editor.defaultProps = defaultProps;

export default Editor;
