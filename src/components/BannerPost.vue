<script setup>
// import livewire from '/livewire-second.png';
import { getDate } from '../helpers/helpers.js'
import livewire from '/livewire.png';

const fecha = getDate();
</script>

<template>
    <div class="relative h-96">
        <!-- Efecto de opacidad -->
        <div class="absolute inset-0 w-full h-full bg-black opacity-85"></div>

        <picture>
            <source :srcset="livewire" type="image/png">
            <img :src="livewire" alt="Livewire banner example" class="w-full h-full object-cover">
        </picture>

        <!-- Contenedor del título -->
        <div class="absolute inset-0">

            <div class="flex flex-col items-center justify-center h-full">
                <h1 class="text-5xl font-bold text-white text-center font-roboto uppercase w-full 2xl:w-9/12">¿Comó
                    funciona la
                    comuniación
                    entre
                    componentes?
                </h1>
                <p class="text-white font-roboto pt-4 text-md capitalize md:text-md 2xl:text-2xl">Publicado por:
                    <span class="text-text">
                        DeveroCode</span>
                </p>
                <p class="text-white font-roboto text-md capitalize md:text-md 2xl:text-2xl">Fecha:
                    {{ fecha }}
                </p>
            </div>
        </div>
    </div>
</template>