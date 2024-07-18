<script setup>
import VSCode from '@/components/VSCode.vue';

const searchAl = `<div class="max-w-7xl mx-auto">
    <form wire:submit.prevent="leerDatosBuscar" class="flex flex-wrap justify-between items-center">
        <div class="mb-5 w-full md:w-1/3 md:mr-4">
            <input type="text" placeholder="No. Control" name="word"
                class="rounded-md shadow-sm border-indigo-500 focus:border-indigo-400 focus:ring 
                focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                wire:model="no_institucional">
        </div>
        @error('word') <span class="error text-red-500">{{ $message }}</span> @enderror
        <div>
            <input type="submit"
                class="inline-flex items-center w-full px-5 py-2 mb-3 mr-1 text-sm font-bold text-white 
                no-underline align-middle bg-indigo-600 border border-transparent border-solid 
                rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-indigo-700 
                hover:border-indigo-700 hover:text-white focus-within:bg-indigo-700 
                focus-within:border-blindigoue-700 text-center"
                value="Buscar">
        </div>
    </form>
</div>`;

const functionEmit = `class SearchUser extends Component
{
    public $no_institucional; <!-- Variable de búsqueda -->

    public function leerDatosBuscar()
    {   
        <!-- Enviamos searchWord a otro componente - Se espera un emit con nombre searchWord -->
        $this->emit('searchWord', $this->no_institucional);
    }
}`;

const emitVieDataStudent = `class ViewStudentData extends Component
{
    protected $listeners = ['searchWord' => 'buscar'] <!-- Escuchamos a traves de nuestro emit -->;
}`;

const alumnoDataWithVariables = `class ViewStudentData extends Component
{
    public $nombre;
    public $carrera;
    public $correo;
    public $id_student;
    public $no_folio;

    // Variable por la cual sucede la búsqueda
    public $no_institucional;

    // Iniciar vació el array
    public $alumno = [];
}`;

const formFront = `<div class="flex flex-wrap justify-end items-center">
    <div class="mt-10 mb-5 w-full justify-end md:mr-4">
        <label for="word" class="block mb-1 text-sm text-gray-500 uppercase font-bold">No. Control</label>
        <livewire:search-user /> <!-- Componente de búsqueda -->
    </div>

    <form class="flex gap-5 w-full md:flex-row flex-col py-6 justify-center items-center mb-20">
        @if (count($alumno) > 0 ) <!-- Muestra el formulario solo cuando se encuentra un alumno -->
            {{-- nombre --}}
            <x-text-input id="name" wire:model="nombre"
                class="peer block w-full appearance-none border-0 border-b border-gray-500 
                bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600
                focus:outline-none focus:ring-0 rounded-none"
                placeholder=" " :value="$alumno[0]->nombre" />
            <x-input-label
        @endif
    </form >
</div>`;

const fnBuscar = `public function buscar($no_institucional)
{
    $this->no_institucional = $no_institucional;

    if (empty($this->no_institucional)) {
        $this->alumno = []; <!-- En caso de no contener ni una palabra, mandamos una alerta -->
        return;
    }
}`;

const searchAlumno = ` public function buscar($no_institucional)
{
    $alumno = $this->alumno = Alumno::where('no_institucional', 'LIKE', '%' 
    . $this->no_institucional . '%')->get();
    $this->alumno = $alumno;
}`;

const concatAl = `public function buscar($no_institucional){
    //concatenating variables to the front-end
    $datos = $this->alumno;

    <!-- Asignamos las variables -->
    $this->id_student = $datos[0]->id;
    $this->no_folio = $this->createFolio($datos[0]->no_institucional, $datos[0]->nombre);
    $this->nombre = $datos[0]->nombre;
    $this->carrera = $datos[0]->carrera;
    $this->correo = $datos[0]->email;

    // lo enviamos a traves del emit dataStudent - dataStudent es el nombre de nuestro emit
    $this->emit('dataStudent', [
        'id' => $this->id_student,
        'nombre' => $this->nombre,
        'carrera' => $this->carrera,
        'correo' => $this->correo,
    ]);
}`;

const listFather = `class PrestamosLibros extends Component{
    <!-- Reglas de validación -->
    protected $rules = [
        'fecha_inicio' => 'required|string',
        'fecha_limite' => 'required|string',
        'user_id' => 'required|int',
        'cantidad' => 'required|int',
        'folio' => 'required|string',
    ];

    <!-- Escuchamos a traves de nuestro emit -->
    protected $listeners = ['dataStudent' => 'loadDataStudent'];

    public function loadDataStudent($datos)
    {
        <!-- Recibe el id del alumno que solicito el préstamo -->
       $this->id_student = $datos['id'];
    }
}`;

const saveLoan = `class PrestamosLibros extends Component{
    public function processLoan()
    {

        // Validar los datos según las reglas
        $datos = $this->validate();

        $prestamo = Prestamo::create([
            'fecha_inicio' => $datos['fecha_inicio'],
            'fecha_limite' => $datos['fecha_limite'],
            'user_id' => $datos['user_id'],
            'cantidad' => $datos['cantidad'],
            'folio' => $datos['folio'],
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'tipo_prestamo_id' => $datos['tipo_prestamo_id'],
        ]);

        DB::table('libro_prestamo')->insert([
            'alumno_id' => $this->id_student,
            'libro_id' => $this->libro_id,
            'prestamo_id' => $prestamo->id,
        ]);

        session()->flash('message', 'Préstamo realizado exitosamente.');
        return redirect()->route('dashboard'); <!-- Redireccionamos a la ruta dashboard -->
    }
}`;

const render = `<div>
    {{-- Form alumno --}}
    <div class="mt-2">
        @if (session()->has('message'))
        <div x-data="{show: true}" x-init="setTimeout(() => show = false, 3000)" x-show="show">
            <div
                class="uppercase border border-green-600 bg-green-100 text-green-600 font-bold p-2 my-3 text-sm text-center">
                {{ session('message') }}
            </div>
        </div>
        @endif
        {{-- Start form for students --}}
        <span class="text-xl font-bold mb-10">Datos del alumno</span>
        <hr class="bg-indigo-800 mt-3">
        <div class="mx-auto py-5">
            <livewire:view-student-data />
        </div>

        {{-- End form for students --}}
        {{-- Start form to Loans --}}
        <section>
            <livewire:view-book-details />
        </section>

        <div class="pt-10 flex justify-end">
            <input type="button" wire:click='processLoan' <!-- Llamamos a la función 'processLoan' -->
                class="inline-flex uppercase items-center justify-center 
                md:justify-start w-full px-5 py-2 mb-3 mr-1 text-sm font-bold 
                text-white no-underline align-middle bg-indigo-600 border border-transparent 
                border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto 
                hover:bg-indigo-700 hover:border-indigo-700 hover:text-white 
                focus-within:bg-indigo-700 focus-within:border-blindigoue-700"
                value="Enviar e Imprimir">
        </div>
    </div>
</div>`;
</script>

<template>
    <main class="px-14 py-20">
        <section>
            <h1 class="text-3xl font-bold text-title font-roboto capitalize">Emit-Listeners en Livewire</h1>
            <p class="font-light font-roboto text-lg mt-10">En Livewire, los emit y los listeners son mecanismos para la
                comunicación entre componentes. Es decir, en un componente puede existir la función buscar empleado y
                esta misma se podría compartir a traves de un emit o listener
            </p>
        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Emit - Crear un préstamo</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Ahora, empecemos a implementar un emit para ellos crearemos
                un nuevo componente llamado SearchUser, este componente nos ayudara a obtener la información necesaria
                de nuestro alumno el cual solicitara un préstamo
            </p>

            <VSCode :code="searchAl" />

            <div class="py-12 border-l-8 border-green-800 bg-green-200 px-5">
                <p class="text-lg font-light font-roboto text-green-600">
                    En nuestro controlador sera necesario importar nuestro modelo, la finalidad de esto es obtener todos
                    los alumnos, pero solo se llamara a un alumno el cual contenga al inicio o al final la
                    palabra insertada por el pelado
                </p>
            </div>

            <p class="font-light font-roboto text-lg mt-10">En nuestro controlador SearchUser.php, sera necesario
                publicar nuestro emit, recordemos que un emit, es una manera de enviar un evento desde un componente
                hijo hasta su componente padre, en nuestro caso el componente hijo es Search-user.blade.php y, el
                componente padre sera Prestamos-libros.blade.php</p>

            <VSCode :code="functionEmit" />

            <div class="py-12 border-l-8 border-purple-800 bg-purple-200 px-5">
                <p class="text-lg font-light font-roboto text-purple-600">
                    <span class="font-bold text-xl">Como Tip</span>. La variable $no_institucional, sera la que se
                    utilizara
                    para realizar la búsqueda, es
                    decir, debe existir un model con el nombre no_institucional en nuestro front-end para que funcione
                    correctamente la búsqueda.
                </p>
            </div>
        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Listeners - Crear un préstamo</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Comenzaremos con nuestro controlador ViewStudentData.php,
                dentro de nuestro controlador sera necesario declarar nuestro listeners y publicarlos. Pero antes, al
                contrario de los emits, un listeners permite escuchar eventos emitidos por otros componentes. De acuerdo
                a esto, definiéremos nuestros listeners
            </p>

            <VSCode :code="emitVieDataStudent" />

            <div class="py-12 border-l-8 border-green-800 bg-green-200 px-5">
                <p class="text-lg font-light font-roboto text-green-600">
                    Es necesario declarar todas nuestras variables que deseemos renderizar en nuestro front-end
                </p>
            </div>

            <VSCode :code="alumnoDataWithVariables" />

            <div class="py-12 border-l-8 border-purple-800 bg-purple-200 px-5">
                <p class="text-lg font-light font-roboto text-purple-600">
                    En nuestro front-end renderizaremos nuestro alumnos a traves de los modelos
                </p>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Teniendo en cuenta lo antes dicho, necesitaremos seleccionar
                solo los datos que necesitemos, entonces, crearemos una función llamada buscar, esta función recibirá
                nuestra variable no_institucional, la cual contiene el no_institucional del alumno que deseamos Buscar
            </p>

            <VSCode :code="fnBuscar" />

            <p class="font-light font-roboto text-lg mt-10">Una vez capturado el no_institucional del pelado, haremos
                nuestro where, pero, guardaremos el resultado dentro de una variable llamada $alumno</p>

            <VSCode :code="searchAlumno" />

            <div class="py-12 border-l-8 border-purple-800 bg-purple-200 px-5">
                <p class="text-lg font-light font-roboto text-purple-600">
                    <span class="font-bold block text-xl">¿No entiendo esto?</span>
                    El codigo completo lo pueden ver en ViewStudentData.php
                </p>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Ya casi por terminar, necesitamos enviar solo cuatro
                variables hacia el componente padre, estas son: id, nombre, carrera y correo. Para ello, guardaremos al
                alumno dentro de una nueva variable llamada $datos, esto para un mejor manejo del envió de datos</p>
            <p class="font-light font-roboto text-lg mt-10">Recordando un poco de programación básica, es importante
                tener en cuenta que para acceder a los datos de un array necesitamos navegar a través de sus índices o
                posiciones. Por lo tanto, utilizaremos corchetes para acceder a la información específica que
                necesitamos. Por ejemplo, si tenemos un objeto llamado alumno con la estructura { nombre: 'Carlos' },
                para acceder al nombre sería necesario escribir alumno.nombre.</p>

            <VSCode :code="concatAl" />

            <div class="py-12 border-l-8 border-purple-800 bg-purple-200 px-5">
                <p class="text-lg font-light font-roboto text-purple-600">
                    <span class="font-bold text-xl">Como Tip:</span> dataStudent se espera a que se reciba en el
                    componente padre
                </p>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Continuemos con la parte mas difícil, en nuestro controlador
                padre PrestamosLibros.php, publicaremos nuestros listeners que hemos enviado a traves de nuestros emits,
                entonces, recibiremos dataStudent que lo asociaremos a la función loadDataStudent</p>

            <VSCode :code="listFather" />

            <p class="font-light font-roboto text-lg mt-10">Hemos obtenido el id del pelado que solicito el préstamo,
                por lo tanto solo faltaría crear y guardar el préstamo, ahora, mostrare datos que no hemos importado
                pero, en el código completo si se han importado</p>

            <VSCode :code="saveLoan" />

            <div class="py-12 border-l-8 border-purple-800 bg-purple-200 px-5">
                <p class="text-lg font-light font-roboto text-purple-600">
                    <span class="font-bold block text-xl">¿No entiendo esto?</span>
                    El codigo completo lo pueden ver en ViewStudentData.php, ViewBookDetails.php y PrestamosLibros.php
                </p>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Ahora, estos dos componentes se renderizar en la vista
                prestamos-libros.blade.php, se me había olvidado decirlo. Ahora si, hemos finalizado con la explicación
                de los emit y listeners</p>

            <VSCode :code="render" />
        </section>

        <RouterLink :to="{ name: 'segunda' }"
            class="font-roboto text-xl font-bold pb-5 text-purple-600 mt-10 block text-end capitalize">
            creación correcta de rutas
        </RouterLink>
    </main>
</template>