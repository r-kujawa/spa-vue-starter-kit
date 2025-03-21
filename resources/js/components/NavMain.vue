<script setup lang="ts">
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItemWithTo } from '@/types';
import { useRoute } from 'vue-router';

defineProps<{
    items: NavItemWithTo[];
}>();

const route = useRoute();

const isActive = (item: NavItemWithTo) => {
    if (typeof item.to === 'string') {
        return route.path === item.to;
    }

    const match = item.to.path ? 'path' : 'name';

    return route[match] === item.to[match];
};
</script>

<template>
    <SidebarGroup class="px-2 py-0">
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton as-child :is-active="isActive(item)">
                    <RouterLink :to="item.to">
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                    </RouterLink>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>
