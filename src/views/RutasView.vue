<script setup>
import VSCode from '@/components/VSCode.vue';

const ruta = `Route::get('/', function(){
    return view('welcome');
});`

const rName = ` Route::get('/dashboard/show-list-books', [LibroController::class, 'showLibros'])->name('dashboard.show');`

const trueView = `<x-slot name="content">
    <x-dropdown-link :href="route('dashboard.show') => Ruta nombrada. Muestra los datos de los libros"
        :active="request()->routeIs('dashboard.show')">
        {{ __('Libros') }}
    </x-dropdown-link>

    {{-- Print reports --}}
    <x-dropdown-link :href="route('dashboard.create')"
        :active="request()->routeIs('dashboard.create')">
        {{ __('Agregar') }}
    </x-dropdown-link>

    <x-dropdown-link :href="route('dashboard.print')"
        :active="request()->routeIs('dashboard.print')">
        {{ __('Imprimir reportes') }}
    </x-dropdown-link>
</x-slot>`

const falseView = `<x-slot name="content">
    <x-dropdown-link :href="route('/dashboard/show/books') => Ruta por defecto. Muestra los datos de los libros"
        :active="request()->routeIs('dashboard.show')">
        {{ __('Libros') }}
    </x-dropdown-link>
</x-slot>`
</script>

<template>
    <main class="px-14 py-10">
        <h1 class="text-3xl font-bold text-title font-roboto capitalize">creación correcta de rutas</h1>

        <p class="font-light font-roboto text-lg mt-10">Crear una ruta correcta en nuestra aplicación nos ayudará con
            nuestras vistas. Aunque Laravel facilita la creación de rutas, hacerlo de esta manera puede complicarnos la
            vida.
        </p>

        <VSCode :code="ruta" />

        <p class="font-light font-roboto text-lg mt-10">En realidad, esta forma de declarar las rutas es común, pero a
            la hora de asignar un nombre a nuestras rutas, facilitara el manejo de las mismas.
        </p>

        <VSCode :code="rName" />

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Ventajas</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Al nombrar las rutas, sera mas sencillo redireccionar al
                pelado a la siguiente vista que dirija nuestro endpoint</p>

            <VSCode :code="rName" />
            <VSCode :code="trueView" />

            <p class="font-light font-roboto text-lg mt-10">Caso contrario, para cada redirección a una vista sera
                necesario implementar la url directa, y si es solicitado cambiar el nombre de la ruta, sera necesario
                verificar en todas nuestras vistas la url a cambiar.</p>

            <VSCode :code="falseView" />
        </section>
        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Desventajas</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">No existen :)</p>
        </section>

        <RouterLink :to="{ name: 'endpoints' }"
            class="font-roboto text-xl font-bold pb-5 text-purple-600 mt-10 block text-end capitalize">
            End-points
        </RouterLink>
    </main>
</template>