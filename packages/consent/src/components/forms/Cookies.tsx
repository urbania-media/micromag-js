/* eslint-disable react/jsx-props-no-spreading, indent */
import classNames from 'classnames';
import isString from 'lodash-es/isString';
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useConsent from '../../hooks/useConsent';

import PillButton from '../buttons/Pill';
import Checkbox from '../fields/Checkbox';
import Link from '../partials/Link';

import styles from '../../styles/forms/cookies.module.css';

interface CookiesProps {
    onChange?: (...args: unknown[]) => void;
    onSubmit?: (...args: unknown[]) => void;
    onClose?: (...args: unknown[]) => void;
    onClickLink?: (...args: unknown[]) => void;
    urls?: { privacy?: string };
    labels?: { title?: string; description?: string; privacy?: string };
    withoutChoices: boolean;
    titleId?: string;
    titleTag?: React.ElementType;
    className?: string;
}

function Cookies({
    onChange = null,
    onSubmit = null,
    onClose = null,
    onClickLink = null,
    urls = null,
    labels = null,
    withoutChoices = false,
    titleId = null,
    titleTag: TitleComponent = 'h2',
    className = null,
    ...props
}: CookiesProps) {
    const intl = useIntl();
    const {
        consent: choices,
        onClickChoice,
        onClickConfirm,
        onClickAccept,
        onClickDeny,
    } = useConsent({
        onChange,
        onSubmit,
        onClose,
    });

    const { privacy: privacyUrl = null, terms: termsUrl = null } = urls || {};
    const { title = null, description = null, privacy = null, terms = null } = labels || {};

    const baseId = useId();
    const finalTitleId = titleId || `${baseId}-title`;
    const choicesId = `${baseId}-choices`;

    const [showChoices, setShowChoices] = useState(false);

    // The button that opens the choices is replaced by the "save" one, so focus would be lost
    // on the body: move it into the newly revealed group instead
    const choicesRef = useRef(null);
    const focusChoicesRef = useRef(false);
    const onToggleTerms = useCallback(() => {
        focusChoicesRef.current = true;
        setShowChoices((wasShown) => !wasShown);
    }, [setShowChoices]);

    useEffect(() => {
        if (showChoices && focusChoicesRef.current && choicesRef.current !== null) {
            focusChoicesRef.current = false;
            choicesRef.current.focus();
        }
    }, [showChoices]);

    const onClickTerms = useCallback(() => {
        if (onClickLink !== null) {
            onClickLink('terms');
        }
    }, [onClickLink]);

    const onClickPrivacy = useCallback(() => {
        if (onClickLink !== null) {
            onClickLink('privacy');
        }
    }, [onClickLink]);

    return (
        <div className={classNames([styles.container, className])} {...props}>
            <div className={styles.top}>
                <TitleComponent id={finalTitleId} className={styles.title}>
                    {title || (
                        <FormattedMessage
                            defaultMessage="Your privacy settings"
                            description="Cookies title"
                        />
                    )}
                </TitleComponent>
                <p className={styles.description}>
                    {description || (
                        <FormattedMessage
                            defaultMessage="We use cookies to improve your experience on our site and for marketing purposes. By accepting, you consent to the use of these cookies."
                            description="Cookies message"
                        />
                    )}
                </p>
            </div>
            {/* Kept mounted so `aria-controls` always resolves; `hidden` removes it from the
                accessibility tree while collapsed */}
            <fieldset
                id={choicesId}
                ref={choicesRef}
                className={styles.choices}
                hidden={!showChoices}
                tabIndex={-1}
            >
                <legend className={styles.srOnly}>
                    {intl.formatMessage({
                        defaultMessage: 'Cookie preferences',
                        description: 'Fieldset label',
                    })}
                </legend>
                {(choices || []).map(
                    ({
                        id = null,
                        label = null,
                        value = false,
                        description: choiceDescription = null,
                        disabled = false,
                    }) => {
                        const choiceDescriptionId = `${baseId}-${id}-description`;
                        return (
                            <div className={styles.choice} key={`cookie-${id}`}>
                                <div className={styles.checkbox}>
                                    <Checkbox
                                        id={`${baseId}-${id}`}
                                        name={id}
                                        value={value}
                                        disabled={disabled}
                                        label={label}
                                        describedBy={
                                            choiceDescription !== null ? choiceDescriptionId : null
                                        }
                                        onClick={() => onClickChoice(id, !value)}
                                    />
                                </div>
                                <p className={styles.label} id={choiceDescriptionId}>
                                    {isString(choiceDescription) ? (
                                        choiceDescription
                                    ) : (
                                        <FormattedMessage {...choiceDescription} />
                                    )}
                                </p>
                            </div>
                        );
                    },
                )}
            </fieldset>
            {privacyUrl !== null ? (
                <div className={styles.more}>
                    <p className={styles.description}>
                        <Link
                            href={privacyUrl}
                            onClick={onClickPrivacy}
                            external={privacyUrl.indexOf('http') === 0}
                        >
                            {privacy || (
                                <FormattedMessage
                                    defaultMessage="Learn more about our privacy policy"
                                    description="Cookies message"
                                />
                            )}
                        </Link>
                    </p>
                </div>
            ) : null}
            {termsUrl !== null ? (
                <div className={styles.more}>
                    <p className={styles.description}>
                        <Link
                            href={termsUrl}
                            onClick={onClickTerms}
                            external={termsUrl.indexOf('http') === 0}
                        >
                            {terms || (
                                <FormattedMessage
                                    defaultMessage="Our terms and conditions"
                                    description="Cookies message"
                                />
                            )}
                        </Link>
                    </p>
                </div>
            ) : null}
            {!withoutChoices ? (
                <div className={styles.buttons}>
                    {showChoices ? (
                        <PillButton className={styles.button} onClick={onClickConfirm}>
                            <FormattedMessage
                                defaultMessage="Save my preferences"
                                description="Button label"
                            />
                        </PillButton>
                    ) : (
                        <PillButton
                            className={classNames([styles.button, styles.small])}
                            onClick={onToggleTerms}
                            aria-expanded={showChoices}
                            aria-controls={choicesId}
                        >
                            <FormattedMessage
                                defaultMessage="Edit my settings"
                                description="Button label"
                            />
                        </PillButton>
                    )}
                </div>
            ) : null}
            <div className={classNames([styles.buttons, styles.second])}>
                <PillButton className={styles.button} onClick={onClickAccept}>
                    <FormattedMessage defaultMessage="Accept all" description="Button label" />
                </PillButton>
                <PillButton className={styles.button} onClick={onClickDeny}>
                    <FormattedMessage defaultMessage="Reject all" description="Button label" />
                </PillButton>
            </div>
        </div>
    );
}

export default Cookies;
