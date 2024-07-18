<script setup>
</script>
<script setup>
import VSCode from '@/components/VSCode.vue';

const format = `<?php

namespace App\Http\Livewire;

use App\Models\Libro;
use Livewire\Component;

class MostrarLibros extends Component
{
    public function render()
    {
        return view('livewire.mostrar-libros');
    }
}
`;
const ruta = `return view('livewire.mostrar-libros'); <= vista
MostrarLibro.php <= Controlador de livewire`;

const componente =`<div class="md:flex md:justify-center p-5 text-2xl">
    <livewire:crear-libro/>
</div>`;
</script>

<template>
    <main class="py-10 px-14">
        <section>
            <h1 class="text-3xl font-bold text-title font-roboto capitalize">Estructura del controlador en livewire</h1>

            <div class="pt-12">
                <p class="font-light font-roboto text-lg mt-10">Como se había menciona en el capitulo anterior, livewire
                    implementa sus propios controladores para un
                    mejor rendimiento a la hora del deployment de la aplicación.</p>

                <p class="font-light font-roboto text-lg mt-10">En este caso, el controlador se encarga de mostrar las
                    vista a traves de la función render.</p>
                <VSCode :code="format" />
            </div>

            <div class="bg-purple-200 border-l-8 border-purple-800 py-10 px-14">

                <p class="font-roboto text-lg text-purple-900 font-bold">Dato Curioso!
                </p>
                <span class="font-roboto text-lg text-purple-700">Los controladores de livewire aceptan variables, es
                    decir podemos
                    enviar variables a traves de
                    nuestras vistas, al igual que vue Js</span>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Ademas del metodo render, un componente livewire puede
                contener métodos para manejar acciones del usuario, como clicks, validación de datos, etc.</p>
        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Directorios</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Ahora, usualmente para ingresar hacia un directorio
                utilizamos "/", sin embargo, en laravel se ingresa utilizando un punto ".". Entonces, cada vez que
                ocupemos renderizar una vista en livewire, necesitamos colocar un "." como se ve en el siguiente
                ejemplo.</p>

            <VSCode :code="ruta" />

            <p class="font-light font-roboto text-lg mt-10 border-b border-gray-200 pb-3">Esta estructura de directorios
                ayuda a mantener la
                coherencia en el desarrollo de componentes Livewire y facilita la navegación y localización de archivos
                dentro de la aplicación</p>
        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Importar componentes</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Para implementar nuestros componentes, livewire implementa
                una funcionalidad sencilla para importar sus componentes, entonces, para ello ocuparemos la etiqueta
                "livewire:crear-libro"</p>

            <VSCode :code="componente" />
        </section>

        <RouterLink :to="{ name: 'interaccion' }"
            class="font-roboto text-xl font-bold pb-5 text-purple-600 mt-10 block text-end capitalize">
            interacción con livewire
        </RouterLink>
    </main>
</template>