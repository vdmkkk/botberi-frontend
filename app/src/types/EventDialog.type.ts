import { NameDialog } from 'src/dialogs/dialogs';

export type EventDialogType = {
  type: 'open' | 'ok' | 'cancel' | 'destroy' | 'update' | 'create';
  nameDialog: NameDialog;
  data?: any;
};
