<template>
  <div v-if="!loading" class="container">
    <SecondaryButton label="Выйти" @click="handleLogout" />
    <div class="balance-container">
      <p>{{ $t('profile.balance') }}: {{ me?.balance }}₽</p>
      <div v-if="instances?.length == 0">
        <p>Агентов еще нет</p>
        <Button label="Создать" @click="goToShop" />
      </div>
    </div>
    <div class="info-container">
      <p>{{ me?.name }} {{ me?.surname }}</p>
      <p>{{ me?.email }}</p>
      <p>{{ me?.phone }}</p>
      <p v-if="me?.telegram">{{ me.telegram }}</p>
      <SecondaryButton label="Сменить пароль" @click="handleChangePassword" />
      <SecondaryButton label="Редактировать данные" @click="handleChangeInfo" />
    </div>
  </div>
  <div v-else class="container">
    <q-spinner-ios class="loading" color="primary" size="40px" />
  </div>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import { InstanceOut, UserOut } from 'src/api';
import useAuth from 'src/api/composables/useAuth';
import useInstances from 'src/api/composables/useInstances';
import useUsers from 'src/api/composables/useUsers';
import Button from 'src/components/Button.vue';
import SecondaryButton from 'src/components/SecondaryButton.vue';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { logoutApi, forgotPasswordApi } = useAuth();
const { getMe } = useUsers();
const { getInstancesApi } = useInstances();
const { t } = useI18n();

const me = ref<UserOut>();
const instances = ref<InstanceOut[]>();

const loading = ref<boolean>(false);

const handleLogout = () => {
  logoutApi();
};

const goToShop = () => {
  router.replace('/bots');
};

const handleChangePassword = () => {
  forgotPasswordApi({ email: me.value!.email }).then(() => {
    Notify.create({
      message: t('notification.linkSent'),
      type: 'positive',
      position: 'top',
      timeout: 5000,
    });
  });
};

const handleChangeInfo = () => {};

const fetchUser = async () => {
  return await getMe().then((res) => {
    me.value = res;
  });
};

const fetchInstances = async () => {
  return await getInstancesApi().then((res) => {
    instances.value = res;
  });
};

onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchUser(), fetchInstances()]).finally(() => {
    loading.value = false;
  });
});
</script>

<style lang="scss" scoped>
.container {
}
</style>
