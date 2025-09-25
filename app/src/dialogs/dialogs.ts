import { Component } from 'vue';
import EditUserInfoDialog from './EditUserInfoDialog/EditUserInfoDialog.vue';
import AddEntryDialog from './AddEntryDialog/AddEntryDialog.vue';
import EditAgentDialog from './EditAgentDialog/EditAgentDialog.vue';
import ConfirmActionDialog from './ConfirmActionDialog/ConfirmActionDialog.vue';

export enum NameDialog {
  'editUserInfoDialog' = 'editUserInfoDialog',
  'editAgentDialog' = 'editAgentDialog',
  'addEntryDialog' = 'addEntryDialog',
  'confirmActionDialog' = 'confirmActionDialog',
}

export const dialogs: { [key in NameDialog]: Component } = {
  [NameDialog.editUserInfoDialog]: EditUserInfoDialog,
  [NameDialog.addEntryDialog]: AddEntryDialog,
  [NameDialog.editAgentDialog]: EditAgentDialog,
  [NameDialog.confirmActionDialog]: ConfirmActionDialog,
};
