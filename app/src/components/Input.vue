<template>
  <q-input
    v-bind="$attrs"
    :type="type"
    :model-value="modelValue"
    rounded
    standout="standout-class"
    :autogrow="false"
    color="primary"
    :class="{ 'q-input': true, high: isHigh, 'disabled-style': isDisabled, 'has-voice': hasVoice }"
    :disable="isDisabled"
    @update:model-value="emit('update:modelValue', $event as string)"
  >
    <template v-slot:prepend>
      <slot name="prepend" />
    </template>
    <template v-slot:append>
      <slot name="append" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: string | undefined;
    isHigh?: boolean;
    isWide?: boolean;
    hasVoice?: boolean;
    type?: string;
    isDisabled?: boolean;
  }>(),
  { type: 'text' },
);
const { modelValue } = toRefs(props);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

onMounted(() => {
  const ua = navigator.userAgent;
  // Check for iOS device and Safari (excluding Chrome on iOS)
  if (/iP(ad|hone|od)/.test(ua) && /Safari/.test(ua) && !/CriOS/.test(ua)) {
    document.documentElement.classList.add('ios-safari');
  }
});
</script>

<style lang="scss" scoped>
.q-input ::v-deep .q-field.high {
  height: -webkit-fill-available !important;
}
.q-input ::v-deep .q-field__control {
  height: -webkit-fill-available !important;
}

.ios-safari .q-input ::v-deep .q-field__control {
  /* Adjust height for iOS Safari */
  height: auto !important;
}

.q-input ::v-deep .q-field__control {
  border-radius: 20px !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  //   border: 1px solid rgba(255, 255, 255, 0.5);
  border: 1px solid $primary;
  border-radius: 10px !important;
}
.disabled-style ::v-deep .q-field__control {
  background-color: transparent !important;
  border: 1px solid rgba(107, 114, 128, 0.5);
}

.q-input ::v-deep .q-field__native {
  resize: none !important;
  color: $font !important;
}

.q-input ::v-deep .q-field__label {
  color: $font;
}

.has-voice ::v-deep .q-field__native {
  padding-right: 30px;
}

.q-input ::v-deep .standout-class {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 1);
}

:global(input, select) {
  color: $font !important;
  -webkit-text-fill-color: $font !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
}
</style>
