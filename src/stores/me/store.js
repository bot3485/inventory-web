import { defineStore } from 'pinia';
import meApi from '@/api/me';

export const useMeStore = defineStore('meStore', {
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
        async fetchAll() {
            this.loading = true;
            try {
                // Передаем фильтры прямо в API запрос
                const response = await meApi.index(this.filters);
                this.items = response.data;
                return response.data;
            } catch (error) {

            } finally {
                this.loading = false;
            }
        }
    }
});