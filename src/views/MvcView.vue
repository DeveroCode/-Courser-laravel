<script setup>
import VSCode from '@/components/VSCode.vue';

const model = `class Libro extends Model
{
    use HasFactory;
    => Estos campos son los que se guardan en la base de datos <=
    protected $fillable = [
        'titulo',
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
    ];
}
`

const view = ` -> views
    -> vista.blade.php`


const controller = `class LibroController extends Controller
{
    public function index()
    {
        // retorna la vista principal
        return view('home.index');

    }

    public function create()
    {
        // Permite la creacion de un nuevo registro
        return view('administrator.create');
    }

    public function show(Libro $libro)
    {
        // muestra los datos de un registro
        return view('home.show', [
            'libro' => $libro,
        ]);
    }


    public function update(Libro $libro)
    {
        // permite la actualizacion de un registro, 
        dependiendo de la version, puede ser edit
        return view('administrator.edit', [
            'libro' => $libro,
        ]);
    }
}`;
</script>

<template>
    <main class="px-14 py-20">
        <h1 class="text-3xl font-bold text-title font-roboto capitalize">comó funciona el modo de trabajo
            MVC</h1>

        <p class="font-light font-roboto text-lg mt-10">El modelo MVC en Laravel es un patrón
            de
            arquitectura que organiza una
            aplicación en tres componentes principales: el Modelo, la Vista y el Controlador</p>


        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Modelo</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">Es el encargado de interactuar con los datos que se inserten
                en la aplicación, asi mismo, el modelo interactúa con la base de datos, es decir, para poder insertar
                los datos en la base de datos, es necesario declarar a través del modelo las columnas necesarias para la
                base de datos.</p>

            <VSCode :code="model" />
        </section>
        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Vista</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">En el caso de laravel, la vista se encarga de mostrar los
                datos recuperados del modelo, pero, de igual manera puede renderizar una vista común o una vista
                personalizada. <span class="text-red-500 font-bold uppercase underline">la terminación correcta es =>
                    vista.blade.php</span>
            </p>

            <VSCode :code="view" />
        </section>
        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Controller</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">El controlador actúa como un intermediario entre el modelo y
                la vista. Este es responsable de manejar las solicitudes que necesitemos en nuestras rutas, ademas de
                manejar las peticiones HTTP.</p>

            <VSCode :code="controller" />
        </section>

        <RouterLink :to="{ name: 'rutas' }"
            class="font-roboto text-xl font-bold pb-5 text-purple-600 mt-10 block text-end capitalize">
            creación correcta de rutas
        </RouterLink>
    </main>
</template>