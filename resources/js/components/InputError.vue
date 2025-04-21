<script setup lang="ts">
defineProps<{
    message?: [string, string[]];
}>();
</script>

<template>
    <div v-show="message">
        <p class="text-sm text-red-600 dark:text-red-500">
            {{ Array.isArray(message) ? message[0] : message }}
        </p>
    </div>
</template>
