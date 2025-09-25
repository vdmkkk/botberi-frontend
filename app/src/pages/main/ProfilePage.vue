<template>
  <div v-if="!loading" class="container">
    <SecondaryButton class="logout-btn" label="Выйти" @click="handleLogout" />
    <div class="row containers">
      <div class="balance-container">
        <p>{{ $t('profile.balance') }}: {{ me?.balance }}₽</p>
        <div class="separator" />
        <div v-if="instances?.length == 0">
          <p>Агентов еще нет</p>
          <Button label="Создать" @click="goToShop" />
        </div>
        <div v-else class="column">
          <div class="agents-list">
            <div v-for="instance in instances" :key="instance.id" class="agent">
              <p>
                {{ instance.title }} - <b>{{ getInstanceCost(instance.bot_id) }}₽ / мес</b>
              </p>
            </div>
          </div>
          <p>
            Хватит на: <b>{{ getTimeLeft() }} дней(-я)</b>
          </p>
          <Button label="Пополнить баланс" />
        </div>
      </div>
      <div class="info-container column justify-between">
        <div class="column">
          <p>{{ me?.name }} {{ me?.surname }}</p>
          <p>{{ me?.email }}</p>
          <p>{{ me?.phone }}</p>
          <p v-if="me?.telegram">{{ me.telegram }}</p>
        </div>
        <div class="column">
          <SecondaryButton label="Сменить пароль" @click="handleChangePassword" />
          <SecondaryButton
            class="edit-btn"
            label="Редактировать данные"
            @click="handleChangeInfo"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container">
    <q-spinner-ios class="loading" color="secondary" size="40px" />
  </div>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import { BotOut, InstanceOut, UserOut } from 'src/api';
import useAuth from 'src/api/composables/useAuth';
import useBots from 'src/api/composables/useBots';
import useInstances from 'src/api/composables/useInstances';
import useUsers from 'src/api/composables/useUsers';
import Button from 'src/components/Button.vue';
import SecondaryButton from 'src/components/SecondaryButton.vue';
import useDialog from 'src/composables/useDialog';
import { NameDialog } from 'src/dialogs/dialogs';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { openDialog, $eventDialog } = useDialog();
const { logoutApi, forgotPasswordApi } = useAuth();
const { getMe } = useUsers();
const { getInstancesApi } = useInstances();
const { getBotsApi } = useBots();
const { t } = useI18n();

const me = ref<UserOut>();
const instances = ref<InstanceOut[]>([]);
const bots = ref<BotOut[]>([]);

const loading = ref<boolean>(false);

const handleLogout = () => {
  logoutApi();
};

const goToShop = () => {
  router.replace('/bots');
};

const getInstanceCost = (botId: number): number => {
  return (
    bots.value.find(({ id }) => {
      return botId == id;
    })?.rate || 0
  );
};

const getTimeLeft = () => {
  return Math.ceil(
    me.value!.balance /
      (instances.value.reduce(function (currentSum, instance) {
        return currentSum + getInstanceCost(instance.bot_id);
      }, 0) /
        30),
  );
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

const handleChangeInfo = () => {
  openDialog(NameDialog.editUserInfoDialog, { user: me.value });
};

const fetchUser = async () => {
  return await getMe().then((res) => {
    me.value = res;
  });
};

const fetchInstances = async () => {
  return await getInstancesApi().then((res) => {
    instances.value = res!;
  });
};

const fetchBots = async () => {
  return await getBotsApi().then((res) => {
    bots.value = res!;
  });
};

watch($eventDialog, ({ type, data, nameDialog }) => {
  if (type == 'update' && nameDialog == NameDialog.editUserInfoDialog) {
    me.value = { ...me.value, ...data.data };
  }
});

onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchUser(), fetchInstances(), fetchBots()]).finally(() => {
    loading.value = false;
  });
});
</script>

<style lang="scss" scoped>
.container {
  .containers {
    p {
      font-size: var(--font-size-sm);
    }
    gap: var(--spacing-sm);

    .balance-container {
      background-color: $secondary-shade;
      width: fit-content;
      padding: var(--spacing-sm);
      border-radius: 20px;

      .separator {
        width: 100%;
        height: 2px;
        background-color: $primary;
        margin-bottom: var(--spacing-sm);
      }

      .agents-list {
        margin-bottom: var(--spacing-md);
      }
    }

    .info-container {
      background-color: $secondary-shade;
      width: fit-content;
      padding: var(--spacing-sm);
      border-radius: 20px;
      width: max-content;
      display: flex;
      flex-direction: column;

      div {
        gap: var(--spacing-xs);
      }
      p {
        margin-bottom: 0;
      }
    }
  }
}

.edit-btn {
  width: max-content !important;
}

.logout-btn {
  position: absolute;
  top: calc(50px + var(--spacing-sm));
  right: var(--spacing-sm);
}
</style>
