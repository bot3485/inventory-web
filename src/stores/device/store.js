import { defineStore } from 'pinia';
import deviceApi from '@/api/devices';

export const useDeviceStore = defineStore('deviceStore', {
    state: () => ({
        items: [],
        loading: false,
        // Поля для фильтров
        filters: {
            location_id: '',
            status: '',
            search: ''
        }
    }),

    actions: {
        async fetchItems() {
            this.loading = true;
            try {
                // Передаем фильтры прямо в API запрос
                const response = await deviceApi.index(this.filters);
                this.items = response.data.data;
            } finally {
                this.loading = false;
            }
        }
    }
});