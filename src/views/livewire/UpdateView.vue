<script setup>
import VSCode from '@/components/VSCode.vue';
const controller = `Route::get('/dashboard/{libro}/edit', [LibroController::class, 'edit'])->name('dashboard.edit');`;
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
const input = `<div>
<x-input-label for="titulo" :value="__('Título del libro')" class="uppercase" />
<x-text-input id="titulo" class="block mt-1 w-full" type="text" wire:model="titulo" :value="old('titulo')"
    placeholder="Ej: calculo diferencial" />
<x-input-error :messages="$errors->get('titulo')" class="mt-2" />
</div>`;

const variable = `class EditarLibro extends Component
{
    public $libro_id;
    public $titulo;
    public $autores;
    public $edicion;
    public $tomo;
    public $categoria;
    public $fecha;
    public $cantidad;
    public $isbn;
    public $descripcion;
    public $imagen;
    public $imagen_nueva;

    use WithFileUploads; <!-- Para subir imagenes -->
}`;

const libro = `class EditarLibro extends Component{
    public function editarLibro()
    {
        $datos = $this->validate();

        //verificamos si existe una nueva imagen
        if ($this->imagen_nueva) {
            $imagen = $this->imagen_nueva->store('public/libros');
            $datos['imagen'] = str_replace('public/libros', '', $imagen);
        }
        // Encontramos el libro a actualizad de acuerdo al id seleccionado
        $libro = Libro::find($this->libro_id);
        // asignamos los nuevos valores
        $libro->titulo = $datos['titulo'];
        $libro->edicion = $datos['edicion'];
        $libro->tomo = $datos['tomo'];
        $libro->categoria_id = $datos['categoria'];
        $libro->fecha = $datos['fecha'];
        $libro->cantidad = $datos['cantidad'];
        $libro->isbn = $datos['isbn'];
        $libro->descripcion = $datos['descripcion'];
        $libro->imagen = $datos['imagen'] ?? $libro->imagen;

        
        $libro->save();
        // Dirigimos a la vista principal
        session()->flash('message', 'Libro actualizado correctamente');
        return redirect()->route('dashboard.show');
    }
}`;
const mount = `class EditarLibro extends Component{
    public function mount(Libro $libro)
    {
        $this->libro_id = $libro->id;
        $this->titulo = $libro->titulo;
        $this->edicion = $libro->edicion;
        $this->tomo = $libro->tomo;
        $this->categoria = $libro->categoria_id;
        $this->fecha = Carbon::parse($libro->fecha)->format('Y-m-d');
        $this->cantidad = $libro->cantidad;
        $this->isbn = $libro->isbn;
        $this->descripcion = $libro->descripcion;
        $this->imagen = $libro->imagen;

        $autores = $libro->autores;
        $autores_array = [];
        foreach ($autores as $autor) {
            $autores_array[] = $autor->autor;
        }
        $this->autores = implode(', ', $autores_array);

    }
}`;

const form = `<form class="md:w-1/2" wire:submit.prevent='editarLibro'></form>`;
</script>

<template>
    <div class="px-14 py-20">
        <main>
            <h1 class="text-3xl font-bold text-title font-roboto capitalize">Update</h1>
            <p class="font-light font-roboto text-lg mt-10">La operación de actualización se refiere a la acción de
                modificar un elemento de nuestro objeto libro.
                En el contexto de nuestra aplicación web, esta función de actualización nos permite modificar los datos
                de un libro cuando sea necesario o cuando se cometa un error en un registro.
            </p>
        </main>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Definiendo la ruta</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Vamos a crear una nueva ruta la cual renderizar todos
                nuestros libros, de igual manera sera de tipo get.</p>

            <VSCode :code="controller" />

            <div class="py-10 bg-purple-200 border-l-8 border-purple-800 px-4">
                <p class="text-lg font-light font-roboto text-purple-600">
                    Para actualizar un dato de nuestro libro, es necesario pasar el id del libro a actualizar a traves
                    de
                    la URL, en este caso, nuestro id sera libro
                </p>
            </div>
        </section>
        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Renderizar los datos obtenidos</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Ahora, en nuestra vista tenemos una sección llamada
                herramientas a traves de ellas podremos actualizar, eliminar y ver la información completa del libro,
                pero, ¿como sabemos cual libro eliminar, ver o actualizar?</p>

            <VSCode :code="herramientas" />

        </section>

        <section class="py-12 border-b border-gray-300">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Actualizando datos</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                Ahora, para renderizar los datos del libro obtenido será sencillo gracias a la biblioteca. La tarea
                de
                renderizar los datos se simplifica considerablemente al utilizar la función "old", que nos permite
                acceder fácilmente al dato específico que necesitamos. Esta característica de
                la
                biblioteca facilita la manipulación de los datos y su presentación en la interfaz de usuario, lo que
                mejora la experiencia del usuario y la eficiencia del desarrollo.
            </p>
            <VSCode :code="input" />

            <p class="font-light font-roboto text-lg mt-10">De igual manera, será necesario colocar las variables en
                nuestro controlador "EditarLibro.php". Esto garantiza que los datos actualizados del libro se envíen
                correctamente al controlador para su procesamiento y almacenamiento en la base de datos. Al asignar las
                variables en el controlador, aseguramos una gestión eficaz de los datos y su integración con la lógica
                de negocio de la aplicación.</p>

            <VSCode :code="variable" />

            <p class="font-light font-roboto text-lg mt-10">Ahora será necesario montar nuestro libro. La función mount
                se encarga de inicializar las propiedades del componente, es decir, todos sus datos como nombre,
                autores, tomo, etc. Esta acción es crucial para asegurar que el componente esté completamente preparado
                para mostrar la información del libro de manera correcta al cargar la página.</p>

            <VSCode :code="mount" />

            <p class="font-light font-roboto text-lg mt-10">Listo, ahora es necesario enlazar los nuevos datos con los
                anteriores, es decir, a través de la función editarLibro que hemos declarado en nuestro formulario. Con
                esto, podremos actualizar los datos de nuestro libro con la información recién modificada.</p>

            <VSCode :code="form" />
            <VSCode :code="libro" />

            <p class="font-light font-roboto text-lg mt-10">Listo hemos actualizado los datos del libro.</p>
        </section>

        <RouterLink :to="{ name: 'delete' }"
            class="font-roboto text-xl font-bold pb-5 text-purple-600 mt-10 block text-end capitalize">
            eliminar un objeto
        </RouterLink>
    </div>
</template>