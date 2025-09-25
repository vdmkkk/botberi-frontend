// @ts-nocheck //
import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';
import { AuthApi, Configuration, BotsApi, InstancesApi, UsersApi } from 'src/api';
import { PaymentApi } from 'src/api';
import { Notify } from 'quasar';
import { Cookies } from 'quasar';
declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const COOKIE_OPTS: Parameters<typeof Cookies.set>[2] = {
  path: '/',
  sameSite: 'lax',
  // secure: true, // uncomment in HTTPS/prod
};

const config = new Configuration({
  basePath: import.meta.env.VITE_APP_API_BASE_URL,
});

const apiInstances = {
  authApi: new AuthApi(config),
  botsApi: new BotsApi(config),
  instancesApi: new InstancesApi(config),
  usersApi: new UsersApi(config),
};

function getTokens() {
  return {
    session: Cookies.get('session_token') || '',
    refresh: Cookies.get('refresh_token') || '',
  };
}
function setTokens(session_token: string, refresh_token: string) {
  Cookies.set('session_token', session_token, COOKIE_OPTS);
  Cookies.set('refresh_token', refresh_token, COOKIE_OPTS);
}
function clearTokens() {
  Cookies.remove('session_token', COOKIE_OPTS);
  Cookies.remove('refresh_token', COOKIE_OPTS);
}

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;
const pendingRequests: Array<(tokens: { session: string; refresh: string }) => void> = [];

function subscribePending(cb: (tokens: { session: string; refresh: string }) => void) {
  pendingRequests.push(cb);
}
function resolvePending(tokens: { session: string; refresh: string }) {
  pendingRequests.splice(0).forEach((cb) => cb(tokens));
}

async function doRefresh() {
  const { session, refresh } = getTokens();

  // IMPORTANT: do not use Set-Cookie; backend returns tokens in body
  // We call via the generated authApi's axios with explicit headers
  try {
    const resp = await apiInstances.authApi.axios.post(
      `${import.meta.env.VITE_APP_API_BASE_URL}/auth/refresh`,
      null,
      {
        headers: {
          'X-Session-Token': session,
          'X-Refresh-Token': refresh,
        },
      },
    );

    const { session_token, refresh_token } = resp.data || {};
    if (!session_token || !refresh_token) {
      throw new Error('Malformed refresh response');
    }

    setTokens(session_token, refresh_token);
  } catch {
    clearTokens();
  }
}

Object.entries(apiInstances).forEach(([key, apiInstance]) => {
  // console.log(key)
  apiInstance.axios.interceptors.request.use(
    (config) => {
      config.headers['X-Session-Token'] = Cookies.get('session_token');
      config.headers['X-Refresh-Token'] = Cookies.get('refresh_token');
      return config;
    },
    (error) => Promise.reject(error),
  );

  apiInstance.axios.interceptors.response.use(
    // бля метод protected один хуй работает. Люблю TS
    (response) => response,
    async (error) => {
      if (error.status == 401) {
        const originalRequest = error.config || {};
        // Avoid loops: don't try to refresh if the failing call *is* an auth endpoint
        const url = (originalRequest.url || '').toString();
        const isAuthPath =
          url.includes('/auth/login') ||
          url.includes('/auth/register') ||
          url.includes('/auth/verify') ||
          url.includes('/auth/forgot-password') ||
          url.includes('/auth/reset-password') ||
          url.includes('/auth/change-password') ||
          url.includes('/auth/refresh');

        // Mark to avoid retry loops
        if ((originalRequest as any)._retry) {
          // already retried once; bail
          clearTokens();
          return Promise.reject(error);
        }
        (originalRequest as any)._retry = true;

        // If it's an auth call itself, or we have no refresh token, just clear & fail
        const { refresh } = getTokens();
        if (isAuthPath || !refresh) {
          clearTokens();
          Notify.create({
            type: 'warning',
            position: 'top',
            message: 'Сессия истекла. Войдите снова.',
            timeout: 5000,
            badgeStyle: { display: 'none' },
          });
          return Promise.reject(error);
        }

        // Queue while a refresh is in flight
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            subscribePending(({ session, refresh }) => {
              // retry original request with new tokens
              originalRequest.headers = originalRequest.headers || {};
              (originalRequest.headers as any)['X-Session-Token'] = session;
              (originalRequest.headers as any)['X-Refresh-Token'] = refresh;

              // Use the same axios instance to preserve baseURL etc.
              (apiInstance.axios as AxiosInstance)
                .request(originalRequest)
                .then(resolve)
                .catch(reject);
            });
          });
        }

        // Do the refresh (single-flight)
        isRefreshing = true;
        refreshPromise = doRefresh()
          .then(() => {
            const tokens = getTokens(); // now updated
            resolvePending(tokens);
          })
          .catch((e) => {
            clearTokens();
            // wake all pending with failure
            resolvePending({ session: '', refresh: '' });
            throw e;
          })
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });

        // Once refreshed, retry the original request
        return refreshPromise
          .then(() => {
            const tokens = getTokens();
            originalRequest.headers = originalRequest.headers || {};
            (originalRequest.headers as any)['X-Session-Token'] = tokens.session;
            (originalRequest.headers as any)['X-Refresh-Token'] = tokens.refresh;

            return (apiInstance.axios as AxiosInstance).request(originalRequest);
          })
          .catch((e) => {
            Cookies.remove('refresh_token');
            Cookies.remove('session_token');
            Notify.create({
              type: 'warning',
              position: 'top',
              message: 'Сессия истекла. Войдите снова.',
              timeout: 5000,
              badgeStyle: { display: 'none' },
            });
            return Promise.reject(e);
          });
      } else if (error.response) {
        console.log(error.response);
        Notify.create({
          type: 'negative',
          position: 'top',
          timeout: 5000,
          badgeStyle: { display: 'none' },
          message: error.response.data.error_code || 'Что-то пошло не так',
        });
      }

      return Promise.reject(error);
    },
  );
});

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = apiInstances;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { apiInstances };
