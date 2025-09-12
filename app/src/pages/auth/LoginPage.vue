<template>
  <div class="container">
    <p class="title">Вход в BotBeri</p>
    <Input v-model="login" type="email" class="q-mb-md" label="Эл. Почта" />
    <Input
      v-model="password"
      :type="!showPassword ? 'password' : 'text'"
      class="q-mb-md"
      label="Пароль"
      ><template v-slot:append>
        <q-icon
          :name="!showPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          color="font"
          size="xs"
          @click="showPassword = !showPassword"
        /> </template
    ></Input>
    <Button label="Войти" @click="handleLogin" />
    <q-btn
      class="register-btn"
      flat
      rounded
      label="Нет аккаунта? Зарегистрироваться"
      no-caps
      @click="handleRegister"
    />
  </div>
</template>

<script setup lang="ts">
import useAuth from 'src/api/composables/useAuth';
import Button from 'src/components/Button.vue';
import Input from 'src/components/Input.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { loginApi } = useAuth();
const router = useRouter();

const login = ref<string>('');
const password = ref<string>('');
const showPassword = ref<boolean>(false);

const handleLogin = () => {
  loginApi({ email: login.value, password: password.value });
};

const handleRegister = () => {
  router.replace('/auth/register');
};
</script>

<style lang="scss" scoped>
.text-font {
  color: $font !important;
}

.container {
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
}
</style>
