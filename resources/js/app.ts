import '../css/app.css';

import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { ZiggyVue } from 'ziggy-js';
import { initializeTheme } from './composables/useAppearance';

// ToDo: Check if this should be migrated.
// Extend ImportMeta interface for Vite...
// declare module 'vite/client' {
//     interface ImportMetaEnv {
//         readonly VITE_APP_NAME: string;
//         [key: string]: string | boolean | undefined;
//     }

//     interface ImportMeta {
//         readonly env: ImportMetaEnv;
//         readonly glob: <T>(pattern: string) => Record<string, () => Promise<T>>;
//     }
// }

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createInertiaApp({
//     title: (title) => `${title} - ${appName}`,
//     resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue')),
//     setup({ el, App, props, plugin }) {
//         createApp({ render: () => h(App, props) })
//             .use(plugin)
//             .use(ZiggyVue)
//             .mount(el);
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).use(ZiggyVue).mount('body');

// This will set light / dark mode on page load...
initializeTheme();
