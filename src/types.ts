export interface FieldAttribute {
  key: string;
  val: string | string[];
  note?: string;
}

export interface SubEntry {
  key: string;
  note?: string;
  val?: FieldAttribute[];
  // Backwards compatibility fields for legacy imports
  values?: FieldAttribute[];
  fields?: FieldAttribute[];
}

export interface Account {
  id: string;
  email: string;
  emailPassword: string;
  note?: string;
  subEntries: SubEntry[];
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export interface ConfirmModalOptions {
  title: string;
  message: string;
  confirmText?: string;
  alternativeText?: string;
  isDanger?: boolean;
}
