<template>
  <div class="bot-container">
    <p class="title">{{ bot?.title }}</p>
    <p>{{ bot?.description }}</p>
    <p>{{ bot?.rate }}₽ / мес</p>
    <Button label="Выбрать" @click="handleSelect" />
  </div>
</template>

<script setup lang="ts">
import { BotOut } from 'src/api';
import Button from './Button.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const bot = defineModel<BotOut>();

const emits = defineEmits(['select-bot']);

const handleSelect = () => {
  router.replace(`instances/create-instance/${bot.value?.id}`);
  // emits('select-bot', bot.value?.activation_code);
};
</script>

<style lang="scss" scoped>
.bot-container {
  padding: var(--spacing-sm);
  background-color: $secondary-shade;
  width: calc(var(--spacing-xl) * 2);
  border-radius: 20px;

  .title {
    font-size: var(--font-size-sm);
    font-weight: 600;
  }
}
</style>
