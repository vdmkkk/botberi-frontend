<template>
  <q-dialog ref="dialogRef" full-width @hide="onDialogHide">
    <div
      :class="{
        dialog: true,
        'is-wide': width == 'wide',
        'is-normal': width == 'normal',
        'is-narrow': width == 'narrow',
        'is-full-height': fullHeight,
      }"
    >
      <q-btn class="close" flat round @click="onDialogHide">
        <img :src="close" />
      </q-btn>
      <slot />
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import close from '../assets/icons/close.svg';
import DialogEventType from 'src/types/DialogEvent.type';

withDefaults(
  defineProps<{
    width?: 'wide' | 'normal' | 'narrow';
    fullHeight?: boolean;
  }>(),
  { width: 'wide', fullHeight: false },
);

const emits = defineEmits(['onOk', 'onCancel', 'onDestroy', 'onClickFullscreen']);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const dialogEvents: DialogEventType<any> = {
  onDialogHide,
  onDialogCancel,
  onDialogOK,
};

defineExpose(dialogEvents);

function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK();
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>

<style lang="scss" scoped>
.dialog {
  background-color: $background;
  padding: var(--spacing-md);
  position: relative;

  .close {
    position: absolute;
    top: var(--spacing-xs);
    right: var(--spacing-xs);

    width: 20px;
    height: 20px;

    img {
      width: 20px;
      height: 20px;
    }
  }
}

.is-wide {
  width: 80vw !important;
}

.is-normal {
  width: 60vw !important;
}

.is-narrow {
  width: 40vw !important;
}

.is-full-height {
  height: 80vh !important;
}
</style>
