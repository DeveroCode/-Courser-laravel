<script setup>
import VSCode from '@/components/VSCode.vue';
const controller = `Route::get('/dashboard/show-list-books', [LibroController::class, 'showLibros'])->name('dashboard.show');`;
const ruta = `public function showLibros()
{
    $libros = Libro::with('autores')->get();
    return view('administrator.show', ['libros' => $libros]); <!-- Esta variable se recibe en la vista -->
}`;


const vista = `<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Inventario de libros') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            @if (session()->has('message'))
                <div x-data="{show: true}" x-init="setTimeout(() => show = false, 3000)" x-show="show">
                    <div class="uppercase border border-green-600 bg-green-100 text-green-600 font-bold 
                    p-2 my-3 text-sm text-center">
                        {{ session('message') }}
                    </div>
                </div>
            @endif
            <div class="overflow-hidden">
                <div class="md:flex md:justify-center text-2xl">
                    <livewire:mostrar-libros> <!-- componente encargado de mostrar los datos -->
                </div>
            </div>
        </div>
    </div>
</x-app-layout>`;

const componente = `<div class="w-full h-auto">
{{-- Bar seach --}}
<livewire:filtrar-isbn>


    <table class="table-auto text-xs w-full m-auto border-collapse bg-white text-left text-gray-500">
        <thead class="bg-gray-50">
            <tr>
                <th class="w-1/3 px-3 py-4  font-medium text-gray-900">Título</th>
                <th class="px-3 py-4  font-medium text-gray-900">Estado</th>
                <th class="px-3 py-4  font-medium text-gray-900 hidden lg:table-cell">Edición</th>
                <th class="px-3 py-4  font-medium text-gray-900 hidden lg:table-cell">Categoría</th>
                <th class="px-3 py-4  font-medium text-gray-900">Herramientas</th>
            </tr>
        </thead>
        @foreach ($libros as $libro) <!-- Cachamos la variable $libros -->
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            <tr class="hover:bg-gray-50">
                {{-- Titulo y Autores --}}
                <th class="flex gap-3 px-3 py-2 font-normal text-gray-900">
                    <div class="text-sm">
                        <div class="font-medium text-gray-700 capitalize">{{ $libro->titulo }}</div>
                        <div class="text-gray-400 capitalize">
                            {{-- Autores --}}
                            @foreach ($libro->autores as $autor)
                            {{ $autor->autor }}
                            @endforeach
                        </div>
                    </div>
                </th>

                {{-- Disponibles --}}
                <td class="table-cell px-6 py-4">
                    <span
                        class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        <span class="h-1.5 w-1.5 rounded-full bg-green-600 capitalize"></span>
                        Disponibles {{ $libro->cantidad }}
                    </span>
                </td>

                {{-- Edicion --}}
                <td class="px-2 py-2 hidden lg:table-cell capitalize">{{ $libro->edicion }}</td>
                {{-- Categoria --}}
                <td class="hidden lg:table-cell px-2 py-2">
                    <div class="flex gap-2">
                        @switch($libro->categoria->id)
                        @case(1)
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-sea-100 px-2 py-1 text-xs capitalize font-semibold text-blue-600">
                            {{ $libro->categoria->categoria}}
                        </span>
                        @break
                        @case(2)
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-1 text-xs capitalize font-semibold text-blue-600">
                            {{ $libro->categoria->categoria}}
                        </span>
                        @break
                        @case(3)
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs capitalize font-semibold text-blue-600">
                            {{ $libro->categoria->categoria}}
                        </span>
                        @break
                        @case(4)
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs capitalize font-semibold text-blue-600">
                            {{ $libro->categoria->categoria}}
                        </span>
                        @break
                        @case(5)
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs capitalize font-semibold text-blue-600">
                            {{ $libro->categoria->categoria}}
                        </span>
                        @break
                        @case(6)
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs capitalize font-semibold text-blue-600">
                            {{ $libro->categoria->categoria}}
                        </span>
                        @break
                        @case(7)
                        <span
                            class="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs capitalize font-semibold text-blue-500">
                            {{ $libro->categoria->categoria}}
                        </span>
                        @break
                        @default
                        @endswitch
                        {{-- <span
                            class="inline-flex items-center gap-1 rounded-full bg-sea-100 px-2 py-1 text-xs capitalize font-semibold text-blue-600">
                            {{ $libro->categoria->categoria}}
                        </span> --}}
                    </div>
                </td>
                {{-- Herramientas --}}
                <td class="table-cell py-4">
                    <div class="flex items-center gap-4 text-indigo-600 text-base">
                        <a href="{{ route('show.books', $libro->id) }}">
                            <i class="fa-solid fa-eye"></i>
                        </a>
                        {{-- pasa los nombres de los autores de cada libro --}}
                        <button wire:click="$emit('delete', {{ $libro->id }})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <a href="{{ route('dashboard.edit', $libro->id) }}">
                            <i class="fa-solid fa-pen"></i>
                        </a>
                    </div>
                </td>

            </tr>
        </tbody>
        @endforeach
    </table>

    {{-- Paginate --}}
    <div class="mt-10">
        {{ $libros->links() }}
    </div>
</div>`;
</script>

<template>
    <div class="px-14 py-20">
        <main>
            <h1 class="text-3xl font-bold text-title font-roboto capitalize">Read</h1>
            <p class="font-light font-roboto text-lg mt-10">Empecemos con la recuperación de datos, esto se refiere a
                leer la información almacenada dentro de nuestra base de datos y de igual manera mostrárselo al usuario.
            </p>
        </main>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Definiendo la ruta</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Vamos a crear una nueva ruta la cual renderizar todos
                nuestros libros, de igual manera sera de tipo get.</p>

            <VSCode :code="controller" />

            <div class="py-10 bg-red-200 border-l-8 border-red-800 px-4">
                <p class="text-xl font-light font-roboto text-red-600">
                    Aunque nuestro controlador ya incluye una función show, utilizaremos esa función mas adelante para
                    otra opción, por
                    lo
                    cual sera necesario crear una función aparte.
                </p>
            </div>

            <VSCode :code="ruta" />
        </section>
        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Renderizar datos en la vista</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Para renderizar nuestros libros, simplemente utilizaremos el
                modelo junto con la función get(). Esta función se encargará de realizar una consulta a nuestra base de
                datos y extraer todos los libros almacenados en ella. Luego, podremos utilizar esta información para
                mostrar los libros en la interfaz de usuario de nuestra aplicación. Es una forma sencilla y eficaz de
                obtener todos los registros de la tabla de libros y mostrarlos a los usuarios.
            </p>

            <VSCode :code="ruta" />

            <div class="py-10 bg-green-200 border-l-8 border-green-800 px-4">
                <p class="text-lg font-light font-roboto text-green-600">
                    Es necesario utilizar la función with, esto sera necesario para extraer los autores de cada libro
                </p>
            </div>

        </section>

        <section class="py-12 border-b border-gray-300">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">¿Cómo mostrar todos los datos?</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                Una vez que hemos pasado nuestra variable a nuestra vista, podemos renderizar esos datos dentro de
                nuestra interfaz de usuario. Sin embargo, antes de hacerlo, es necesario renderizar nuestro componente
                encargado de mostrar los datos. Esto asegurará que los datos se muestren correctamente y de manera
                ordenada en nuestra aplicación. Es importante tener este paso en cuenta para garantizar una presentación
                adecuada de la información en la interfaz de usuario.
            </p>

            <VSCode :code="vista" />

            <p class="font-light font-roboto text-lg mt-10">Perfecto. Una vez que tenemos nuestras variables de libros y
                autores, el siguiente paso es renderizarlas en nuestra interfaz de usuario. Hay varias formas de hacer
                esto, como utilizando un bucle while, for, etc. En este caso, optaremos por utilizar un bucle foreach
                debido a su simplicidad y claridad en la lectura del código.
            </p>

            <VSCode :code="componente" />

            <p class="font-light font-roboto text-lg mt-10">¡Excelente! Una vez que hemos renderizado nuestros datos, es
                hora de pasar al siguiente capítulo.</p>
        </section>

        <RouterLink :to="{ name: 'update' }"
            class="font-roboto text-xl font-bold pb-5 text-purple-600 mt-10 block text-end capitalize">
            actualización de datos
        </RouterLink>
    </div>
</template>