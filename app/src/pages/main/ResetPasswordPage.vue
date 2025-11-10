<template>
  <div class="container">
    <div>
      <q-btn
        class="go-back-btn"
        icon="chevron_left"
        round
        flat
        color="primary"
        size="lg"
        @click="handleGoBack"
      />
    </div>
    <p class="title">Смена пароля</p>
    <Input
      v-model="password"
      :type="!showPassword ? 'password' : 'text'"
      class="q-mb-md"
      label="Пароль *"
      :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
      ><template v-slot:append>
        <q-icon
          :name="!showPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          color="font"
          size="xs"
          @click="showPassword = !showPassword"
        /> </template
    ></Input>
    <Input
      v-model="againPassword"
      :type="!showPasswordAgain ? 'password' : 'text'"
      class="q-mb-md"
      label="Повторите пароль *"
      :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
      ><template v-slot:append>
        <q-icon
          :name="!showPasswordAgain ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          color="font"
          size="xs"
          @click="showPasswordAgain = !showPasswordAgain"
        /> </template
    ></Input>
    <Button label="Сменить пароль" @click="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import useAuth from 'src/api/composables/useAuth';
import Button from 'src/components/Button.vue';
import Input from 'src/components/Input.vue';
import useValidation from 'src/composables/useValidation';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { resetPasswordApi } = useAuth();
const { t } = useI18n();
const { isPasswordValid } = useValidation();
const router = useRouter();
const route = useRoute();

const password = ref<string>('');
const againPassword = ref<string>('');
const showPassword = ref<boolean>(false);
const showPasswordAgain = ref<boolean>(false);

const handleSubmit = () => {
  if (password.value != againPassword.value) {
    Notify.create({ message: t('errors.passwordsNotSame'), color: 'negative', position: 'top' });
    return;
  }
  if (!isPasswordValid(password.value)) {
    Notify.create({ message: t('errors.passwordNotValid'), color: 'negative', position: 'top' });
    return;
  }
  resetPasswordApi({
    token: route.params.access_token as string,
    new_password: password.value,
  }).then(() => {
    router.replace('/profile');
  });
};

const handleGoBack = () => {
  router.replace('/profile');
};
</script>

<style lang="scss" scoped>
.text-font {
  color: $font !important;
}

.container {
  padding-left: 20vw;
  padding-right: 20vw;
  .title {
    font-size: var(--font-size-md);
    text-align: center;
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-sm);
  }

  .register-btn {
    font-size: var(--font-size-xs);
    width: fit-content !important;
    align-self: center;
    margin-top: var(--spacing-xs);
  }

  .go-back-btn {
    border-radius: 14px !important;
    background-color: $secondary-shade;
  }
}
</style>
