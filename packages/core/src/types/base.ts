import { ReactNode } from 'react';
import { MessageDescriptor } from 'react-intl';

export type Message = MessageDescriptor;

export type Text = Message | ReactNode;

export type Label = Message | ReactNode;

export type Target = '_blank' | '_self' | '_parent';
