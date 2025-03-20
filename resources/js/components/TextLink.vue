<script setup lang="ts">
interface Props {
    to: string|object;
}

defineProps<Props>();
</script>

<template>
    <RouterLink
        :to="to"
        class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:!decoration-current dark:decoration-neutral-500"
    >
        <slot />
    </RouterLink>
</template>
