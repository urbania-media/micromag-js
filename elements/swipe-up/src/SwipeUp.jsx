/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessage, useIntl } from 'react-intl';
import { useDrag } from 'react-use-gesture';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Button } from '@micromag/core/components';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    elRef: PropTypes.shape({
        current: PropTypes.node,
    }),
    disabled: PropTypes.bool,
    link: MicromagPropTypes.swipeUpLink,
    dragAmount: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    elRef: null,
    disabled: false,
    link: null,
    dragAmount: 100,
    className: null,
};

const SwipeUp = ({ elRef, disabled, link, dragAmount, className }) => {
    const intl = useIntl();
    const { active = false, url = null, label = null, tapOnly = false } = link || {};

    const defaultLabel = intl.formatMessage(
        defineMessage({ defaultMessage: 'Learn more', description: 'Swipe up default label' }),
    );
    const finalLabelProps = { ...{ body: defaultLabel }, ...label };
    const { textStyle: { fontSize = null } = {}} = finalLabelProps || {};

    const onNavigateLink = useCallback(() => {
        // window.open(url, '_blank');
        Object.assign(document.createElement('a'), {
            target: '_blank',
            href: url,
        }).click();
    }, [url]);

    const bindDrag = useDrag(
        ({ movement: [,my], cancel, canceled, tap }) => {
            if (canceled || tap) {
                return;
            }

            if (my < -dragAmount) {
                cancel();
                onNavigateLink();
            }
        },
        { enabled: !tapOnly && !disabled, filterTaps: true },
    );    

    return active ? (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.disabled]: disabled,
                },
            ])}
            ref={elRef}
        >
            <Button className={styles.button} onClick={onNavigateLink} {...bindDrag()} withoutStyle>
                {!tapOnly ? <FontAwesomeIcon className={styles.arrow} style={{ fontSize }}icon={faChevronUp} /> : null}
                <div className={styles.label}>
                    <Text {...finalLabelProps} />
                </div>
            </Button>
        </div>
    ) : null;
};

SwipeUp.propTypes = propTypes;
SwipeUp.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <SwipeUp elRef={ref} {...props} />);
