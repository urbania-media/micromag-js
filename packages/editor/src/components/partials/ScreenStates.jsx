/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';
import { useUrlGenerator, useRoutePush } from '@micromag/core/contexts';
import useRouteParams from '../../hooks/useRouteParams';
import useScreenStates from '../../hooks/useScreenStates';
import styles from '../../styles/partials/screen-states.module.scss';
import ScreenWithPreview from '../buttons/ScreenWithPreview';

const propTypes = {
    screen: MicromagPropTypes.screen.isRequired,
    screenState: PropTypes.string,
    value: MicromagPropTypes.story.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    screenState: null,
    className: null,
    onChange: null,
};

function ScreenStates({ screen, value, className, onChange }) {
    const url = useUrlGenerator();
    const push = useRoutePush();
    const { screen: screenParam = null, field = null } = useRouteParams();
    const states = useScreenStates(screen);
    const [stateParam = null, stateIndex = null] = field !== null ? field.split('/') : [];
    const currentState =
        stateParam !== null && states.findIndex(({ id }) => id === stateParam) !== -1
            ? stateParam
            : null;
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className="d-flex align-items-end mx-n1">
                <div className="px-1 align-self-stretch d-flex flex-column">
                    <h6 className="small fw-normal invisible">Settings</h6>
                    <Button
                        className={classNames([
                            styles.button,
                            'p-0',
                            'flex-grow-1',
                            'justify-content-center',
                        ])}
                        theme={screenParam !== null && field === null ? 'primary' : 'secondary'}
                        outline={screenParam === null || field !== null}
                        size="lg"
                        icon={<FontAwesomeIcon icon={faCog} />}
                        href={url('screen', {
                            screen: screen.id,
                        })}
                    />
                </div>

                {states.map((state) => {
                    const { id, label = null, repeatable = false, fieldName = null } = state;
                    const repeatableItems = repeatable ? screen[fieldName || id] || [] : null;
                    const onClickAdd = () => {
                        const { components: currentComponentsValue = [] } = value || {};
                        const currentScreenIndex = currentComponentsValue.findIndex(
                            ({ id: screenId }) => screen.id === screenId,
                        );
                        const currentScreenValue = currentComponentsValue[currentScreenIndex] || {};
                        const currentFieldValue = currentScreenValue[fieldName || id] || [];
                        const newValue = {
                            ...value,
                            components: [
                                ...currentComponentsValue.slice(0, currentScreenIndex),
                                {
                                    ...currentScreenValue,
                                    [fieldName || id]: [...currentFieldValue, {}],
                                },
                                ...currentComponentsValue.slice(currentScreenIndex + 1),
                            ],
                        };
                        if (onChange !== null) {
                            onChange(newValue);
                        }
                        push('screen.field', {
                            screen: screen.id,
                            field: [id, currentFieldValue.length],
                        });
                    };
                    return (
                        <div className="px-1 align-self-stretch d-flex flex-column">
                            <h6 className="small fw-normal">
                                <FormattedMessage {...label} />
                            </h6>
                            {repeatable ? (
                                <ul className="d-flex list-unstyled m-0 flex-grow-1">
                                    {repeatableItems.map((item, index) => (
                                        <li className="me-2">
                                            <ScreenWithPreview
                                                screen={screen}
                                                screenState={`${id}.${index}`}
                                                className={styles.button}
                                                active={
                                                    currentState !== null &&
                                                    id === currentState.split('.')[0] &&
                                                    stateIndex !== null &&
                                                    parseInt(stateIndex, 10) === index
                                                }
                                                href={url('screen.field', {
                                                    screen: screen.id,
                                                    field: [id, index],
                                                })}
                                            />
                                        </li>
                                    ))}
                                    <li>
                                        <Button
                                            className={classNames([
                                                styles.button,
                                                styles.addButton,
                                                'h-100',
                                                'p-0',
                                                'justify-content-center',
                                            ])}
                                            theme="secondary"
                                            outline
                                            size="lg"
                                            icon={<FontAwesomeIcon icon={faPlus} />}
                                            onClick={onClickAdd}
                                        />
                                    </li>
                                </ul>
                            ) : (
                                <ScreenWithPreview
                                    screen={screen}
                                    screenState={id}
                                    className={styles.button}
                                    active={id === currentState}
                                    href={url('screen.field', {
                                        screen: screen.id,
                                        field: id,
                                    })}
                                    // onClick={() => {
                                    //     if (onStateChange !== null) {
                                    //         onStateChange(id);
                                    //     }
                                    // }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

ScreenStates.propTypes = propTypes;
ScreenStates.defaultProps = defaultProps;

export default ScreenStates;