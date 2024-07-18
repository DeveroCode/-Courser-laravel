<script setup>
import VSCode from '@/components/VSCode.vue';

const ruta = `Route::get('/dashboard/create', [LibroController::class, 'create'])->name('dashboard.create');`;
const create = `public function create()
{
    //
    return view('administrator.create');
}`;


const vista = `<x-app-layout> <!-- Vista principal -->
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Agregar nuevo libro') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <h2 class="mb-10 text-center text-sm mt-10 font-bold uppercase">{{ '¡Bienvenido ' 
                    . Auth::user()->name .
                    ' al panel de "Agregar Nuevo Libro"!. Esta sección te permite agregar nuevos 
                    libros en línea de una manera fácil y sencilla.'}}</h2>

                <div class="md:flex md:justify-center p-5 text-2xl">
                    <livewire:crear-libro/> <!-- componente -->
                </div>
            </div>
        </div>
    </div>
</x-app-layout>`;

const modelos = `<form class="md:w-1/2" wire:submit.prevent='crearLibro'> <!-- Evento hacia el backend -->
    <div>
        <x-input-label for="titulo" :value="__('Titulo del libro')" class="uppercase" />
        <x-text-input id="titulo" class="block mt-1 w-full" type="text" wire:model="titulo"
        :value="old('titulo')"
            placeholder="Ej: calculo diferencial" /> <!-- Modelo -->
        <x-input-error :messages="$errors->get('titulo')" class="mt-2" /> <!-- Error de validación -->
    </div>
</form>`;

const variables = `class CrearLibro extends Component
{
    public $titulo;
}`;

const crearLibro = `public function crearLibro()
{
    $datos = $this->validate(); <!-- Validación de los datos -->
    // Convert to lowercase
    $datos['autores'] = strtolower($datos['autores']); <!-- Vinculamos cada dato a una variable -->
    $datos['titulo'] = strtolower($datos['titulo']);
    $datos['edicion'] = strtolower($datos['edicion']);
    $datos['categoria_id'] = strtolower($datos['categoria']);
    $datos['estante_id'] = strtolower($datos['estante']);
    $datos['descripcion'] = strtolower($datos['descripcion']);
    $autores = explode(',', $datos['autores']);
}`;

const insertarLibro = `public function crearLibro()
{
    // Crear el libro
    $libro = Libro::create([
        'titulo' => $datos['titulo'], <!-- Vinculamos cada dato a una variable -->
        'edicion' => $datos['edicion'],
        'tomo' => $datos['tomo'],
        'paginas' => $datos['paginas'],
        'categoria_id' => $datos['categoria'],
        'estante_id' => $datos['estante'],
        'fecha' => $datos['fecha'],
        'cantidad' => $datos['cantidad'],
        'isbn' => $datos['isbn'],
        'descripcion' => $datos['descripcion'],
        'imagen' => $datos['imagen'],
        'user_id' => auth()->user()->id,
    ]);
}`;

const modelWithCol = `class Libro extends Model
{
    use HasFactory;

    protected $casts = [
        'fecha' => 'datetime:d-m-Y',
    ];

    protected $fillable = [
        'titulo' <!-- Estos campos son los que se guardan en la base de datos -->,
        'edicion',
        'autores_id',
        'tomo',
        'paginas',
        'categoria_id',
        'estante_id',
        'fecha',
        'cantidad',
        'isbn',
        'descripcion',
        'imagen',
        'user_id',
    ];`;
</script>

<template>
    <main class="px-14 py-20">
        <h1 class="text-3xl font-bold text-title font-roboto capitalize">Create</h1>

        <section class="pt-12">
            <p class="font-light font-roboto text-lg mt-10">En los siguientes capítulos entenderás como crear un CRUD
                junto con livewire, comencemos con la letra C.</p>
        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Definiendo la ruta</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Anteriormente habíamos hablado sobre como crear una ruta
                correcta, entonces, empecemos creando una ruta de tipo get para la creación de nuestro libro.</p>

            <VSCode :code="ruta" />

            <p class="font-light font-roboto text-lg mt-10">Una vez creado nuestra ruta, nos colocaremos en nuestro
                controlador, tomando de ejemplo, LibroController.php, dentro de este controlador, nos colocaremos en la
                función create, en ella seleccionaremos la vista que vamos renderizar.
            </p>

            <VSCode :code="create" />

            <p class="font-light font-roboto text-lg mt-10">Ahora, en nuestro proyecto manejamos una pantalla principal
                la cual le da la bienvenida al usuario en cada vista, dentro de esta misma importaremos nuestro
                componente livewire</p>


            <VSCode :code="vista" />
        </section>

        <section class="py-12 border-b-2 border-gray-200">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Modelos</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Ahora, vamos a desarrollar nuestros modelos para almacenar y
                gestionar la información de nuestra aplicación. Utilizaremos la directiva wire:model para enlazar los
                campos de entrada en el front-end con los atributos del modelo en el back-end. Es crucial que el nombre
                del modelo sea idéntico tanto en el front-end como en el back-end para garantizar una comunicación
                adecuada entre ambos.</p>

            <VSCode :code="modelos" />

            <p class="font-light font-roboto text-lg mt-10">Una vez que hayamos definido todos nuestros modelos,
                tendremos que declararlos dentro de nuestro controlador. Es fundamental recordar que el controlador al
                que nos referimos en este caso es CrearLibro.php.
            </p>

            <VSCode :code="variables" />

            <p class="font-light font-roboto text-lg mt-10">Como mencionamos al principio, para establecer una conexión
                o vincular una función desde nuestro componente hacia el controlador, utilizaremos la directiva
                wire:submit.prevent='crearLibro'. De la misma manera, en el controlador debemos tener una función
                correspondiente llamada crearLibro para recibir esta acción. </p>

            <VSCode :code="crearLibro" />

            <p class="font-light font-roboto text-lg mt-10">Una vez que todos los datos estén vinculados, podemos
                proceder a crear nuestro libro. Laravel ofrece una manera sencilla de realizar esta acción: simplemente
                necesitamos importar el modelo Libro en nuestro controlador y utilizar la función create. Laravel se
                encargará automáticamente de ejecutar la consulta necesaria para insertar los datos en la base de datos.
            </p>

            <VSCode :code="insertarLibro" />
            <VSCode :code="modelWithCol" />
        </section>

        <RouterLink :to="{ name: 'read' }"
            class="font-roboto text-xl font-bold pb-5 text-purple-600 mt-10 block text-end capitalize">
            renderizar datos
        </RouterLink>
    </main>
</template>