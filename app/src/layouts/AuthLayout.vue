<template>
  <q-layout>
    <q-page-container class="app">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// @ts-nocheck //
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Cookies } from 'quasar';
import { useCookie } from 'src/composables/useCookie';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};

const jwtToken = useCookie('refresh_token', {
  expires: 365,
  sameSite: 'Lax',
  path: '/',
  pollMs: 1000,
  crossTabKey: 'refresh-sync',
});

const sessionToken = useCookie('session_token', {
  expires: 365,
  sameSite: 'Lax',
  path: '/',
  pollMs: 1000,
  crossTabKey: 'session-sync',
});

watch([jwtToken, sessionToken], ([jwt, session]) => {
  if (jwt && session) {
    router.replace('/');
  }
});

onMounted(() => {
  if (jwtToken.value && sessionToken.value) {
    router.replace('/');
  }
});
</script>

<style scoped lang="scss">
.app {
  background-color: $background;
  color: $font;
  padding-left: 35vw;
  padding-right: 35vw;
  padding-bottom: var(--spacing-sm);
  min-height: 100vh;

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
}
</style>
