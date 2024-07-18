<script setup>
import VSCode from '@/components/VSCode.vue';
const herramientas = `{{-- Herramientas --}}
<td class="table-cell py-4">
    <div class="flex items-center gap-4 text-indigo-600 text-base">
        <a href="{{ route('show.books', $libro->id) }}">
            <i class="fa-solid fa-eye"></i>
        </a>
        {{-- pasa los nombres de los autores de cada libro --}}
        <button wire:click="$emit('delete', {{ $libro->id }})"> <!-- Eliminar pasamos el id -->
            <i class="fa-solid fa-trash"></i>
        </button>
        <a href="{{ route('dashboard.edit', $libro->id) }}"> <!-- Editar pasamos el id -->
            <i class="fa-solid fa-pen"></i>
        </a>
    </div>
</td>
`;

const scripts = `@push('scripts')
<!-- Es necesario encerrar cada script dentro de signos mayores y menores <> -->
script src="https://kit.fontawesome.com/85d631ed4b.js" crossorigin="anonymous" <!-- Font Awesome -->

script src="https://cdn.jsdelivr.net/npm/sweetalert2@11" <!-- Sweet Alert -->
@endpush`;

const deleteBook = `@push('scripts')
{{-- Alert --}}
script
    Livewire.on('delete', (libroId, autorIds) => {
        Swal.fire({
        title: 'esta seguro de eliminar este libro?',
        text: "Recuerda que no se podra recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4FA755',
        cancelButtonColor: '#694A97',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
        }).then((result) => {
        if (result.isConfirmed) {
            // Delete book and authors
            Livewire.emit('deleteBook', libroId);
            Swal.fire(
            'Eliminado!',
            'El libro ha sido eliminado.',
            'success'
            )
        }
        })
    });
script
@endpush`;

const deleteBookWithAutores = `protected $listeners = ['deleteBook', 'leerDatos' => 'buscar']; <!-- Listener -->

public function deleteBook(Libro $libro)
{
    // Eliminar el libro y autor
    // Obtener los autores correspondientes al libro
    $autores = $libro->autores;
    // Obtener los autores correspondientes al libro
    $autores = $libro->autores;

    // Eliminar los autores correspondientes al libro
    foreach ($autores as $autor) {
        $autor->libros()->detach($libro->id);
        // Eliminar el autor si no tiene más libros relacionados
        if ($autor->libros()->count() == 0) {
            $autor->delete();
        }
    }

    // Eliminar el libro
    $libro->delete();

}`;
</script>

<template>
    <div class="px-14 py-20">
        <main>
            <h1 class="text-3xl font-bold text-title font-roboto capitalize">Delete</h1>
            <p class="font-light font-roboto text-lg mt-10">La operación de eliminar se refiere a la acción de
                eliminar.
                En el contexto de nuestra aplicación web, esta función de eliminar nos permite eliminar el registro
                completo de un libro de nuestra base de datos.
            </p>
        </main>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Eliminar</h3>
            </div>

            <div class="py-10 bg-purple-200 border-l-8 border-purple-800 px-4">
                <p class="text-lg font-light font-roboto text-purple-600">
                    Ahora, comúnmente deberíamos de crear una ruta con el termino Delete, pero en esta ocasión
                    eliminaremos el libro directamente de nuestra base de datos.
                </p>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Recordemos que en nuestras herramienta contamos con la
                función de eliminar</p>

            <VSCode :code="herramientas" />

            <p class="font-light font-roboto text-lg mt-10">Utilizaremos sweetalert para manejar los eventos y alertas
                para una mejor visualización al hacer la acción, para añadir script en laravel utilizaremos
                @push('scripts'), esto permitirá a nuestro componente recibir acciones a traves de java script</p>

            <VSCode :code="scripts" />

            <p class="font-light font-roboto text-lg mt-10">Seleccionaremos la alerta de eliminación, y configuraremos
                la alerta de la siguiente manera, principalmente pasaremos la función deleteBook, esto nos permitirá
                crear una acción en nuestro controller para eliminar nuestro libro.</p>
            <p class="font-light font-roboto text-lg mt-10">Ahora, nuestra función necesitara pasar el id del libro y
                los autoresId para eliminar a los autores junto con el libro, por lo tanto dentro de la función
                agregaremos dos variables una llamada: libroId y autorIds, entonces, si el usuario selecciona en el
                botón de si, eliminaremos el libro, pero en caso contrario, no se hará ninguna acción</p>

            <VSCode :code="deleteBook" />
        </section>

        <section class="pb-12 border-b border-gray-300">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Eliminación del libro</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Si hemos configurado todo correctamente, al momento que el
                usuario coloque el botón de si, se ejecutará la función deleteBook, la cual se encuentra en nuestro
                controlador. Entonces, aquí entramos a una nueva sección llamada listeners o emits, pero aun no veremos
                de lleno que son estas funciones, simplemente declararemos los listeners correspondientes.</p>

            <VSCode :code="deleteBookWithAutores" />

        </section>

        <RouterLink :to="{ name: 'emit' }"
            class="font-roboto text-xl font-bold pb-5 text-purple-600 mt-10 block text-end capitalize">
            emits
        </RouterLink>
    </div>
</template>