<template>
  <Dialog ref="dialogRef" width="narrow" @on-cancel="({ onDialogCancel }) => onDialogCancel()"
    ><div class="column">
      <q-form @submit="handleChange">
        <Input
          v-model="name"
          type="text"
          class="q-mb-md"
          label="Имя *"
          :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
        />
        <Input
          v-model="lastName"
          type="text"
          class="q-mb-md"
          label="Фамилия *"
          :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
        />
        <Input
          v-model="phone"
          type="phone"
          class="q-mb-md"
          label="Телефон *"
          :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
        />
        <Input v-model="tgAccount" type="text" class="q-mb-md" label="Аккаунт в Telegram" />
        <Button label="Изменить" type="submit" />
      </q-form>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import { UserOut } from 'src/api';
import useUsers from 'src/api/composables/useUsers';
import Button from 'src/components/Button.vue';
import Dialog from 'src/components/Dialog.vue';
import Input from 'src/components/Input.vue';
import useValidation from 'src/composables/useValidation';
import { ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { isPhoneValid } = useValidation();
const { updateMe } = useUsers();

const dialogRef = useTemplateRef('dialogRef');

const { user } = defineProps<{ user: UserOut }>();

const name = ref<string>(user.name);
const lastName = ref<string>(user.surname);
const phone = ref<string>(user.phone);
const tgAccount = ref<string>(user.telegram || '');

const handleChange = () => {
  if (!isPhoneValid(phone.value)) {
    Notify.create({ message: t('errors.phoneNotValid'), color: 'negative', position: 'top' });
    return;
  }
  const data = {
    name: name.value,
    surname: lastName.value,
    phone: phone.value,
    telegram: tgAccount.value,
  };
  updateMe(data).then(() => {
    dialogRef.value?.onDialogOK({ _action: 'update', data });
  });
};
</script>
