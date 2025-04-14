<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import http from '@/http';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { LoaderCircle } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Props {
    token: string;
}

const props = defineProps<Props>();

const vueRoute = useRoute();

const form = ref({
    token: props.token,
    email: vueRoute.query.email ?? '',
    password: '',
    password_confirmation: '',
});

const processing = ref(false);
const router = useRouter();

const submit = () => {
    processing.value = true;

    http.post(route('password.store'), form.value)
        .then((response) => {
            router.push({ name: 'dashboard.login' });
        }).finally(() => {
            processing.value = false;
        });
};
</script>

<template>
    <AuthLayout title="Reset password" description="Please enter your new password below">
        <form @submit.prevent="submit">
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" name="email" autocomplete="email" v-model="form.email" class="mt-1 block w-full" readonly />
                    <!-- <InputError :message="form.errors.email" class="mt-2" /> -->
                </div>

                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        autocomplete="new-password"
                        v-model="form.password"
                        class="mt-1 block w-full"
                        autofocus
                        placeholder="Password"
                    />
                    <!-- <InputError :message="form.errors.password" /> -->
                </div>

                <div class="grid gap-2">
                    <Label for="password_confirmation"> Confirm Password </Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        autocomplete="new-password"
                        v-model="form.password_confirmation"
                        class="mt-1 block w-full"
                        placeholder="Confirm password"
                    />
                    <!-- <InputError :message="form.errors.password_confirmation" /> -->
                </div>

                <Button type="submit" class="mt-4 w-full" :disabled="processing">
                    <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
                    Reset password
                </Button>
            </div>
        </form>
    </AuthLayout>
</template>
