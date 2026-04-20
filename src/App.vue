<template>
  <AppLayout v-if="$route.meta.requiresAuth" />
  <router-view v-else />
</template>

<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
</script>