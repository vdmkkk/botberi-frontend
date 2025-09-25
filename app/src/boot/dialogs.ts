import { App, ref } from 'vue';
import { EventDialogType } from '../types/EventDialog.type';
import { boot } from 'quasar/wrappers';

function initDialogEvent(app: App) {
  const eventDialogRef = ref<EventDialogType>(null);
  app.provide('eventDialog', eventDialogRef);
}

export default boot(({ app }) => {
  initDialogEvent(app);
});
