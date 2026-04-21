<script setup>
import { onMounted } from 'vue';
import { useDeviceStore } from '@/stores/device/store';
import { useLocationStore } from '@/stores/location/store';
import { useCatalogStore } from '@/stores/catalog/store';

const deviceStore = useDeviceStore();
const locationStore = useLocationStore();
const catalogStore = useCatalogStore();

onMounted(async () => {
    // Запускаем всё параллельно, чтобы не ждать по очереди
    await Promise.all([
        locationStore.fetchItems(),
        catalogStore.fetchAll(),
        deviceStore.fetchItems()
    ]);
});
</script>

<template>
    <div>
        <select v-model="deviceStore.filters.location_id" @change="deviceStore.fetchItems()">
            <option value="">Все локации</option>
            <option v-for="loc in locationStore.items" :key="loc.id" :value="loc.id">
                {{ loc.name }}
            </option>
        </select>

        <hr>

        <div v-if="deviceStore.loading">Загрузка данных...</div>

        <table v-else border="1" width="100%" style="margin-top: 10px; border-collapse: collapse;">
            <thead>
                <tr style="background: #f4f4f4;">
                    <th>ID</th>
                    <th>Модель / Вендор</th>
                    <th>Серийный номер</th>
                    <th>Статус</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="device in deviceStore.items" :key="device.id">
                    <td>{{ device.id }}</td>
                    <td>
                        <strong>{{ device.model?.vendor?.name }}</strong> {{ device.model?.name }}
                    </td>
                    <td>{{ device.serial_number }}</td>
                    <td>{{ device.status }}</td>
                </tr>
                <tr v-if="deviceStore.items.length === 0">
                    <td colspan="4" style="text-align: center; padding: 10px;">
                        В этой локации пока нет устройств.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>