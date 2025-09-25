<template>
  <q-icon class="content-icon" :name="icons[dataType!]" round flat color="primary" size="sm">
    <q-inner-loading :showing="status == KBEntryStatus.InProgress" dark
      ><q-spinner size="sm" color="secondary" class="status-loading"
    /></q-inner-loading>
  </q-icon>
</template>

<script setup lang="ts">
import { KBDataType, KBEntryStatus } from 'src/api';

const status = defineModel<KBEntryStatus>('status');
const dataType = defineModel<KBDataType>('data-type');

console.log(dataType.value);

const icons = {
  [KBDataType.Document]: 'folder',
  [KBDataType.Video]: 'videocam',
};
</script>

<style lang="scss" scoped>
.content-icon {
  border-radius: 14px !important;
  padding: 10px;
  background-color: $secondary-shade !important;
}

// .status-loading {
//   z-index: 999;
//   position: absolute;
// }
</style>
