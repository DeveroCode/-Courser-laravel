<script setup>
import Header from '../components/Header.vue';
import { RouterView } from 'vue-router';
import Aside from '@/components/Aside.vue'
</script>

<template>
    <div>
        <Header class="fixed bg-white w-full" />
        <section class="grid grid-cols-12 justify-center">
            <Aside class="col-span-3 h-screen overflow-y-auto fixed left-0 bg-white mt-[73px] top-0" />

            <div class="col-span-12 overflow-y-auto pl-80 py-10">
                <RouterView />
            </div>
        </section>
    </div>
</template>