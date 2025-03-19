import { defineStore } from 'pinia';
import http from '../http';

interface User {
    id: number;
    name: string;
    email: string;
    emailVerifiedAt: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthState {
    initiated: boolean;
    user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      initiated: false,
      user: null,
    };
  },
  getters: {
    isAuthenticated: (state): boolean => state.user !== null,
  },
  actions: {
    initiate() {
      http.get(
        route('api.user')
      ).then((response) => {
        this.user = response.data.data;
      }).catch((error) => {
        // ToDo: Handle different errors...
        this.user = null;
      }).finally(() => {
        this.initiated = true;
      });
    },
    login(email: string, password: string, remember: boolean = false) {
      http.post(route('dashboard.login'), {
        email: email,
        password: password,
        remember: remember,
      }).then((response) => {
        this.user = response.data.data;
      }).catch((error) => {
        // ToDo: Handle error...
      });
    },
    logout() {
      http.post('dashboard/logout')
        .then((response) => {
            this.user = null;
        }).catch((error) => {
            // ToDo: Handle error...
        });
    },
    sendResetPasswordLink(email: string) {
      http.post('dashboard/forgot-password', {
        email: email,
      }).then((response) => {
        // ToDo: Handle response...
      }).catch((error) => {
        //ToDo: Handle error...
      });
    },
    resetPassword(token: string, email: string, password: string, passwordConfirmation: string) {
      http.post('dashboard/reset-password', {
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
  },
});
