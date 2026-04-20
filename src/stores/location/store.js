import { defineStore } from 'pinia';
import api from '@/api/index'; // Используем общий конфиг, так как эндпоинт простой

export const useLocationStore = defineStore('locationStore', {
    state: () => ({
        items: [],
        loading: false
    }),

    actions: {
        async fetchItems() {
            this.loading = true;
            try {
                // На бэкенде у нас Route::apiResource('locations', ...)
                const response = await api.get('/locations');
                this.items = response.data.data;
            } catch (error) {
                console.error("Ошибка загрузки локаций:", error);
            } finally {
                this.loading = false;
            }
        }
    }
});