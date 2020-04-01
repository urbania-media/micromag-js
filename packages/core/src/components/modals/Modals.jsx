/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as MicromagPropTypes from '../../PropTypes';
import { withModals } from '../../contexts/ModalsContext';
import { useComponents } from '../../contexts/ComponentsContext';
import getComponentFromName from '../../utils/getComponentFromName';
import { MODALS_NAMESPACE } from '../namespaces';

import styles from '../../styles/modals/modals.module.scss';

const propTypes = {
    modals: MicromagPropTypes.modals.isRequired,
    modalsComponents: MicromagPropTypes.components,
    closeModal: PropTypes.func.isRequired,
    updateModal: PropTypes.func.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    modalsComponents: null,
    className: null,
};

const ModalsContainer = ({ modals, updateModal, closeModal, className, modalsComponents }) => {
    const contextComponents = useComponents(MODALS_NAMESPACE);
    const finalComponents = modalsComponents || contextComponents;
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
                    styles.modals,
                    {
                        [styles.hasModals]: modals.length > 0,
                    },
                ])}
            >
                {modals.map(({ name, props, position = 'center' }) => {
                    const Modal = getComponentFromName(name, finalComponents);
                    return Modal !== null ? (
                        <div
                            key={`modal-${name}`}
                            className={classNames([
                                styles.modal,
                                {
                                    [styles[position]]: position !== null,
                                },
                            ])}
                        >
                            <div className={styles.inner}>
                                <Modal
                                    key={`modal-${name}`}
                                    {...props}
                                    closeModal={() => closeModal(name)}
                                    updateModal={modalProps => updateModal(name, modalProps)}
                                />
                            </div>
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
};

ModalsContainer.propTypes = propTypes;
ModalsContainer.defaultProps = defaultProps;

export default withModals(ModalsContainer);
