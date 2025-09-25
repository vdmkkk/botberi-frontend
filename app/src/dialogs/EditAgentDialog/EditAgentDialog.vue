<template>
  <Dialog ref="dialogRef" width="normal" @on-cancel="({ onDialogCancel }) => onDialogCancel()"
    ><div class="column">
      <q-form @submit="handleUpdate" class="column">
        <p class="title">Редактировать информацию</p>
        <Input
          v-model="name"
          :label="$t('create_agent.name')"
          :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
        />
        <Input
          v-model="description"
          :label="$t('create_agent.description')"
          :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
        />
        <component :vars="vars" :is="varsComponents[instance.bot_id]" />
        <Button label="Создать" type="submit" />
      </q-form>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { InstanceOut } from 'src/api';
import useInstances from 'src/api/composables/useInstances';
import WBReviewsBotVars from 'src/components/bots-vars/WBReviewsBot.vars.vue';
import Button from 'src/components/Button.vue';
import Dialog from 'src/components/Dialog.vue';
import Input from 'src/components/Input.vue';
import { ref, useTemplateRef } from 'vue';

const varsComponents = {
  '1': WBReviewsBotVars,
};

const dialogRef = useTemplateRef('dialogRef');

const { instance } = defineProps<{ instance: InstanceOut }>();

const { updateInstance } = useInstances();

const name = ref<string>(instance.title);
const description = ref<string>(instance.config.description);
const vars = ref(instance.config);

const handleUpdate = () => {
  const data = {
    title: name.value,
    config: vars.value,
  };
  updateInstance(instance.id, data).then(() => {
    dialogRef.value?.onDialogOK({ _action: 'update', data });
  });
};
</script>

<style lang="scss" scoped>
.title {
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-sm);
  color: $font;
}
</style>
