<template>
  <div class="container">
    <q-form @submit="handleCreate" class="column">
      <p class="title">Создать агента</p>
      <Input
        v-model="name"
        :label="$t('create_agent.name')"
        :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
      />
      <Input
        v-model="description"
        :label="$t('create_agent.description')"
        :rules="[(val) => (val && val.length > 0) || $t('errors.required')]"
      />
      <component :vars="vars" :is="varsComponents[botId]" />
      <Button label="Создать" type="submit" />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import { BotOut } from 'src/api';
import useBots from 'src/api/composables/useBots';
import useInstances from 'src/api/composables/useInstances';
import WBReviewsBotVars from 'src/components/bots-vars/WBReviewsBot.vars.vue';
import Button from 'src/components/Button.vue';
import Input from 'src/components/Input.vue';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const varsComponents = {
  '1': WBReviewsBotVars,
};

const route = useRoute();
const router = useRouter();
const botId = route.params?.bot_id as keyof typeof varsComponents;

const { t } = useI18n();
const { createInstanceApi } = useInstances();
const { getBotApi } = useBots();

const name = ref<string>('');
const description = ref<string>('');
const vars = ref({});

const botInfo = ref<BotOut>();

const handleCreate = () => {
  createInstanceApi({
    bot_id: botInfo.value!.id,
    title: name.value,
    config: {
      description: description.value,
      ...vars.value,
    },
  }).then((res) => {
    router.replace(`/instances/instance/${res?.id}`);
  });
};

onMounted(() => {
  getBotApi(botId as unknown as number).then((res) => {
    if (res) {
      botInfo.value = res;
    } else {
      router.back();
      Notify.create({
        message: 'Что-то пошло не так',
        type: 'negative',
        position: 'top',
        timeout: 5000,
      });
    }
  });
});
</script>

<style lang="scss" scoped>
.q-form {
  gap: var(--spacing-sm);
}
</style>
