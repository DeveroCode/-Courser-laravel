<script setup>
import Membrete from '/logo.png';
import { RouterLink } from 'vue-router';
</script>

<template>
    <header class="flex items-center justify-between px-10 border-b border-gray-300">
        <RouterLink :to="{ name: 'start' }" class="flex items-center">
            <img :src="Membrete" alt="Membrete" class="w-12 py-3" />
            <h2 class="font-roboto text-title text-3xl font-bold">DeveroCode</h2>
        </RouterLink>

        <div class="space-x-10">
            <RouterLink to="{ name: 'start' }" class="font-roboto text-para text-lg font-bold">Guía</RouterLink>
            <RouterLink to="{ name: 'start' }" class="font-roboto text-para text-lg font-bold">Curso Youtube
            </RouterLink>
        </div>
    </header>
</template>