import '../css/app.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { ZiggyVue } from 'ziggy-js';
import { initializeTheme } from './composables/useAppearance';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).use(ZiggyVue).mount('body');

// This will set light / dark mode on page load...
initializeTheme();
