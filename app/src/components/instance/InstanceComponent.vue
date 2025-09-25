<template>
  <div class="instance-container" @click="handleSelect">
    <div class="row justify-between">
      <div class="avatar">
        <img v-if="avatar" :src="avatar" />
      </div>

      <div class="status-container">
        <StatusComponent v-if="instance?.status" :model-value="instance.status" />
        <StatusComponent v-else :model-value="InstanceStatus.Unknown" />
      </div>
    </div>

    <p class="title">{{ instance?.title }}</p>
    <p class="type">{{ type }}</p>
  </div>
</template>

<script setup lang="ts">
import { InstanceOut, InstanceStatus } from 'src/api';
import StatusComponent from './StatusComponent.vue';
import useAssets from 'src/composables/useAssets';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const { getAsset } = useAssets();
const router = useRouter();

const instance = defineModel<InstanceOut>();

const { type } = defineProps<{ type: string | undefined }>();
const avatar = ref<string>('');

const handleSelect = () => {
  router.replace(`/instances/instance/${instance.value?.id}`);
};

onMounted(() => {
  if (instance.value?.config?.avatar) {
    getAsset('instances.avatars', instance.value?.config?.avatar).then((res) => {
      avatar.value = res;
    });
  } else {
    getAsset('static', 'default_instance_icon.svg').then((res) => {
      avatar.value = res;
    });
  }
});
</script>

<style lang="scss" scoped>
.instance-container {
  padding: var(--spacing-sm);
  background-color: $secondary-shade;
  width: calc(var(--spacing-xl) * 2);
  border-radius: 20px;
  cursor: pointer;

  .title {
    font-size: var(--font-size-sm);
    font-weight: 600;
  }

  .type {
    margin-bottom: 0;
  }

  .avatar {
    img {
      width: calc(var(--spacing-md) * 1.5);
      height: calc(var(--spacing-md) * 1.5);
      border-radius: 100px;
      object-fit: cover;
    }
    margin-bottom: var(--spacing-sm);
  }
}

@media (max-width: 575px) {
  .instance-container {
    width: 100% !important;
    padding: var(--spacing-md);
  }
}
</style>
