import { useQuasar } from 'quasar';
import { dialogs, NameDialog } from 'src/dialogs/dialogs';
import { EventDialogType } from '../types/EventDialog.type';
import { inject, Ref } from 'vue';

export default function useDialog() {
  const $q = useQuasar();
  const $eventDialog = inject('eventDialog') as Ref<EventDialogType>;

  const openDialog = (nameDialog: NameDialog, params?: any) => {
    const dialog = $q.dialog({
      component: dialogs[nameDialog],
      componentProps: params,
    });
    $eventDialog.value = { type: 'open', nameDialog, data: params };
    return dialog
      .onOk((data) => {
        $eventDialog.value = {
          type: !!data?.destroy ? 'destroy' : data._action,
          nameDialog,
          data,
        };
      })
      .onCancel(() => {
        $eventDialog.value = { type: 'cancel', nameDialog };
      });
  };

  return { openDialog, $eventDialog };
}
