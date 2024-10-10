<script setup>
import VSCode from '@/components/VSCode.vue';

const view = `Route::get('/dashboard/loans/view', [PrestamoController::class, 'index'])->name('loans.index');`
const found = `public $found = true; => variable que retorna true o false`;
const searchLoans = `public function render(){
   if ($this->isbn) {
            $loans = Prestamo::where('folio', 'LIKE', '%' . $this->isbn . '%')
                ->orWhereHas('libros', function ($query) {
                    $query->where('isbn', 'LIKE', '%' . $this->isbn . '%')
                        ->orWhere('titulo', 'LIKE', '%' . $this->isbn . '%');
                })->latest()->paginate(50); => Retorna los primeros 50 prestamos 
                encontrador de acuerdo al Folio
            $this->emit('status', $this->message, $this->found); => Variable auxiliar
    } else {
        $loans = Prestamo::latest()->paginate(50); => Retorna los primeros 50 prestamos
    }
}`;

const read = ` public function leerStatus($found, $message)
    {
        $this->found = $found;
        $this->message = $message;
    }`;

const returns = ` public function render()
    {
        // Model Book
        $libros = Libro::all();
        return view('livewire.search-components.filtrar-isbn', [
            'libros' => $libros,
            'found' => $this->found => Variable auxiiar
        ]);
    }`;

const btn = `const $btn = $('#btn');
const $data = $('#data'); => variable auxiliar sin esta no puede servir las alertas
const $input = $('#isbn');
$btn.addEventListener('click', showAlerts)`;

const showAlert = `function showAlerts(){
            if($input.value === ''){
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrrio un error en su búsqueda, por favor verifique los datos!",
                });
            }else if(!$data){
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se encontraron resultados!",
                });
            }
        }`;
</script>


<template>
    <div class="max-w-7xl mx-auto py-20 px-14">
        <section class="py-5">
            <h1 class="text-3xl font-bold text-title font-roboto capitalize"> Validación de formularios - Javascript
            </h1>
            <p class="font-light font-roboto text-lg mt-10">
                La validación de formulario es una funcionalidad muy común y útil en muchas aplicaciones. Este tipo de
                validación puede realizarse diretamente del lado del cliente sin necesidad de meter codigo del lado del
                <span class="font-bold">Back-end.</span>
            </p>
        </section>


        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Ajustando nuestras clases - Livewire</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                Para hacer una validacion eficiente, utilizaremos los emits y una variable de estado, es decir una
                variable que retorna true o false.
            </p>
            <p class="font-light font-roboto text-lg mt-10">
                Para crear esto es necesario encontrar el controlador padre que renderice ambos componentes, es decir,
                que renderice nuestro formulario y los resultados. Tomemos como ejemplo <span class="font-bold">View
                    Loans</span> el cual es encargado de renderizar tanto el formulario de busqueda como el formulario
                de resultados.
            </p>

            <VSCode :code="view" />
        </section>
        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Creando nuestra variable - Componente Padre</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                Una vez que hayamos identificado nuestro componente padre, será necesario ingresar en su clase. Dentro
                de esta clase, crearemos una nueva variable llamada <span class="font-bold">$found</span>.
            </p>

            <VSCode :code="found" />

            <p class="font-light font-roboto text-lg mt-10">
                Esta variable se retornará una vez que se realice una búsqueda en el componente hijo. Sin embargo,
                recordemos que, según la lógica de programación avanzada, cada vez que realizamos una búsqueda, estamos
                reiniciando la variable <span class="font-bold">$loans</span> a su valor inicial de 0. Es decir, si no
                se encuentra ningún libro, nos retornará un 0 o un array vacío, lo que ocasionará que se muestre el
                mensaje predeterminado del componente padre.
            </p>


            <VSCode :code="searchLoans" />

            <div class="py-12 border-l-8 border-red-800 bg-red-200 px-5">
                <p class="text-lg font-light font-roboto text-red-600">
                    <span class="font-bold text-xl">¡Reto!</span>
                    Deberán crear una función externa para realizar la búsqueda de un libro o folio. En caso de buscar
                    por varios campos, deberán incluirlos en la función. La función deberá devolvera nuestra variable
                    auxiliar como `true` si se encuentra el resultado, o `false` en caso contrario. Además, en la
                    función `Render`, deberán mostrar las primeras 12 actividades encontradas. El tiempo estimado para
                    este reto es de 30 minutos o menos.
                </p>
            </div>

        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Cachando nuestro emit - Componente Hijo</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                Dentro de la clases del componente hijo sera necesario obtener el emit, para est vamosa crear una
                funcion llamada <span class="font-bold">leerStatus</span>
            </p>

            <VSCode :code="read" />

            <div class="py-12 border-l-8 border-red-800 bg-red-200 px-5">
                <p class="text-lg font-light font-roboto text-red-600">
                    <span class="font-bold text-xl">Advertencia!</span>.
                    Ustedes deberan configurar los listners y sus variables para los emits que se crearon en el
                    componente padre.
                </p>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                Ahora, si todo está correctamente configurado, cada vez que realicemos una búsqueda, el `emit` nos
                devolverá el nuevo estado de nuestra variable auxiliar, dependiendo de si se encuentra un resultado o
                no. Entonces, podemos retornar esta variable auxiliar a nuestra vista para mostrar el resultado.
            </p>

            <VSCode :code="returns" />

            <div class="py-12 border-l-8 border-purple-800 bg-purple-200 px-5">
                <p class="text-lg font-light font-roboto text-purple-600">
                    <span class="font-bold text-xl">¡Segundo Reto!</span>
                    Como desarrolladores web, es común utilizar campos invisibles para obtener datos sin que el usuario
                    los vea, lo que nos permite procesar esos resultados y tomar decisiones en el backend o frontend. El
                    reto consiste en crear un campo invisible que capture el valor de una variable auxiliar sin mostrar
                    nada en la interfaz. Una vez que obtengan este valor, podrán avanzar a la siguiente etapa. Este reto
                    debería tomar entre 5 y 10 minutos.
                </p>
            </div>
            <div class="py-12 border-l-8 border-red-800 bg-red-200 px-5 mt-10">
                <p class="text-lg font-light font-roboto text-red-600">
                    <span class="font-bold text-xl">Advertencia!</span>
                    **No deben usar clases de CSS como `display: none` o
                    `visibility: hidden`**, ya que este método solo
                    oculta el campo visualmente, pero sigue siendo accesible en el código fuente del navegador, lo que
                    puede generar problemas de seguridad en producción. En su lugar, usen mecanismos seguros que no
                    expongan el campo al cliente.
                </p>
            </div>
        </section>

        <section class="pt-12">
            <div class="py-5 border-b border-gray-200">
                <h3 class="text-title font-bold font-roboto text-2xl">Mostrando nuestra alerta - Componente Hijo</h3>
            </div>

            <p class="font-light font-roboto text-lg mt-10">
                Teniendo nuestro campo invisible, sera momento de obtener ese valor para sentenciar nuestro if, para
                ello sera necesario implementar JavaScript sencillo.
            </p>

            <VSCode :code="btn" />
            <p class="font-light font-roboto text-lg mt-10">
                Dentro de la función <span class="font-bold">showAlerts</span>, deberemos incluir dos condiciones: una
                para verificar si un campo está vacío y otra para el caso en que no se encuentre ningún resultado.A
                continuación, les proporciono el
                código que pueden copiar y pegar en Visual Studio Code para implementarlo correctamente.
            </p>
            <VSCode :code="showAlert" />
        </section>
    </div>
</template>