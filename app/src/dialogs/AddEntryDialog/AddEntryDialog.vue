<template>
  <Dialog ref="dialogRef" width="narrow" @on-cancel="({ onDialogCancel }) => onDialogCancel()"
    ><div class="column">
      <p class="title">Добавить запись</p>
      <q-form @submit="handleSubmit" class="column">
        <input ref="inputRef" type="file" accept=".pdf" style="display: none" @change="onChange" />
        <Select class="selector" v-model="type" :options="options" map-options />
        <Select class="selector" v-model="lang" :options="langOptions" map-options />
        <Input
          v-if="type.value == KBDataType.Video"
          v-model="link"
          type="text"
          class="q-mb-md"
          label="Ссылка"
          :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
        />
        <div v-else-if="type.value == KBDataType.Document">
          <q-tabs class="tabs" no-caps v-model="tab">
            <q-tab name="file" label="Загрузить файл" />
            <q-tab name="link" label="Ссылка" />
          </q-tabs>
          <div v-if="tab == 'file'">
            <SecondaryButton label="Прикрепить файл" @click="openPicker" />
            <p v-if="file" class="file-name">{{ file.name }}</p>
          </div>
          <div v-else-if="tab == 'link'">
            <Input
              v-model="link"
              type="text"
              class="q-mb-md"
              label="Ссылка на документ"
              :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
            />
          </div>
        </div>
        <Button class="submit-btn" label="Добавить" type="submit" :disable="loading" />
      </q-form>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import moment from 'moment';
import { Notify } from 'quasar';
import { KBDataType, KBLangHint } from 'src/api';
import Button from 'src/components/Button.vue';
import Dialog from 'src/components/Dialog.vue';
import Input from 'src/components/Input.vue';
import SecondaryButton from 'src/components/SecondaryButton.vue';
import Select from 'src/components/Select.vue';
import useAssets from 'src/composables/useAssets';
import { computed, ref, useTemplateRef, watch } from 'vue';

const dialogRef = useTemplateRef('dialogRef');
const inputRef = useTemplateRef('inputRef');
const { uploadAsset } = useAssets();

type InferArray<T extends any[]> = T extends (infer U)[] ? U : never;

const options = [
  { value: KBDataType.Video, label: 'Видео' },
  { value: KBDataType.Document, label: 'Документ' },
];

const langOptions = Object.values(KBLangHint).map((key) => {
  return {
    value: key,
    label: key,
  };
});

const tab = ref<'file' | 'link'>('file');
const type = ref<InferArray<typeof options>>(options[0]);
const lang = ref<InferArray<typeof langOptions>>(langOptions[0]);

const link = ref<string>();

const file = ref<File | null>();

const loading = ref<boolean>(false);

function openPicker() {
  inputRef.value?.click();
}

function onChange(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0] || null;
  if (!f) {
    return;
  }
  file.value = f;

  //   const fileName = `${instance.value?.instance_id}.avatar.${ext}`;
  (e.target as HTMLInputElement).value = '';
}

watch(
  [tab, type],
  () => {
    link.value = '';
    file.value = null;
  },
  { deep: true },
);

const handleSubmit = async () => {
  let content;
  if (type.value.value == KBDataType.Video) {
    content = link.value;
  } else if (type.value.value == KBDataType.Document) {
    if (tab.value == 'link') {
      content = link.value;
    } else if (tab.value == 'file') {
      const ext = file.value!.name.split('.').pop()?.toLowerCase() || 'pdf';
      const fileName = `${file.value!.name.split('.')[0]}---${moment().unix()}.${ext}`;
      await uploadAsset('kb-files', fileName, file.value!)
        .then((res) => {
          if (res.$metadata?.httpStatusCode === 200) {
            content = `s3://kb-files/${fileName}`;
          }
        })
        .catch((err) => {
          dialogRef.value?.onDialogCancel();
          Notify.create({
            message: 'Произошла ошибка при загрузке файла',
            type: 'negative',
            position: 'top',
            timeout: 5000,
          });
          return;
        });
    }
  }
  dialogRef.value?.onDialogOK({
    _action: 'update',
    data: { data_type: type.value.value, content, lang_hint: lang.value.value },
  });
};
</script>

<style lang="scss" scoped>
.selector {
  margin-bottom: var(--spacing-sm);
}

.title {
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-sm);
}

.file-name {
  margin-top: var(--spacing-xs);
}

p {
  color: $font;
}

.submit-btn {
  margin-top: var(--spacing-xs);
  justify-self: center !important;
}

.tabs {
  border-bottom: 1px $secondary inset;
  margin-bottom: var(--spacing-sm);
  width: 100%;
  color: $font;
}

.tabs ::v-deep .q-tabs__content {
  justify-content: flex-start !important;
}
</style>
