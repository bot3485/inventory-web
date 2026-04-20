<template>
    <div class="card p-4">
        {{ locations.value }}
        <h3>Карта объектов</h3>
        <ul>
            <Item v-for="location in locations" :key="location.id" :item="location" />
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Item from '@/components/locations/Item.vue';
import { locationService } from '@/api/locations';

const locations = ref([]);
const searchQuery = ref('');

const fetchLocations = async () => {
    const params = searchQuery.value ? { 'filter[search]': searchQuery.value } : {};
    const response = await locationService.getAll(params);
    locations.value = response.data;
};

onMounted(fetchLocations);
</script>