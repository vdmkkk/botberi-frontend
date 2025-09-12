<template>
  <q-layout view="lHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="toolbar" :class="$q.screen.xs ? 'justify-between' : 'justify-end'">
        <q-btn
          v-if="$q.screen.xs"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
          @click="toggleLeftDrawer"
        />

        <!-- <div class="actions" style="justify-self: flex-end">
          <q-icon v-if="!loading" name="bolt" style="scale: 1.3" /> {{ me?.gen_point_amount }}
          <q-spinner-puff v-if="loading" color="primary" size="10px" />
        </div> -->
        <!-- <q-btn @click="navigateTo('profile')" flat round dense icon="person" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="drawer bg-accent" show-if-above>
      <div class="row drawer-title">
        <q-avatar square>
          <img :src="logo" />
        </q-avatar>

        <a class="title">BotBeri</a>
      </div>

      <q-list>
        <template v-for="(menuItem, index) in links" :key="index">
          <q-item
            clickable
            v-ripple
            :class="{ 'menu-item': true, active: isActive(menuItem.to) }"
            :disable="menuItem.disabled"
            @click="navigateTo(menuItem.to, menuItem.name == 'Служба заботы')"
          >
            <q-tooltip v-if="menuItem.disabled"
              ><a>
                Чтобы получить доступ к разделу, вы должны ответить на все вопросы на Главной и
                иметь соотвествующий уровень подписки
              </a></q-tooltip
            >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.name }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container class="app">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useCookie } from 'src/composables/useCookie';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: string, isSupport = false) => {
  if (isSupport) {
    window.open(path, '_blank');
    return;
  } else {
    router.push(path);
  }
};

const me = ref();
const leftDrawerOpen = ref(false);

const links = computed(() => [
  {
    name: 'Главная',
    to: '/',
    icon: 'dashboard',
    disabled: false,
  },
  {
    name: 'Витрина',
    to: '/bots',
    icon: 'storefront',
    disabled: false,
  },
  {
    name: 'Мои агенты',
    to: '/instances',
    icon: 'smart_toy',
    disabled: false,
  },
  {
    name: 'Профиль',
    to: '/profile',
    icon: 'person',
    disabled: false,
  },
  {
    name: 'Служба заботы',
    to: 'https://t.me/puls_smm_support',
    icon: 'contact_support',
    disabled: false,
  },
]);

const isActive = (to: string) => {
  return (
    (router.currentRoute.value.path.includes(to) && to != '/') ||
    (to == '/' && router.currentRoute.value.path == '/')
  );
};

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

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
  if (!jwt || !session) {
    router.replace('/auth');
  }
});

onMounted(() => {
  if (!jwtToken.value || !sessionToken.value) {
    router.replace('/auth');
  }
});
</script>

<style lang="scss" scoped>
.toolbar {
  background-color: $foreground;
}

.drawer {
  background-color: $accent;

  .drawer-title {
    img {
      height: var(--font-size-lg) !important;
      width: var(--font-size-lg) !important;
    }

    .title {
      font-size: var(--font-size-md);
      margin-top: auto;
      margin-bottom: auto;
      font-weight: 400;
      color: white;
    }

    margin-left: 10%;
    padding-top: var(--spacing-sm);
    padding-bottom: var(--spacing-sm);
  }

  .menu-item {
    width: 80%;
    margin-left: 10%;
    font-size: var(--font-size-xs);
    margin-top: var(--spacing-xxs);
    border-radius: 10px;
    font-weight: 500;
  }
}

.app {
  background-color: $background;
  color: $font;
  padding-left: var(--spacing-sm);
  padding-right: var(--spacing-sm);
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
