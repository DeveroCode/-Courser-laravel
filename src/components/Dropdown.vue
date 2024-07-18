<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
defineProps({
    selectTitle: {
        type: String,
    },
});

const router = useRoute();

const menuOpen = ref(false);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};


watch(() => router.path, () => {
    menuOpen.value = false;
});

</script>

<template>
    <div class="relative">
        <button @click="toggleMenu" type="button" class="font-roboto font-light px-7 py-3 text-para group p-4 inline-flex items-center rounded-md bg-white
            text-lg" :class="menuOpen ? 'translate-b-4' : 'translate-b-0'" :aria-expanded="menuOpen.toString()">
            <span>{{ selectTitle }}</span>
            <svg :class="{ 'rotate-180 duration-300': menuOpen, 'duration-300': !menuOpen }"
                class="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd" />
            </svg>
        </button>

        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4">
            <div v-if="menuOpen"
                class="absolute left-[190px] z-10 w-screen max-w-md transform -translate-x-1/2 px-2 sm:px-0">
                <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div class="1tive grid bg-gray-50 px-5 py-6 sm:gap-8 sm:p-8">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>