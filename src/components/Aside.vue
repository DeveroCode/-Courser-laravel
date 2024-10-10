<script setup>
import { ref } from 'vue';
import Drodown from './Dropdown.vue';

</script>

<template>
    <aside class="border-r border-gray-200 h-screen">
        <nav class="mt-10 flex flex-col static">
            <RouterLink :to="{ name: 'start' }" class="font-roboto block text-para font-light px-7 py-3"
                ref="livewireLink">
                <p class="text-lg">Curso DeveroCode</p>
            </RouterLink>

            <Drodown selectTitle="Introducción">
                <RouterLink :to="{ name: 'introduccion' }"
                    class="font-roboto block text-para font-light border-l-4 px-7 py-3">
                    <p class="text-md">Introducción básica</p>
                </RouterLink>
                <RouterLink :to="{ name: 'MVC-laravel' }"
                    class="font-roboto block text-para font-light border-l-4 px-7 py-3">
                    <p class="text-md">MVC en laravel</p>
                </RouterLink>
                <RouterLink :to="{ name: 'endpoints' }"
                    class="font-roboto block text-para font-light border-l-4 px-7 py-3">
                    <p class="text-md">End-points</p>
                </RouterLink>
            </Drodown>

            <Drodown selectTitle="Livewire">
                <RouterLink :to="{ name: 'livewire' }"
                    class="font-roboto block text-para  font-light border-l-4 px-7 py-3">
                    <p class="text-md">Iniciando en Livewire</p>
                </RouterLink>
                <RouterLink :to="{ name: 'create' }"
                    class="font-roboto block text-para  font-light border-l-4 px-7 py-3">
                    <p class="text-md">Crear un objeto</p>
                </RouterLink>
                <RouterLink :to="{ name: 'read' }" class="font-roboto block text-para  font-light border-l-4 px-7 py-3">
                    <p class="text-md">Leer datos</p>
                </RouterLink>
                <RouterLink :to="{ name: 'delete' }"
                    class="font-roboto block text-para  font-light border-l-4 px-7 py-3">
                    <p class="text-md">Eliminar nuestro libro</p>
                </RouterLink>
                <RouterLink :to="{ name: 'update' }"
                    class="font-roboto block text-para  font-light border-l-4 px-7 py-3">
                    <p class="text-md">Actualizar nuestro objeto</p>
                </RouterLink>
            </Drodown>

            <Drodown selectTitle="Livewire Avanzado">
                <RouterLink :to="{ name: 'emit' }" class="font-roboto block text-para  font-light border-l-4 px-7 py-3">
                    <p class="text-md">¿Que son los emits?</p>
                </RouterLink>
                <RouterLink :to="{ name: 'segunda' }"
                    class="font-roboto block text-para  font-light border-l-4 px-7 py-3">
                    <p class="text-md">Emits - Listeners pro</p>
                </RouterLink>
            </Drodown>

            <Drodown selectTitle="Extras">
                <RouterLink :to="{ name: 'excel' }"
                    class="font-roboto block text-para  font-light border-l-4 px-7 py-3">
                    <p class="text-md">Exportar información</p>
                </RouterLink>
                <RouterLink :to="{ name: 'graficas' }"
                    class="font-roboto block text-para  font-light border-l-4 px-7 py-3">
                    <p class="text-md">Graficas</p>
                </RouterLink>
                <RouterLink :to="{ name: 'validacion' }"
                    class="font-roboto block text-para  font-light border-l-4 px-7 py-3">
                    <p class="text-md">Validación</p>
                </RouterLink>
            </Drodown>
        </nav>
    </aside>
</template>