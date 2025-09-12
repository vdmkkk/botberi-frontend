// useCookie.ts
import { ref, watch, onMounted, onBeforeUnmount, type Ref } from 'vue';
import { Cookies } from 'quasar';

type CookieRef<T> = Ref<T | null>;

export function useCookie<T = string>(
  name: string,
  opts?: Parameters<typeof Cookies.set>[2] & {
    /** poll DOM cookies for external changes (ms). 0 = off */
    pollMs?: number;
    /** mirror changes to localStorage so other tabs update */
    crossTabKey?: string;
  },
): CookieRef<T> {
  const v = ref<T | null>(null);
  const key = opts?.crossTabKey ?? `cookie-sync:${name}`;

  const read = () => {
    const raw = Cookies.get(name);
    v.value = (raw as unknown as T) ?? null;
  };

  const write = (val: T | null) => {
    if (val == null) Cookies.remove(name);
    else Cookies.set(name, String(val), opts);
    // notify other tabs if enabled
    if (opts?.crossTabKey) {
      try {
        localStorage.setItem(key, String(Date.now()));
      } catch {}
    }
  };

  // init (client only)
  if (typeof window !== 'undefined') read();

  // when ref changes, write cookie
  watch(v, (val) => write(val as T | null));

  // catch external changes (server Set-Cookie / other libs) via polling
  let timer: number | undefined;
  onMounted(() => {
    read();
    if (opts?.pollMs && opts.pollMs > 0) {
      let last = Cookies.get(name);
      timer = window.setInterval(() => {
        const now = Cookies.get(name);
        if (now !== last) {
          last = now;
          v.value = (now as unknown as T) ?? null;
        }
      }, opts.pollMs) as unknown as number;
    }
    // cross-tab updates (fires only in other tabs)
    if (opts?.crossTabKey) {
      window.addEventListener('storage', (e) => {
        if (e.key === key) read();
      });
    }
  });

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer);
  });

  return v;
}
