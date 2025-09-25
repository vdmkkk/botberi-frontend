<template>
  <div class="container" v-if="!loading">
    <div v-if="instances.length == 0" class="loading column items-center">
      <p class="nothing-here">Здесь пока ничего нет!</p>
      <Button label="Создать" @click="handleCreate" />
    </div>
    <div v-else class="instances">
      <div class="instance" v-for="instance in instances" :key="instance.id">
        <InstanceComponent :model-value="instance" :type="findBotType(instance.bot_id)" />
      </div>
    </div>
  </div>
  <div v-else class="container">
    <q-spinner-ios class="loading" color="secondary" size="40px" />
  </div>
</template>

<script setup lang="ts">
import { BotOut, InstanceOut } from 'src/api';
import useBots from 'src/api/composables/useBots';
import useInstances from 'src/api/composables/useInstances';
import Button from 'src/components/Button.vue';
import InstanceComponent from 'src/components/instance/InstanceComponent.vue';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { getInstancesApi } = useInstances();
const { getBotsApi } = useBots();
const { t } = useI18n();
const router = useRouter();

const loading = ref<boolean>(false);
const instances = ref<InstanceOut[]>([]);
const bots = ref<BotOut[]>([]);

const findBotType = (bot_id: number) => {
  return bots.value.find(({ id }) => {
    return id == bot_id;
  })?.title;
};

const handleCreate = () => {
  router.replace('/bots');
};

const getBots = async () => {
  return await getBotsApi().then((res) => {
    bots.value = res!;
  });
};

const getInstances = async () => {
  return await getInstancesApi().then((res) => {
    instances.value = res!;
  });
};

onMounted(() => {
  loading.value = true;
  Promise.all([getBots(), getInstances()]).finally(() => {
    loading.value = false;
  });
});
</script>

<style lang="scss" scoped>
.container {
  .nothing-here {
    font-size: var(--font-size-lg);
    font-weight: 600;
  }

  .instances {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-xs);

    .instance {
      width: calc(var(--spacing-xl) * 2);
    }
  }
}

@media (max-width: 767px) {
  .instances {
  }
}

@media (max-width: 575px) {
  .instances {
    flex-direction: column !important;

    .instance {
      width: 95% !important;
      align-self: center;
    }
  }
}
</style>
