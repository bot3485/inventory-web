<template>
    <li class="ms-4 list-unstyled">
        <div class="d-flex align-items-center py-1">
            <span v-if="item.children && item.children.length" @click="isOpen = !isOpen" class="cursor-pointer me-2">
                {{ isOpen ? '▼' : '▶' }}
            </span>

            <span :class="{ 'fw-bold': item.type === 'building' }">
                {{ item.name }} <small class="text-muted">({{ item.prefix }})</small>
            </span>
        </div>

        <ul v-if="isOpen && item.children && item.children.length">
            <Item v-for="child in item.children" :key="child.id" :item="child" />
        </ul>
    </li>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    item: Object
});

const isOpen = ref(true); // По умолчанию дерево развернуто
</script>