<template>
  <div class="column fields">
    <Input
      v-model="vars.telegram_bot_api_key"
      label="create_agent.telegram_api_key"
      :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
    />
  </div>
</template>

<script setup lang="ts">
import Input from '../Input.vue';

type WBReviewsBotVars = {
  telegram_bot_api_key?: string;
};

const { vars = { telegram_bot_api_key: '' } } = defineProps<{ vars: WBReviewsBotVars }>();
</script>

<style lang="scss" scoped>
.fields {
  gap: var(--spacing-sm);
}
</style>
