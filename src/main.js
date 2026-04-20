import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. Импортируем
import App from './App.vue'
import router from './router' // Если используешь роутер

const app = createApp(App)
const pinia = createPinia() // 2. Создаем экземпляр

app.use(pinia) // 3. Подключаем к приложению
app.use(router)

app.mount('#app')