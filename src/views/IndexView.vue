<script setup>
import BannerPost from '@/components/BannerPost.vue';
import { getDate } from '@/helpers/helpers';
import { RouterLink } from 'vue-router';

const fecha = getDate();
</script>

<template>
    <section class="px-14 py-10">
        <div class="border-b-2 border-b-gray-200 py-10">
            <h1 class="text-3xl font-bold text-title font-roboto text-center capitalize">curso intensivo Livewire
                DeveroCode</h1>

            <p class="text-title text-xl font-roboto font-light mt-10 px-10">En esta guía está diseñada para entender de
                manera más clara el código del proyecto Bibliotech, de manera más amigable.</p>

            <div class="bg-primary py-10 border-l-8 border-purple-600 mt-10 w-11/12 mx-auto">
                <div class="px-10">
                    <h2 class="uppercase mb-2 font-bold text-title font-roboto text-2xl">Curso en YouTube totalmente
                        gratis!</h2>
                    <span class="font-roboto text-2xl font-light">Aprende más sobre el desarrollo web <a
                            href="https://youtu.be/iD2LeiI5RDE?si=ihlVFvGMe3Fk9TDR" target="_blank"
                            class="text-purple-700 font-roboto text-2xl font-bold capitalize">desarrolla tu primer
                            página web desde cero</a></span>
                </div>
            </div>

            <p class="text-xl font-roboto mt-10 block text-end text-title font-bold px-14">Actualizado el: <span
                    class="font-light"> {{ fecha }}</span></p>
        </div>

        <RouterLink :to="{ name: 'introduccion' }"
            class="font-roboto text-xl font-bold text-purple-600 mt-10 block text-end pr-14">
            Introducción al codigo
        </RouterLink>
    </section>
</template>