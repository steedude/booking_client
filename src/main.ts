import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vue3GoogleLogin from 'vue3-google-login';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'virtual:svg-icons-register';

import '@/styles/tailwind.postcss';
import '@/styles/index.postcss';
import App from './App.vue';
import router from '@/router';
import i18NPlugin from '@/plugins/i18n';

if (process.env.NODE_ENV === 'mockServiceWorker') {
  const { worker } = await import('@/mocks/browser');

  worker.start();
}

const pinia = createPinia();
const app = createApp(App);

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(i18NPlugin);

app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_APP_ID,
});

app.mount('#app');
