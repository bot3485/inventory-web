<script setup>
import { onMounted, ref } from 'vue';
import { useMeStore } from '@/stores/me/store';


const meStore = useMeStore();
const me = ref([]);

onMounted(async () => {
    // Запускаем всё параллельно, чтобы не ждать по очереди
    const response = await meStore.fetchAll();
    me.value = response;
});
</script>

<template>
    <div>
        здесь должна быть информация о том кто аутентифицирован
    </div>
    <table>
        <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ROLE</th>
        </tr>
        <tr>
            <td>{{ me.id }}</td>
            <td>{{ me.name }}</td>
            <td>{{ me.email }}</td>
            <td>{{ me.role }}</td>
        </tr>
    </table>
</template>

<style>
table,
th,
td {
    border: 1px solid black;
}
</style>