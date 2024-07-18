<script setup>
import VSCode from '@/components/VSCode.vue';

const inputsSearch = `<form  wire:submit.prevent='searchWord'>
    <div class="md:grid md:grid-cols-3 gap-5">
        <div class="mb-5">
            <label class="block mb-1 text-sm text-gray-700 uppercase font-bold " for="termino">Nombre del 
                libro
            </label>
            <input id="termino" type="text" placeholder="Buscar por Término: ej. Cálculo"
                wire:model="palabra" <!-- Modelo Palabra -->
                />
        </div>

        <div class="mb-5">
            <label class="block mb-1 text-sm text-gray-700 uppercase font-bold">Categoría</label>
            <select class="border-gray-300 p-2 w-full rounded-md" wire:model="categoria"> <!-- Modelo Categoría -->
                <option value="0">--Seleccione--</option>

                @foreach ($categorias as $categoria )
                    <option value="{{ $categoria->id }}">{{ $categoria->categoria }}</option>
                @endforeach
            </select>
        </div>
        <div class="mb-5">
            <label class="block mb-1 text-sm text-gray-700 uppercase font-bold">Editorial</label>
            <select class="border-gray-300 p-2 w-full rounded-md" wire:model="edicion"> <!-- Modelo Edición -->
                <option value="0">--Seleccione--</option>

                @foreach ($editoriales as $editorial )
                    <option value="{{ $editorial->edicion }}">{{ $editorial->edicion }}</option>
                @endforeach
            </select>
        </div>
    </div>

    <div class="flex justify-end">
        <button type="submit"
            <i class="fa-solid fa-magnifying-glass fa-flip-horizontal"></i>
            Buscar
        </button>
    </div>
</form>`;

const variableWithEmit = `class FiltrarBusquedas extends Component
{   
    <!-- modelos -->
    public $palabra;
    public $categoria;
    public $edicion;

    <!-- Escuchamos a traves de nuestro emit -->
    public function searchWord(){
        $this->emit('leerPalabra', $this->palabra, $this->categoria, $this->edicion);
    }
}`;

const viewFather = `<x-app-layout> <!-- Esta etiqueta se utiliza solo en las vistas
    principales -->
    <x-slot name="header">
        <x-slot name="header">
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight capitalize">
                {{ __('Buscando...') }}
            </h2>
    </x-slot>

    <div class="py-16 overflow-hidden lg:py-24">
        <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div class="relative">
                <h2 class="text-center text-4xl md:text-6xl leading-8 font-extrabold tracking-tight text-indigo-600 ">Encuentra 
                    tu libro de la mejor manera</h2>
                <p class="mt-4 max-w-3xl mx-auto text-center text-lg text-gray-500">busca entre 
                    {{ $libros_en_existencia }} libros disponibles</p>
            </div>

            <div>
                <!-- Componente hijo -->
                <livewire:filtrar-busquedas />
            </div>
        </div>

        <!-- Componente padre -->
        <livewire:mostrar-resultados />
    </div>
</x-app-layout>`;

const controller = `class MostrarResultados extends Component
{
    public $palabra;
    public $categoria;
    public $edicion;
}`;


const listeners = `class MostrarResultados extends Component
{   
    <!-- Recibimos el emit y los asociamos a una nueva función -->
    protected $listeners = ['leerPalabra' => 'search'];

    public function search($palabra, $categoria, $edicion)
    {
        $this->palabra = $palabra;
        $this->categoria = $categoria;
        $this->edicion = $edicion;
    }
}`;

const sentencia = `public function render()
{
    if($this->palabra || $this->categoria || $this->edicion){
        $libros = Libro::when($this->palabra, function($query){
            $query->where('titulo', 'LIKE', "%" . $this->palabra . "%");
        })->when($this->categoria, function($query){
            $query->where('categoria_id', $this->categoria);
        })->when($this->edicion, function($query){
            $query->where('edicion', $this->edicion);
        })->with('autores')->paginate(30);
    }else if(!is_null($this->categoria) && $this->categoria != 0 || !empty($this->edicion) && $this->edicion != 0){
        $libros = Libro::paginate(12);
    }else{
        $libros = Libro::paginate(12);
    }

    return view('livewire.mostrar-resultados', [
        'libros' => $libros <!-- Retornamos la variable libros a nuestra vista -->
    ]);
}`;


const render = `<div class="py-10">
    <div class="max-w-8xl mx-auto">
        <div class="py-6">
            <div class="flex flex-col md:flex-row flex-wrap gap-10 items-center justify-center">
                @foreach ($libros as $libro)
                    <div class="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden mb-5">
                        <div class="w-1/3 bg-cover">
                            <img src="{{ asset('storage/libros/' . $libro->imagen) }}" alt="Libro . {{ $libro->titulo }}">
                        </div>
                        <div class="w-2/3 p-4">
                            <h2 class="text-gray-900 font-bold text-2xl capitalize">{{ Str::limit($libro->titulo, 19) }}
                            </h2>
                            <p class="mt-2 text-gray-600 text-sm h-24">{{ Str::limit($libro->descripcion, 100) }}</p>
                            <div class="flex item-center capitalize">
                                @if ($libro->cantidad <= 10) <span
                                    class="inline-flex items-center gap-1 rounded-full px-2 py-1 mt-2 md:mt-0 text-xs capitalize font-semibold text-red-600 ml-2">
                                    <span class="h-1.5 w-1.5 rounded-full bg-red-600 capitalize"></span>
                                    Disponibles:{{ $libro->cantidad}}
                                    </span>
                                    @elseif($libro->cantidad === 0)
                                    <span
                                        class="inline-flex items-center gap-1 rounded-full text-xs capitalize font-semibold text-red-600 ml-2">
                                        Sin disponibilidad
                                    </span>
                                    @else
                                    <span
                                        class="inline-flex items-center gap-1 rounded-full text-xs font-semibold text-green-600 ml-2">
                                        <span class="h-1.5 w-1.5 rounded-full bg-green-600 capitalize"></span>
                                        Disponibles {{ $libro->cantidad}}
                                    </span>
                                @endif
                            </div>
                            <div class="flex item-center justify-between mt-5">
                                    <a type="submit"
                                        href="{{ route('show.books', $libro->id) }} }}"
                                        class="px-3 py-2 bg-indigo-500 hover:transition-all hover:bg-indigo-800 cursor-pointer hover:ease-out text-white text-xs font-bold uppercase rounded">mas
                                        información
                                    </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <div class="mt-10">
            {{ $libros->links() }}
        </div>
    </div>
</div>`;
</script>

<template>
    <div class="px-14 py-20">
        <main>
            <h1 class="text-3xl font-bold text-title font-roboto capitalize">Emit-Listeners en Livewire</h1>
            <p class="font-light font-roboto text-lg mt-10">Para asegurarnos que haz aprendido correctamente
                los conceptos emit y listeners, veamos otro ejemplo mas complejo, en este caso, vamos a crear un nuevo
                componente llamado FiltrarBusqueda, este componente nos ayudara a obtener una búsqueda mas personalizada
                para el usuario.
            </p>
        </main>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Emit - Filtrar Búsqueda</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Ahora, empecemos por declarar nuestro emit, para tener un
                mejor manejo en la búsqueda, utilizaremos tres campos, uno para la palabra, es decir, el libro que desea
                buscar, la segunda seria la categoría y la tercera la edición del libro que desea buscar.
            </p>

            <VSCode :code="inputsSearch" />

            <div class="py-12 border-l-8 border-green-800 bg-green-200 px-5">
                <p class="text-lg font-light font-roboto text-green-600">
                    En nuestro controlador sera importar el modelo categoria y editoriales para obtener la información y
                    poder renderizarla en nuestro front-end, a traves del foreach
                </p>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                En el controlador sera necesario declarar nuestras variables que ocuparemos para la búsqueda, asi mismo,
                declararemos el emit a que sera enviado a nuestro componente padre
            </p>

            <VSCode :code="variableWithEmit" />
        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Listeners - Filtrar Búsqueda</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Nos colocaremos en el la vista padre - componente, que en
                esta ocasión es search.blade.php, dentro de esta vista, vemos que tenemos dos componentes, uno es
                filtrar-busquedas, el cual es sera el encargado de emitir la palabra, categoria y edición hacia el
                componente padre. También, tenemos al componente padre, encargado de renderizar la información obtenida
                a traves de los listeners</p>

            <VSCode :code="viewFather" />

            <div class="py-12 border-l-8 border-purple-800 bg-purple-200 px-5">
                <p class="text-lg font-light font-roboto text-purple-600">
                    El codigo completo lo pueden encontrar en MostrarResultados.php y FiltrarBusquedas.php
                </p>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                Siguiendo la lógica inicial, estaríamos recibiendo tres variables en nuestro controlador padre, es
                decir, deberíamos de obtener, categoría, palabra y edicion, asi como el emit.
            </p>

            <VSCode :code="controller" />

            <p class="font-light font-roboto text-lg mt-10">
                Ahora, asociaremos nuestro emit hacia nuestra función search, es decir, a traves de un listener
                asociaremos nuestro emit. De igual manera, sera necesario pasar a traves de nuestra función las
                variables palabra, categoria y edicion
            </p>

            <VSCode :code="listeners" />

            <p class="font-light font-roboto text-lg mt-10">
                En la función render, aplicaremos un simple where, en el cual, deberemos sentenciar si es que el peleado
                a seleccionado alguna de las opciones
            </p>

            <!-- Advertencia -->
            <div class="bg-red-100 text-red-600 border-l-8 border-red-700 px-4 py-10 my-10">
                <p class="text-xl font-light font-roboto">La implementación del if dependerá de tus necesidades, es
                    decir, aquí estamos permitiendo que el usuario seleccione las opciones por separado o todas juntas.
                </p>
            </div>

            <VSCode :code="sentencia" />

            <p class="font-light font-roboto text-lg mt-10">
                Para finalizar, en nuestra vista renderizaremos los datos obtenidos a traves de un foreach, esto en el
                componente padre
            </p>


            <VSCode :code="render" />

            <div class="py-12 border-l-8 border-purple-800 bg-purple-200 px-5">
                <p class="text-lg font-light font-roboto text-purple-600">
                    Si renderizamos nuestros datos en una tabla, el foreach deberá quedar fuera de la tr que contengan
                    el nombre de nuestras rows, pero, no deberá quedar fuera de nuestra table, Un claro ejemplo es
                    mostrar-libros.blade.php
                </p>
            </div>
        </section>
    </div>
</template>