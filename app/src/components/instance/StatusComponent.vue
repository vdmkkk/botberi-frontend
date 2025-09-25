<template>
  <div class="row items-center status-container-status">
    <div :class="status" class="status-component" />
    <a>{{ status }}</a>
  </div>
</template>

<script setup lang="ts">
import { InstanceStatus } from 'src/api';

const status = defineModel<InstanceStatus>();
</script>

<style lang="scss" scoped>
.status-container-status {
  .status-component {
    width: 11px;
    height: 11px;
    background-color: white;
    border-radius: 100px;
    margin-right: 6px;
  }

  .inactive {
    background-color: #ccc;
  }

  .active {
    background-color: #0f0;
  }

  .not_enough_balance {
    background-color: rgb(82, 1, 1);
  }

  a {
    font-size: var(--font-size-sm);
  }
}
</style>
