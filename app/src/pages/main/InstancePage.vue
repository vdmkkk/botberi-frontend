<template>
  <div class="container" v-if="!loading">
    <input
      ref="inputRef"
      type="file"
      accept=".png,.jpg,.jpeg"
      style="display: none"
      @change="onChange"
    />
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

    <div class="top-container row justify-between">
      <div class="column">
        <div class="type-badge">
          <a>{{ type }}</a>
        </div>
        <div class="left-container row">
          <div class="avatar-wrap">
            <q-btn
              class="avatar"
              text-color="white"
              color="secondary"
              flat
              round
              icon="photo_camera"
              @click="openPicker"
            >
              <img v-if="avatar" :src="avatar" />
            </q-btn>
            <q-btn
              v-if="instance?.config?.avatar"
              class="overlay-btn"
              round
              dense
              size="sm"
              color="negative"
              text-color="black"
              icon="close"
              @click.stop="onOverlayClick"
            />
          </div>
          <div class="title-container column" @click="handleEdit">
            <div class="row items-center">
              <p class="title">{{ instance?.title }}</p>
              <q-btn class="edit-btn" flat color="primary" round size="xs" icon="edit" />
            </div>
            <p class="description">{{ instance?.config?.description }}</p>
          </div>
        </div>
      </div>
      <div class="status-container column">
        <StatusComponent :model-value="instance?.status!" />
        <div class="row">
          <q-btn
            v-if="instance?.status == InstanceStatus.Active"
            class="change-status-btn"
            icon="pause_circle"
            round
            flat
            color="primary"
            size="lg"
            @click="handleChangeStatus(InstanceStatus.Inactive)"
          >
            <q-tooltip>
              <a
                >Приостановить работу агента. Во время паузы деньги не списываются с вашего счета</a
              >
            </q-tooltip>
          </q-btn>
          <q-btn
            v-else
            class="change-status-btn"
            icon="play_circle"
            round
            flat
            color="primary"
            size="lg"
            :disable="instance?.status != InstanceStatus.Inactive"
            @click="handleChangeStatus(InstanceStatus.Active)"
          >
            <q-tooltip v-if="instance?.status == InstanceStatus.Inactive">
              <a>Возобновить работу агента</a>
            </q-tooltip>
            <q-tooltip v-else-if="instance?.status == InstanceStatus.NotEnoughBalance">
              <a>Пополните баланс аккаунта, чтобы активировать агента </a>
            </q-tooltip>
            <q-tooltip v-else>
              <a>Агент сейчас недоступен. Пожалуйста, подождите</a>
            </q-tooltip>
          </q-btn>
          <q-btn
            class="delete-instance-btn"
            icon="delete"
            round
            flat
            color="negative"
            size="lg"
            :disable="
              instance?.status != InstanceStatus.Inactive &&
              instance?.status != InstanceStatus.Active
            "
            @click="handleDeleteInstance"
          >
            <q-tooltip
              v-if="
                instance?.status == InstanceStatus.Inactive ||
                instance?.status == InstanceStatus.Active
              "
            >
              <a>Удалить агента</a>
            </q-tooltip>
            <q-tooltip v-else>
              <a>Агент сейчас недоступен. Пожалуйста, подождите</a>
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
    <q-tabs class="tabs" no-caps v-model="tab">
      <q-tab name="kb" label="База знаний" />
      <q-tab name="stats" label="Статистика" />
    </q-tabs>
    <q-tab-panels v-model="tab" class="tabs-panels" animated>
      <q-tab-panel name="stats">
        <StatsComponent
          v-if="stats && !loadingStats"
          v-model:stats="stats"
          v-model:stats-window="statsWindow"
          v-model:chart-type="chartType"
        />
        <q-spinner-ios v-else class="stats-loading" color="secondary" size="40px" />
      </q-tab-panel>

      <q-tab-panel name="kb">
        <KnowledgeBaseComponent
          v-if="instance"
          v-model:knowledge-base="instance!.kb"
          v-model:instance-id="instance!.id"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
  <div v-else class="container">
    <q-spinner-ios class="loading" color="secondary" size="40px" />
  </div>
</template>

<script setup lang="ts">
import { BotOut, InstanceOut, InstanceStatus, StatusStatsOut } from 'src/api';
import useBots from 'src/api/composables/useBots';
import useInstances from 'src/api/composables/useInstances';
import StatsComponent from 'src/components/instance/StatsComponent.vue';
import SecondaryButton from 'src/components/SecondaryButton.vue';
import StatusComponent from 'src/components/instance/StatusComponent.vue';
import useAssets from 'src/composables/useAssets';
import StatsWindow from 'src/types/StatsWindow.type';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import KnowledgeBaseComponent from 'src/components/instance/KnowledgeBaseComponent.vue';
import useDialog from 'src/composables/useDialog';
import { NameDialog } from 'src/dialogs/dialogs';
import { uid } from 'quasar';

const route = useRoute();
const { openDialog, $eventDialog } = useDialog();
const {
  getInstanceApi,
  updateInstance,
  changeInstanceStatusApi,
  getInstanceStats,
  deleteInstanceApi,
} = useInstances();
const { getBotsApi } = useBots();
const { t } = useI18n();
const router = useRouter();
const { getAsset, uploadAsset } = useAssets();

const loading = ref<boolean>(false);
const loadingStats = ref<boolean>(false);

const statsWindow = ref<StatsWindow>(StatsWindow['1d']);
const stats = ref<StatusStatsOut>();
const chartType = ref<'bar' | 'line'>('bar');

const tab = ref<'kb' | 'stats'>('kb');

const instance = ref<InstanceOut>();
const bots = ref<BotOut[]>([]);
const type = ref<string>();
const avatar = ref<string | null>();

const confirmId = ref<string>();

const handleChangeStatus = (status: InstanceStatus) => {
  changeInstanceStatusApi(instance.value?.id!, { status }).then(() => {
    instance.value!.status = status;
  });
};

const handleEdit = () => {
  openDialog(NameDialog.editAgentDialog, { instance: instance.value });
};

watch($eventDialog, ({ type, data, nameDialog }) => {
  if (type == 'update' && nameDialog == NameDialog.editAgentDialog) {
    instance.value = { ...instance.value, ...data.data };
  }
  if (
    type == 'update' &&
    nameDialog == NameDialog.confirmActionDialog &&
    confirmId.value == data.data.confirmId
  ) {
    deleteInstanceApi(instance.value!.id).then(() => {
      router.replace('instances');
    });
  }
});

const handleDeleteInstance = () => {
  confirmId.value = uid();
  openDialog(NameDialog.confirmActionDialog, {
    actionLabel: 'удалить агента',
    confirmId: confirmId.value,
  });
};

const inputRef = useTemplateRef<HTMLInputElement | null>('inputRef');

function openPicker() {
  inputRef.value?.click();
}

function onOverlayClick() {
  //   openPicker()
  updateInstance(instance.value!.id, {
    ...instance.value,
    config: {
      ...instance.value?.config,
      avatar: null,
    },
  }).then(() => {
    loadAvatar();
  });
}

function onChange(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0] || null;
  if (!f) {
    return;
  }

  const ext = f.name.split('.').pop()?.toLowerCase() || 'png';
  const fileName = `${instance.value?.instance_id}.avatar.${ext}`;
  uploadAsset('instances.avatars', fileName, f)
    .then((res) => {
      if (res.$metadata?.httpStatusCode === 200) {
        updateInstance(instance.value?.id!, {
          ...instance.value,
          config: { ...instance.value?.config, avatar: fileName },
        });
        getAsset('instances.avatars', fileName).then((res) => {
          avatar.value = res;
        });
      }
    })
    .catch((err) => console.error('S3 upload failed', err));
  (e.target as HTMLInputElement).value = '';
}

const handleGoBack = () => {
  router.replace('/instances');
};

const getBots = async () => {
  return await getBotsApi().then((res) => {
    bots.value = res!;
  });
};

const getInstance = async () => {
  return await getInstanceApi(route.params.instance_id as unknown as number).then((res) => {
    instance.value = res!;
  });
};

const loadStats = async () => {
  loadingStats.value = true;
  getInstanceStats(route.params.instance_id as unknown as number, statsWindow.value)
    .then((res) => {
      stats.value = res;
    })
    .finally(() => {
      loadingStats.value = false;
    });
};

watch(
  statsWindow,
  () => {
    loadStats();
  },
  { deep: true },
);

const loadAvatar = async () => {
  if (instance.value?.config?.avatar) {
    getAsset('instances.avatars', instance.value?.config?.avatar).then((res) => {
      avatar.value = res;
    });
  } else {
    getAsset('static', 'default_instance_icon.svg').then((res) => {
      avatar.value = res;
    });
  }
};

const findInstanceType = () => {
  if ((route.params.instance_id as unknown as number) && bots.value.length > 0) {
    type.value = bots.value.find(({ id }) => {
      return id == (instance.value?.bot_id as unknown as number);
    })?.title;
  }
};

onMounted(() => {
  loadStats();
  loading.value = true;
  Promise.all([getBots(), getInstance()]).finally(() => {
    loading.value = false;
    findInstanceType();
    loadAvatar();
  });
});
</script>

<style lang="scss" scoped>
.container {
  .top-container {
    background-color: $foreground;
    padding: var(--spacing-sm);
    border-radius: 20px;
    margin-top: var(--spacing-sm);

    .left-container {
      align-items: center;
    }

    .type-badge {
      padding: var(--spacing-xxs) var(--spacing-xs);
      width: fit-content;
      margin-bottom: var(--spacing-xs);
      border-radius: 20px;
      text-align: center;
      background-color: $primary-transparent;
      a {
        font-size: var(--font-size-xs);
        color: $secondary;
      }
    }

    .title-container {
      padding-left: var(--spacing-xs);
      .title {
        font-size: var(--font-size-md);
        margin-bottom: 0;
        font-weight: 600;
        cursor: pointer;
        margin-right: var(--spacing-xs);
      }

      .edit-btn {
        margin-top: 3px;
      }

      .description {
        font-size: var(--font-size-xs);
        margin-bottom: 0;
        color: $font-secondary;
        cursor: pointer;
      }

      .description:hover {
        text-decoration: underline !important;
      }
    }
  }
  .avatar-wrap {
    position: relative;
    display: inline-block;
    width: calc(var(--spacing-md) * 1);
    height: calc(var(--spacing-md) * 1);

    .avatar {
      width: calc(var(--spacing-md) * 1);
      height: calc(var(--spacing-md) * 1);
      border-radius: 100px;
      position: relative;

      img {
        width: calc(var(--spacing-md) * 1);
        height: calc(var(--spacing-md) * 1);
        position: absolute;
        border-radius: 100px;
        z-index: -10 !important;
        object-fit: cover;

        border: 2px solid $secondary;
      }
    }

    .overlay-btn {
      position: absolute;
      top: -6px; // tweak to sit slightly outside the circle
      right: -6px; // tweak as needed
      z-index: 2;

      opacity: 0;
      transform: scale(0.85);
      transition:
        opacity 0.15s ease,
        transform 0.15s ease;

      // don’t block clicks when hidden
      pointer-events: none;
    }
  }

  .avatar-wrap:hover .overlay-btn {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
  }

  .status-container {
    align-items: flex-end;

    .row {
      margin-top: var(--spacing-xs);
      gap: var(--spacing-xs);
    }

    .change-status-btn,
    .delete-instance-btn {
      // width: 40px;
      // height: 40px;
      border-radius: 14px !important;
    }

    .change-status-btn {
      background-color: $secondary-shade;
    }

    .delete-instance-btn {
      background-color: $negative-shade;
    }
  }

  .tabs {
    border-bottom: 1px $secondary inset;
    margin-top: var(--spacing-sm);
    width: 100%;
  }

  .tabs-panels {
    background-color: $foreground !important;
    margin-top: var(--spacing-sm);
    border-radius: 20px;
    margin-bottom: var(--spacing-md);
    position: relative;

    .stats-loading {
      //   position: absolute;
      margin-left: 50%;
      margin-top: calc(var(--spacing-lg) * 1.5);
      margin-bottom: calc(var(--spacing-lg) * 1.5);
      transform: translateX(-50%);
    }
  }
}

.tabs ::v-deep .q-tabs__content {
  justify-content: flex-start !important;
}

.go-back-btn {
  border-radius: 14px !important;
  background-color: $secondary-shade;
}

.avatar ::v-deep .q-icon {
  display: none !important;
}

.avatar:hover ::v-deep .q-icon {
  display: block !important;
}

.status-container ::v-deep .status-container-status {
  a {
    font-size: var(--font-size-md) !important;
  }
  .status-component {
    width: 14px;
    height: 14px;
  }
}
</style>
