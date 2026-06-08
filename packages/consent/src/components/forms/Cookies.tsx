/* eslint-disable react/jsx-props-no-spreading, indent */
import classNames from 'classnames';
import isString from 'lodash-es/isString';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import useConsent from '../../hooks/useConsent';

import PillButton from '../buttons/Pill';
import Checkbox from '../fields/Checkbox';
import Link from '../partials/Link';

import styles from '../../styles/forms/cookies.module.css';

interface CookiesProps {
    urls?: { privacy?: string };
    labels?: { title?: string; description?: string; privacy?: string };
    onChange?: (...args: unknown[]) => void;
    onSubmit?: (...args: unknown[]) => void;
    onClose?: (...args: unknown[]) => void;
    onClickLink?: (...args: unknown[]) => void;
    className?: string;
}

function Cookies({
    onChange = null,
    onSubmit = null,
    onClose = null,
    onClickLink = null,
    urls = null,
    labels = null,
    className = null,
    ...props
}: CookiesProps) {
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

    const [showChoices, setShowChoices] = useState(false);
    const onToggleTerms = useCallback(() => {
        setShowChoices(!showChoices);
    }, [showChoices, setShowChoices]);

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
        <div
            className={classNames([styles.container, className])}
            {...props}
        >
            <div className={styles.top}>
                <h3 className={styles.title}>
                    {title || (
                        <FormattedMessage
                            defaultMessage="Your privacy settings"
                            description="Cookies title"
                        />
                    )}
                </h3>
                <p className={styles.description}>
                    {description || (
                        <FormattedMessage
                            defaultMessage="We use cookies to improve your experience on our site and for marketing purposes. By accepting, you consent to the use of these cookies."
                            description="Cookies message"
                        />
                    )}
                </p>
            </div>
            {showChoices
                ? (choices || []).map(
                      ({
                          id = null,
                          label = null,
                          value = false,
                          description: choiceDescription = null,
                          disabled = false,
                      }) => (
                          <div className={styles.choice} key={`cookie-${id}`}>
                              <div className={styles.checkbox}>
                                  <Checkbox
                                      value={value}
                                      disabled={disabled}
                                      label={label}
                                      onClick={() => onClickChoice(id, !value)}
                                  />
                              </div>
                              <p className={styles.label}>
                                  {isString(choiceDescription) ? (
                                      choiceDescription
                                  ) : (
                                      <FormattedMessage {...choiceDescription} />
                                  )}
                              </p>
                          </div>
                      ),
                  )
                : null}
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
            <div className={styles.buttons}>
                {showChoices ? (
                    <PillButton className={styles.button} onClick={onClickConfirm} small>
                        <FormattedMessage
                            defaultMessage="Save my preferences"
                            description="Button label"
                        />
                    </PillButton>
                ) : (
                    <PillButton
                        className={classNames([styles.button, styles.small])}
                        onClick={onToggleTerms}
                        small
                    >
                        <FormattedMessage
                            defaultMessage="Edit my settings"
                            description="Button label"
                        />
                    </PillButton>
                )}
            </div>
            <div className={classNames([styles.buttons, styles.second])}>
                <PillButton className={styles.button} onClick={onClickAccept} small>
                    <FormattedMessage defaultMessage="Accept all" description="Button label" />
                </PillButton>
                <PillButton className={styles.button} onClick={onClickDeny} small>
                    <FormattedMessage defaultMessage="Reject all" description="Button label" />
                </PillButton>
            </div>
        </div>
    );
}

export default Cookies;
