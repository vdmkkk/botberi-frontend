<template>
  <Dialog ref="dialogRef" width="normal" @on-cancel="({ onDialogCancel }) => onDialogCancel()"
    ><div class="column">
      <p class="action-label">
        Вы уверены, что хотите <b>{{ actionLabel }}</b
        >?
      </p>
      <div class="row justify-center buttons">
        <SecondaryButton label="Отмена" @click="handleCancel" />
        <Button label="Подтвердить" @click="handleConfirm" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Button from 'src/components/Button.vue';
import Dialog from 'src/components/Dialog.vue';
import SecondaryButton from 'src/components/SecondaryButton.vue';
import { useTemplateRef } from 'vue';

const dialogRef = useTemplateRef('dialogRef');

const props = defineProps<{ actionLabel: string; confirmId: string; meta?: any }>();

const handleCancel = () => {
  dialogRef.value?.onDialogCancel();
};

const handleConfirm = () => {
  dialogRef.value?.onDialogOK({
    _action: 'update',
    data: { confirmId: props.confirmId, meta: props.meta },
  });
};
</script>

<style lang="scss" scoped>
.action-label {
  color: $font;
  font-size: var(--font-size-md);
  text-align: center;
  margin-bottom: var(--spacing-md);
}

.buttons {
  gap: var(--spacing-sm);
}
</style>
