<template>
  <div class="container">
    <div v-if="!awaitingCode" class="column">
      <p class="title">Регистрация в BotBeri</p>
      <q-form @submit="handleRegister" class="column">
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
          v-model="login"
          type="email"
          class="q-mb-md"
          label="Эл. Почта *"
          :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
        />
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
        <Input
          v-model="phone"
          type="phone"
          class="q-mb-md"
          label="Телефон *"
          :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
        />
        <Input v-model="tgAccount" type="text" class="q-mb-md" label="Аккаунт в Telegram" />
        <Button label="Зарегистрироваться" type="submit" />
      </q-form>
      <q-btn
        class="register-btn"
        flat
        rounded
        label="Уже есть аккаунт? Войти"
        no-caps
        @click="handleLogin"
      />
    </div>
    <div v-else class="column code-confirm">
      <p class="title">Регистрация в BotBeri</p>
      <p class="description">
        Код подтверждения отправлен на эл. почту <b>{{ login }}</b>
      </p>
      <Input v-model="code" label="Код подтверждения" class="q-mb-md" type="text" />
      <div class="row justify-between">
        <SecondaryButton class="go-back" label="Назад" @click="handleGoBack" />
        <Button label="Подтвердить" @click="handleConfirmEmail" />
      </div>
      <q-btn
        v-if="codeTimer > 0"
        class="register-btn"
        flat
        rounded
        disable
        :label="`Запросить код повторно через ${codeTimer} секунд`"
        no-caps
      />
      <q-btn
        v-else
        class="register-btn"
        flat
        rounded
        :label="`Запросить код повторно`"
        no-caps
        @click="handleRequestCodeAgain"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import useAuth from 'src/api/composables/useAuth';
import Button from 'src/components/Button.vue';
import Input from 'src/components/Input.vue';
import SecondaryButton from 'src/components/SecondaryButton.vue';
import useValidation from 'src/composables/useValidation';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { registerApi, confirmEmailApi } = useAuth();
const router = useRouter();
const { t } = useI18n();
const { isPasswordValid, isPhoneValid } = useValidation();

const name = ref<string>('');
const lastName = ref<string>('');
const login = ref<string>('');
const password = ref<string>('');
const againPassword = ref<string>('');
const phone = ref<string>('');
const tgAccount = ref<string>('');

const showPassword = ref<boolean>(false);
const showPasswordAgain = ref<boolean>(false);

const awaitingCode = ref(false);
const code = ref<string>('');
const codeTimer = ref<number>(60);

const handleRequestCode = () => {
  registerApi({
    email: login.value,
    password: password.value,
    name: name.value,
    surname: lastName.value,
    phone: phone.value,
    telegram: tgAccount.value,
  }).then(() => {
    awaitingCode.value = true;
    codeTimer.value = 60;
  });
};

const handleRegister = () => {
  if (password.value != againPassword.value) {
    Notify.create({ message: t('errors.passwordsNotSame'), color: 'negative', position: 'top' });
    return;
  }
  if (!isPasswordValid(password.value)) {
    Notify.create({ message: t('errors.passwordNotValid'), color: 'negative', position: 'top' });
    return;
  }
  if (!isPhoneValid(phone.value)) {
    Notify.create({ message: t('errors.phoneNotValid'), color: 'negative', position: 'top' });
    return;
  }
  handleRequestCode();
};

const handleLogin = () => {
  router.replace('/auth');
};

const handleConfirmEmail = () => {
  confirmEmailApi({ email: login.value, code: code.value });
};

const handleRequestCodeAgain = () => {
  handleRequestCode();
};

const handleGoBack = () => {
  awaitingCode.value = false;
  codeTimer.value = 60;
};

onMounted(() => {
  setInterval(() => {
    if (codeTimer.value > 0 && awaitingCode.value == true) {
      codeTimer.value -= 1;
    }
  }, 1000);
});
</script>

<style lang="scss" scoped>
.text-font {
  color: $font !important;
}

.container {
  .title {
    font-size: var(--font-size-md);
    text-align: center;
    margin-top: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
  }

  .register-btn {
    font-size: var(--font-size-xs);
    width: fit-content !important;
    align-self: center;
    margin-top: var(--spacing-xs);
  }
}

.code-confirm {
  .title {
    margin-top: var(--spacing-xl) !important;
  }

  .go-back {
  }
}
</style>
