<template>
  <q-select v-model="model" flat v-bind="$attrs" />
</template>

<script setup lang="ts">
const model = defineModel<any>();
</script>

<style lang="scss" scoped>
.q-select {
  background-color: $secondary-shade;
  border-radius: 10px;
}

.q-select ::v-deep .q-field__native {
  color: $font !important;
  padding-left: var(--spacing-xs);
}

.q-select:has(:deep(.rotate-180)) {
  background-color: red !important;
}

:global(.q-menu) {
  background-color: $background;
  color: $font;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
