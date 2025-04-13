<script setup lang="ts">
import Heading from '@/components/Heading.vue';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { isActiveRoute } from '@/composables/useCurrentRoute';
import { type NavItemWithTo } from '@/types';
import { RouterLink } from 'vue-router';

const sidebarNavItems: NavItemWithTo[] = [
    {
        title: 'Profile',
        to: { name: 'dashboard.settings.profile' },
    },
    {
        title: 'Password',
        to: { name: 'dashboard.settings.password' },
    },
    {
        title: 'Appearance',
        to: { name: 'dashboard.settings.appearance' },
    },
];
</script>

<template>
    <div class="px-4 py-6">
        <Heading title="Settings" description="Manage your profile and account settings" />

        <div class="flex flex-col space-y-8 md:space-y-0 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside class="w-full max-w-xl lg:w-48">
                <nav class="flex flex-col space-x-0 space-y-1">
                    <Button
                        v-for="item in sidebarNavItems"
                        :key="item.href"
                        variant="ghost"
                        :class="['w-full justify-start', { 'bg-muted': isActiveRoute(item) }]"
                        as-child
                    >
                        <RouterLink :to="item.to">
                            {{ item.title }}
                        </RouterLink>
                    </Button>
                </nav>
            </aside>

            <Separator class="my-6 md:hidden" />

            <div class="flex-1 md:max-w-2xl">
                <section class="max-w-xl space-y-12">
                    <slot />
                </section>
            </div>
        </div>
    </div>
</template>
