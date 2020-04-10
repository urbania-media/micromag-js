/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as MicromagPropTypes from '../../PropTypes';
import { withModals } from '../../contexts/ModalsContext';

import styles from '../../styles/modals/modals.module.scss';

const propTypes = {
    modals: MicromagPropTypes.modals,
    modalsContainerRef: MicromagPropTypes.ref,
    className: PropTypes.string,
};

const defaultProps = {
    modals: [],
    modalsContainerRef: null,
    className: null,
};

const ModalsContainer = ({ modals, modalsContainerRef, className }) => (
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
                styles.modals,
                {
                    [styles.hasModals]: modals.length > 0,
                },
            ])}
            ref={modalsContainerRef}
        />
    </div>
);

ModalsContainer.propTypes = propTypes;
ModalsContainer.defaultProps = defaultProps;

export default withModals(ModalsContainer);
