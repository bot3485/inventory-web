import { defineStore } from 'pinia';
import vendorApi from '@/api/vendors';
import typeApi from '@/api/deviceTypes';

export const useCatalogStore = defineStore('catalogStore', {
    state: () => ({
        vendors: [],
        types: [],
        loading: false,
        isLoaded: false
    }),

    actions: {
        async fetchAll() {
            if (this.isLoaded) return; // Если уже загружено, выходим

            this.loading = true;
            try {
                const [vRes, tRes] = await Promise.all([
                    vendorApi.index(),
                    typeApi.index()
                ]);
                
                this.vendors = vRes.data.data;
                this.types = tRes.data.data;
                this.isLoaded = true;
            } catch (error) {
                console.error("Ошибка каталогов:", error);
            } finally {
                this.loading = false;
            }
        }
    }
});