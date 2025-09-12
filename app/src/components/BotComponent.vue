<template>
  <div class="bot-container">
    <p>{{ bot?.title }}</p>
    <p>{{ bot?.description }}</p>
    <p>{{ bot?.rate }}₽ / мес</p>
    <Button label="Выбрать" @click="handleSelect" />
  </div>
</template>

<script setup lang="ts">
import { BotOut } from 'src/api';
import Button from './Button.vue';

const bot = defineModel<BotOut>();

const emits = defineEmits(['select-bot']);

const handleSelect = () => {
  emits('select-bot', bot.value?.activation_code);
};
</script>

<style lang="scss" scoped>
.bot-container {
  padding: var(--spacing-sm);
  background-color: $accent;
  width: calc(var(--spacing-xl) * 2);
}
</style>
