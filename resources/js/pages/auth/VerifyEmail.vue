<script setup lang="ts">
import { Button } from '@/components/ui/button';
import http from '@/http';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { LoaderCircle } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const status = ref(null);

const processing = ref(false);

const router = useRouter();

const submit = () => {
    processing.value = true;
    http.post(route('verification.send'))
        .then((response) => {
            status.value = response.data.status;
        })
        .catch((error) => {
            if (error.status !== 418) {
                return;
            }

            status.value = error.response.data.status;
            setTimeout(() => {
                router.push({ name: 'dashboard' });
            }, 3000);
        }).finally(() => {
            processing.value = false;
        });
};

const auth = useAuthStore();

const logout = () => {
    auth.logout();
};
</script>

<template>
    <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
        <div v-if="status === 'verification-link-sent'" class="mb-4 text-center text-sm font-medium text-green-600">
            A new verification link has been sent to the email address you provided during registration.
        </div>
        <div v-if="status === 'already-verified'" class="mb-4 text-center text-sm font-medium text-green-600">
            Your email address has already been verified. You will be redirected to the dashboard.
        </div>

        <form @submit.prevent="submit" class="space-y-6 text-center">
            <Button :disabled="processing" variant="secondary">
                <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
                Resend verification email
            </Button>

            <Button @click="logout" class="mx-auto block text-sm"> Log out </Button>
        </form>
    </AuthLayout>
</template>
