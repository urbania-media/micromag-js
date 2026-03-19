import { ReactNode } from "react";
import { MessageDescriptor } from "react-intl";

export type Text = MessageDescriptor | ReactNode;

export type Label = MessageDescriptor | ReactNode;

export type Target = '_blank' | '_self' | '_parent';
