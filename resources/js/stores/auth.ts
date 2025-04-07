import { defineStore } from 'pinia';
import http from '../http';
import router from '../router';
import { User } from '@/types';

interface AuthState {
    initiated: boolean;
    intendedRoute: object;
    user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      initiated: false,
      intendedRoute: { name: 'dashboard' },
      user: null,
    };
  },
  getters: {
    isAuthenticated: (state): boolean => state.user !== null,
  },
  actions: {
    initiate() {
      return http.get(
        route('api.user')
      ).then((response) => {
        this.user = response.data;
      }).catch((error) => {
        // ToDo: Handle different errors...
        this.user = null;
      }).finally(() => {
        this.initiated = true;
      });
    },
    setIntendedRoute(route: object) {
      this.intendedRoute = route;
    },
    login(email: string, password: string, remember: boolean = false) {
      return http.post(route('dashboard.login'), {
        email: email,
        password: password,
        remember: remember,
      }).then((response) => {
        this.user = response.data;

        router.push(this.intendedRoute);

        this.intendedRoute = { name: 'dashboard' };
      }).catch((error) => {
        // ToDo: Handle error...
      });
    },
    logout() {
      return http.post(route('logout'))
        .then((response) => {
          this.user = null;

          router.push({ name: 'welcome' });
        }).catch((error) => {
          // ToDo: Handle error...
        });
    },
    sendResetPasswordLink(email: string) {
      return http.post('dashboard/forgot-password', {
        email: email,
      }).then((response) => {
        // ToDo: Handle response...
      }).catch((error) => {
        //ToDo: Handle error...
      });
    },
    resetPassword(token: string, email: string, password: string, passwordConfirmation: string) {
      return http.post('dashboard/reset-password', {
        token: token,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }).then((response) => {
        // ToDo: Handle response...
      }).catch((error) => {
        // ToDo: Handle error...
      });
    },
    register(data: object) {
      return http.post(route('dashboard.register'), data)
        .then((response) => {
          this.user = response.data.user;

          router.push(this.intendedRoute);

          this.intendedRoute = { name: 'dashboard' };
        }).catch((error) => {
            // ToDo: Handle error...
        });
    },
  },
});
