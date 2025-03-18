import { createRouter, createWebHistory } from 'vue-router';
import Welcome from './pages/Welcome.vue';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome,
        meta: {
            title: 'Welcome',
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const guestRoutes = [];

router.beforeEach(async (to, from) => {
    document.title = to.meta?.title ? to.meta.title + ' - ' + appName : appName;
});

export default router;
