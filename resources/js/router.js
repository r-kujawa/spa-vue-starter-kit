import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/auth/Login.vue';
import Register from './pages/auth/Register.vue';
import Dashboard from './pages/Dashboard.vue';
import Appearance from './pages/settings/Appearance.vue';
import Password from './pages/settings/Password.vue';
import Profile from './pages/settings/Profile.vue';
import Welcome from './pages/Welcome.vue';
import { useAuthStore } from './stores/auth';

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
    {
        path: '/dashboard',
        children: [
            {
                path: '',
                name: 'dashboard',
                component: Dashboard,
                meta: {
                    title: 'Dashboard',
                },
            },
            {
                path: '/login',
                name: 'dashboard.login',
                component: Login,
            },
            {
                path: '/register',
                name: 'dashboard.register',
                component: Register,
                meta: {
                    title: 'Register',
                },
            },
            {
                path: '/settings',
                children: [
                    {
                        path: '/profile',
                        name: 'dashboard.settings.profile',
                        component: Profile,
                        meta: {
                            title: 'Profile settings',
                        },
                    },
                    {
                        path: '/appearance',
                        name: 'dashboard.settings.appearance',
                        component: Appearance,
                        meta: {
                            title: 'Appearance settings',
                        },
                    },
                    {
                        path: '/password',
                        name: 'dashboard.settings.password',
                        component: Password,
                        meta: {
                            title: 'Password settings',
                        },
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const openRoutes = ['welcome'];

const guestRoutes = ['dashboard.register', 'dashboard.login'];

router.beforeEach(async (to, from) => {
    const auth = useAuthStore();

    if (!auth.initiated) {
        await auth.initiate();
    }

    if (!auth.isAuthenticated && !guestRoutes.includes(to.name) && !openRoutes.includes(to.name)) {
        auth.setIntendedRoute(to);

        return { name: 'dashboard.login' };
    }

    if (auth.isAuthenticated && guestRoutes.includes(to.name)) {
        return { name: 'dashboard' };
    }

    document.title = to.meta?.title ? to.meta.title + ' - ' + appName : appName;
});

export default router;
