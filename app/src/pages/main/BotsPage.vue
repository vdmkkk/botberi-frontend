<template>
  <div v-if="!loading" class="container">
    <BotComponent
      v-for="bot in bots"
      :model-value="bot"
      :key="bot.id"
      @select-bot="handleSelectBot($event)"
    />
  </div>
  <div v-else class="container">
    <q-spinner-ios class="loading" color="secondary" size="40px" />
  </div>
</template>

<script setup lang="ts">
import { BotOut } from 'src/api';
import useBots from 'src/api/composables/useBots';
import BotComponent from 'src/components/BotComponent.vue';
import { onMounted, ref } from 'vue';

const { getBotsApi } = useBots();

const bots = ref<BotOut[]>();

const loading = ref<boolean>(false);

const handleSelectBot = (activationCode: string) => {
  return;
};

onMounted(() => {
  loading.value = true;
  getBotsApi()
    .then((res) => {
      bots.value = res;
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style lang="scss" scoped></style>
